const mongoose = require('mongoose');
const RefObjectID = mongoose.Schema.Types.ObjectId;
const AuthorSchema = require('./author');
const TimestampsSchema = require('./timestamps');

module.exports = mongoose.model(
  'Product',
  new mongoose.Schema({
    title: { type: String, required: true },
    emoji: String,
    price: { type: Number, required: true },
    note: String,
    paid: [{ type: RefObjectID, ref: 'User' }],
  })
    .add(AuthorSchema)
    .add(TimestampsSchema)
);
