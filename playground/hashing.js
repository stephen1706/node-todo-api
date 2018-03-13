const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id:4
};
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);
// var message = "im number 3";
// var hash = SHA256(message).toString();
//
// var data = {
//   id:4
// };
//
// var token={
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }
//
// var resultHash = SHA256(JSON.stringify(data) + "somesecret").toString();
// if(resultHash === token.hash){
//   console.log("data wasnt change");
// } else {
//   console.log("data changed");
// }
