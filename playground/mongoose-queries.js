const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = "5a9e323b6ca7aeec04cf4a78";
if(!ObjectID.isValid(id)){
  return console.log('id not valid');
}
Todo.find({_id: id}).then((todos)=>{
  console.log('todos', todos);
})

Todo.findOne({
  completed:false
}).then((todo)=>{
  console.log("find one", todo);
})

Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log("id not found");
  }
  console.log("find by id", todo);
}).catch((e) => console.log(e));
