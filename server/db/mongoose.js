var mongoose = require('mongoose');

mongoose.Promise = global.Promise;//spy bs pk promise mongooseny
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
}
