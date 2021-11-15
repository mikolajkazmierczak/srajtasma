const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    phone: String,
    firstName: String,
    lastName: String,
    password: String,
  })
);
