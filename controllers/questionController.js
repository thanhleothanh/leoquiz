const Question = require('./../models/Question');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/APIFeatures');

exports.getAllQuestions = catchAsync(async (req, res, next) => {
  let api = new APIFeatures(Question.find(), req.query).filter().fields();
  const questions = await api.query;
  res.status(200).json(questions);
});

exports.getQuestionsRandomly = catchAsync(async (req, res, next) => {
  let questions;
  if (Array.isArray(req.query.type))
    questions = await Question.aggregate([
      {
        $match: { type: { $in: [...req.query.type] } },
      },
      { $sample: { size: 10 } },
    ]);
  else {
    questions = await Question.aggregate([
      {
        $match: { type: { $eq: req.query.type } },
      },
      { $sample: { size: 10 } },
    ]);
  }
  res.status(200).json(questions);
});

exports.getQuestionsNewest = catchAsync(async (req, res, next) => {
  let api = new APIFeatures(Question.find(), req.query)
    .filter() //type
    .sort() //createdAt
    .fields()
    .pageLimit(); //skip
  const questions = await api.query;
  if (questions.length === 0) {
    this.getQuestionsRandomly(req, res, next);
  } else res.status(200).json(questions);
});

exports.postQuestion = catchAsync(async (req, res, next) => {
  const newQuestion = await Question.create({
    question: req.body.question,
    question_image: req.body.question_image,
    correct_answer: req.body.correct_answer,
    correct_image: req.body.correct_image,
    incorrect_answers: req.body.incorrect_answers,
    type: req.body.type,
    teacher: req.user._id,
  });
  res.status(201).json({
    question: newQuestion.question,
    question_image: newQuestion.question_image,
    correct_answer: newQuestion.correct_answer,
    correct_image: newQuestion.correct_image,
    incorrect_answers: newQuestion.incorrect_answers,
    type: newQuestion.type,
    teacher: newQuestion.teacher,
  });
});
