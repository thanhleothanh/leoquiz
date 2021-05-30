const mongoose = require('mongoose');

const testResultSchema = mongoose.Schema(
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

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;
