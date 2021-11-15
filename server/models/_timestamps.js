const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
