const express = require('express');
const testController = require('./../controllers/testController');
const authController = require('./../controllers/authController');

const testRouter = express.Router();

testRouter
  .route('/teacher')
  .get(
    authController.protect,
    authController.restrictTo('teacher', 'admin'),
    testController.getAllTests
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    testController.postTest
  );

testRouter
  .route('/:id')
  .get(authController.protect, testController.getTest)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    testController.updateTest
  );

testRouter
  .route('/')
  .get(authController.protect, testController.getAllActiveTests);

module.exports = testRouter;
