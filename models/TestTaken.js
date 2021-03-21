const mongoose = require('mongoose');

const testTakenSchema = mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    score: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const TestTaken = mongoose.model('TestTaken', testTakenSchema);

module.exports = TestTaken;
