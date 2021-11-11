const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    phone: String,
    first_name: String,
    last_name: String,
    password: String,
  })
);
