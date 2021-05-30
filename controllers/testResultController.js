const TestResult = require('./../models/TestResult');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.getAllResultsOfOneTest = catchAsync(async (req, res, next) => {
  const results = await TestResult.find({ test: req.params.id })
    .populate({
      path: 'user',
      select: 'name class role',
      options: { sort: { class: 1 } },
    })
    .sort({ score: -1 });
  res.status(200).json(results);
});

exports.getResultsOfStudent = catchAsync(async (req, res, next) => {
  const results = await TestResult.find({ user: req.user._id }).populate({
    path: 'test',
    populate: {
      path: 'teacher',
      select: 'name',
    },
  });
  res.status(200).json(results);
});

exports.getResult = catchAsync(async (req, res, next) => {
  const results = await TestResult.find({
    user: req.user._id,
    test: req.params.id,
  });
  res.status(200).json(results);
});

exports.postResult = catchAsync(async (req, res, next) => {
  const newResult = await TestResult.create({
    test: req.body.test,
    user: req.user._id,
    score: req.body.score,
  });
  res.status(201).json(newResult);
});
