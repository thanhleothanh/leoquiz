const express = require('express');
const testController = require('./../controllers/testController');
const authController = require('./../controllers/authController');

const testRouter = express.Router();

testRouter.route('/').get(authController.protect, testController.getAllTests);

testRouter
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    testController.postTest
  );

module.exports = testRouter;
