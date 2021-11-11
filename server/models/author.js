const mongoose = require('mongoose');
const RefObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  created_by: {
    _id: { type: RefObjectID, ref: 'User' },
    first_name: String,
    last_name: String,
  },
  updated_by: {
    _id: { type: RefObjectID, ref: 'User' },
    first_name: String,
    last_name: String,
  },
});
