const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const User = require('./../models/User');
const signToken = require('./../utils/signToken');
const { promisify } = require('util');
const { verify } = require('jsonwebtoken');

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new AppError('Please fill in your username and password', 401);

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    throw new AppError('Invalid username or password', 400);

  const token = signToken({ id: user._id });
  res.status(202).json({
    _id: user._id,
    username: user.username,
    name: user.name,
    class: user.class,
    score: user.score,
    star: user.star,
    quizTaken: user.quizTaken,
    role: user.role,
    teacher: user.teacher,
    token,
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    teacher: req.user._id,
    class: req.body.class,
  });
  const token = signToken({ id: newUser._id });
  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    name: newUser.name,
    class: newUser.class,
    point: newUser.point,
    role: newUser.role,
    teacher: req.user._id,
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers || !req.headers.authorization)
    throw new AppError('You have to be logged in to access this route', 403);

  const token = req.headers.authorization.split(' ')[1];
  if (!token)
    throw new AppError('You have to be logged in to access this route', 401);

  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    throw new AppError('Cant find this user, please login again!', 401);

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('User is not allowed perform this action!', 401)
      );
    }
    next();
  };
};

exports.changePassword = catchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    throw new AppError('Fill in all the information', 401);
  if (!(await currentUser.comparePassword(currentPassword)))
    throw new AppError('Current password is not correct', 401);

  currentUser.password = newPassword;
  await currentUser.save();

  res.status(201).json({
    status: 'success',
  });
});
