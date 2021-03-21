const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
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

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
