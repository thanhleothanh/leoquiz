const Test = require('./../models/Test');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.getAllTests = catchAsync(async (req, res, next) => {
  const tests = await Test.find().populate('teacher');
  res.status(200).json(tests);
});

exports.getAllActiveTests = catchAsync(async (req, res, next) => {
  const activeTests = await Test.find({ active: true }).populate('teacher');
  res.status(200).json(activeTests);
});

exports.getTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id).populate('teacher');
  if (!test) throw new AppError('No test found, try again later!', 404);
  if (!test.active && req.user.role === 'student')
    throw new AppError('This test is not available at the moment', 403);
  res.status(200).json(test);
});

// exports.getAllTestsFromTeacher = catchAsync(async (req, res, next) => {
//   const tests = await Test.find({ teacher: req.user._id });
//   res.status(200).json(tests);
// });

exports.postTest = catchAsync(async (req, res, next) => {
  const newTest = await Test.create({
    test_name: req.body.test_name,
    test_description: req.body.test_description,
    type: req.body.type,
    questions: req.body.questions,
    teacher: req.user._id,
  });
  res.status(201).json(newTest);
});

exports.updateTest = catchAsync(async (req, res, next) => {
  const test = await Test.findById(req.params.id);
  if (!test) throw new AppError('No test found with this id', 404);
  if (!test.teacher._id.equals(req.user._id))
    throw new AppError('You are not allowed to update this test', 403);
  test.questions = [...req.body.questions];
  test.active = req.body.active;

  await test.save();
  res.status(201).json({ message: 'success' });
});
