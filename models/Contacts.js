// Import Mongoose
const mongoose = require('mongoose');

// Defining Contact model through schema
const ContactsSchema = mongoose.Schema({
  // Contacts Model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    default: 'Personal',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('contacts', ContactsSchema);
