const Test = require('./../models/Test');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.getAllTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find();
  res.status(200).json(tests);
});

exports.getAllTestsFromTeacher = catchAsync(async (req, res, next) => {
  const tests = await Test.find({ teacher: req.user._id });
  res.status(200).json(tests);
});

exports.postTest = catchAsync(async (req, res, next) => {
  const newTest = await Test.create({
    test_name: req.body.test_name,
    test_description: req.body.test_description,
    type: req.body.type,
    questions: req.body.questions,
    teacher: req.user._id,
  });
  res.status(201).json({
    test_name: newTest.test_name,
    test_description: newTest.test_description,
    type: newTest.type,
    questions: newTest.questions,
    teacher: newTest.teacher,
  });
});
