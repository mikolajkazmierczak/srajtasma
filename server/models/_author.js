const mongoose = require('mongoose');
const RefObjectID = mongoose.Schema.Types.ObjectId;

module.exports = new mongoose.Schema({
  createdBy: { type: RefObjectID, ref: 'User' },
  updatedBy: { type: RefObjectID, ref: 'User' },
});
