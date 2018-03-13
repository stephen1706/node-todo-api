const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('unable to connect to MongoDB server', err);
  }

  console.log('connected to mongodb server');
  //
  // db.collection('Todos').deleteMany({
  //   text: "eat lunch"
  // }).then((result)=>{
  //   console.log(result);
  // }, (err)=>{
  //   console.log('unable to delete todos', err);
  // });

  // db.collection('Todos').deleteOne({//cmn apus yg pertama
  //    text: "eat lunch"
  //  }).then((result)=>{
  //    console.log(result);
  //  }, (err)=>{
  //    console.log('unable to delete todos', err);
  //  });

  db.collection('Todos').findOneAndDelete({//cmn apus yg pertama, dan return objectny yg didelete
     text: "eat lunch"
   }).then((result)=>{
     console.log(result);
   }, (err)=>{
     console.log('unable to delete todos', err);
   });
  // db.close();
});
