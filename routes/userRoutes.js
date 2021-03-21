const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const userRouter = express.Router();

userRouter
  .route('/register')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    authController.register
  );
userRouter.route('/login').post(authController.login);
userRouter.route('/').get(authController.protect, userController.getScoreboard);
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
userRouter
  .route('/:id')
  .patch(authController.protect, userController.updateScore)
  .get(authController.protect, userController.getTestTaken);
userRouter
  .route('/:id/changePassword')
  .patch(authController.protect, authController.changePassword);
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
