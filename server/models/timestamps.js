const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);
