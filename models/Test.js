const mongoose = require('mongoose');

const testSchema = mongoose.Schema(
  {
    test_name: { type: String, required: true },
    test_description: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    questions: [
      {
        _id: false,
        question: { type: String, required: true },
        question_image: { type: String },
        correct_answer: { type: String, required: true },
        correct_image: { type: String },
        incorrect_answers: [
          {
            _id: false,
            incorrect_answer: { type: String, required: true },
            incorrect_image: { type: String },
          },
        ],
      },
    ],
    type: { type: String, required: true },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
