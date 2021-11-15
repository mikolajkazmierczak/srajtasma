const mongoose = require('mongoose');
const RefObjectID = mongoose.Schema.Types.ObjectId;
const AuthorSchema = require('./_author');
const TimestampsSchema = require('./_timestamps');

module.exports = mongoose.model(
  'Receipt',
  new mongoose.Schema({
    title: { type: String, required: true },
    emoji: String,
    price: { type: Number, required: true },
    note: String,
    users: [{ type: RefObjectID, ref: 'User' }],
    usersPaid: [{ type: RefObjectID, ref: 'User' }],
  })
    .add(AuthorSchema)
    .add(TimestampsSchema)
);
