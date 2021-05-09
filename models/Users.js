// Import Mongoose
const mongoose = require('mongoose');

// Defining user model through schema
const UserSchema = mongoose.Schema({
  // User Model
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('user', UserSchema);
