const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{//delete all
//   console.log(result);
// });

// Todo.findOneAndRemove({_id:'5a9f4fee98c786a19299becf'}).then((todo)=>{
//   console.log(todo);
// });

// Todo.findByIdAndRemove('5a9f4fee98c786a19299becf').then((todo)=>{
//   console.log(todo);
// });
