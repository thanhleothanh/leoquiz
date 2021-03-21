const User = require('./../models/User');
const TestTaken = require('./../models/TestTaken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.updateScore = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new AppError('No user found with this id', 404);
  user.score += req.body.score * 1;
  user.quizTaken += 1;
  await user.save();
  res.status(202).json({ message: 'success' });
});

exports.getScoreboard = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'student' })
    .select('-password -__v -createdAt -updatedAt')
    .sort('-score')
    .populate('teacher', 'name');
  res.status(200).json(users);
});

exports.getTestTaken = catchAsync(async (req, res, next) => {
  const tests = await TestTaken.find({ user: req.user._id }); //test taken
  res.status(200).json(tests);
});

exports.getStudents = catchAsync(async (req, res, next) => {
  const students = await User.find({ teacher: req.user._id });
  res.status(200).json(students);
});

exports.updateStar = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('No user found with this id', 404);
  user.star = req.body.star === 0 ? 0 : req.body.star || user.star;

  await user.save();
  res.status(202).json({ message: 'success' });
});

exports.adminChangePassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) throw new AppError('No user found with this id', 404);
  user.password = 'pass1234';

  await user.save();
  res.status(202).json({ message: 'success' });
});
