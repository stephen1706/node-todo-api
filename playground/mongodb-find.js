const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('unable to connect to MongoDB server', err);
  }

  console.log('connected to mongodb server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a98fd455fbdb4064b44f14f')
  // }).toArray().then((docs)=>{
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log('unable to fetch todos', err);
  // });
  db.collection('Todos').find().count().then((count)=>{
    console.log('todos count: ' + count);
  }, (err)=>{
    console.log('unable to fetch todos', err);
  });

  // db.close();
});
