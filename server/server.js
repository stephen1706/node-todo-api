require("./config/config");
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

 var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
 var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/test',(req,res) => {
 var poolData = {
      UserPoolId : 'us-east-2_GvnSJWujE', // Your user pool id here
      ClientId : '6ivagbshnki2rjgkos1gtositb' // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
 
  var attributeList = [];
 
  var dataEmail = {
      Name : 'email',
      Value : 'email@mydomain.com'
  };
 
  var dataPhoneNumber = {
      Name : 'phone_number',
      Value : '+15555555555'
  };
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
 
  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);
 
  userPool.signUp('stephen1706', 'Password01!', attributeList, null, function(err, result){
      if (err) {
          res.status(400).send(err);
          return;
      }
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
      res.send(cognitoUser);
  });
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  })
});

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send("id not valid");
  }
  Todo.findById(id).then((todo)=> {
    if(todo){
      res.status(200).send({todo});
    } else {
      res.status(404).send("todo not found");
    }
  }).catch(e => {
    res.status(400).send(e);
  })
});

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send("id not valid");
  }
  Todo.findByIdAndRemove(id).then((todo)=> {
    if(todo){
      res.status(200).send({todo});
    } else {
      res.status(404).send("todo not found");
    }
  }).catch(e => {
    res.status(400).send(e);
  })
});

app.patch("/todos/:id",(req,res)=>{
  var id = req.params.id;
  //ambil 2 field dr request body aja, buang yg laen
  var body = _.pick(req.body, [
    'text',
    'completed'
  ]);
  if(!ObjectID.isValid(id)){
    return res.status(404).send("id not valid");
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }).catch(e => {
    res.status(400).send(e);
  })
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, [
    'email',
    'password'
  ]);

  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(user);
  }).catch((e) =>{
    res.status(400).send(e);
  });
});

app.get('/users/me', (req, res) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if(!user){
      return res.status(404).send();
    }
    res.send(user);
  });
});

app.listen(port, () => {
  console.log('started in port ' + port);
});

module.exports = {app};
