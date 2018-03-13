const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('unable to connect to MongoDB server', err);
  }

  console.log('connected to mongodb server');

  // db.collection('users').insertOne({
  //   name: "something to do",
  //   completed: false
  // },(err, result) => {
  //     if(err){
  //       return console.log('unable to insert todo', err);
  //     }
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  db.close();
});
