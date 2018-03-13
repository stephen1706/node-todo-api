const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if(err){
    return console.log('unable to connect to MongoDB server', err);
  }

  console.log('connected to mongodb server');

  // db.collection('Todos').findOneAndUpdate({
  //    text: "eat lunch"
  //  }, {
  //    $set: {
  //      completed: true
  //    }
  //  }, {
  //    returnOriginal: false
  //  }).then((result)=>{
  //    console.log(result);
  //  }, (err)=>{
  //    console.log('unable to update todos', err);
  //  });


     db.collection('Users').findOneAndUpdate({
        name: "stephen"
      }, {
        $set: {
          name: "stephanie"
        },
        $inc: {
          age:1
        }
      }, {
        returnOriginal: false
      }).then((result)=>{
        console.log(result);
      }, (err)=>{
        console.log('unable to update todos', err);
      });
  // db.close();
});
