const express = require('express');
const rateLimit = require('express-rate-limit');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const userRouter = express.Router();
const apiLimiter = rateLimit({
  windowMs: 360 * 60 * 1000, // 360 minutes
  max: 5,
});

userRouter.use('/signup', apiLimiter);

userRouter.route('/signup').post(authController.signup);

userRouter.route('/login').post(authController.login);

userRouter
  .route('/register')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    authController.register
  );

userRouter
  .route('/students')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    userController.getStudents
  );

userRouter
  .route('/students/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    userController.updateStar
  );

userRouter.route('/').get(authController.protect, userController.getScoreboard);

userRouter
  .route('/:id/changePassword')
  .patch(authController.protect, authController.changePassword);

userRouter
  .route('/:id')
  .patch(authController.protect, userController.updateScore);

module.exports = userRouter;

//admin change password
//admin change password
//admin change password
userRouter
  .route('/admin/:username/changePassword')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.adminChangePassword
  );
