const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text:'first todo'
  },{
    _id: new ObjectID(),
    text:'second todo'
  }
];

beforeEach((done) => {
    Todo.remove({}).then(()=> {
      return Todo.insertMany(todos);
    }).then(() => done())
    ;//apus smua todo tiap x seblm mulai tiap test sama isi data dummy
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'test todo text';
    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find().then((todos)=> {
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });

  it('should not create todo with invalid body', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find().then((todos)=> {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  });

  describe('GET /todos', ()=> {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
  });

  describe('GET /todos/:id',()=>{
    it('should return todo doc', (done)=>{
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todo.text).toBe('first todo');
        })
        .end(done);
    });
    it('should return 404 if todo not found', (done)=>{
      request(app)
        .get(`/todos/5a9e323b6ca7aeec04cf4a70`)
        .expect(404)
        .end(done);
    });
    it('should return 404 for non-object id', (done)=>{
      request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
  });

  describe("delete /todos/:id", ()=>{
    it("should remove a todo", (done)=>{
      request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.findById(todos[0]._id.toHexString()).then((todo)=> {
            expect(todo).toNotExist();
            done();
          }).catch((e) => done(e));
        })
    });

    it("should return 404 if todo not found", (done)=>{
      request(app)
        .delete(`/todos/5a9e323b6ca7aeec04cf4a70`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object id', (done)=>{
      request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });
  });

  describe('PATCH /todos/:id', ()=>{
    it('should update the todo',(done)=>{
      request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .send({
          completed: true,
          text: "hahaha"
        })
        .expect(200)
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.findById(todos[0]._id.toHexString()).then((todo)=> {
            expect(todo.text).toBe("hahaha");
            expect(todo.completed).toBe(true);
            expect(todo.completedAt).toBeA('number');

            done();
          }).catch((e) => done(e));
        })
    });

    it('should clear completedAt when todo not completed', (done)=>{
      request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .send({
          completed: false
        })
        .expect(200)
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.findById(todos[0]._id.toHexString()).then((todo)=> {
            expect(todo.completed).toBe(false);
            expect(todo.completedAt).toNotExist();

            done();
          }).catch((e) => done(e));
        })
    })
  })
});
