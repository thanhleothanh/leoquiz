const express = require('express');
const testResultController = require('./../controllers/testResultController');
const authController = require('./../controllers/authController');

const testResultRouter = express.Router();

testResultRouter
  .route('/student')
  .get(authController.protect, testResultController.getResultsOfStudent);

testResultRouter
  .route('/teacher/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    testResultController.getAllResultsOfOneTest
  );

testResultRouter
  .route('/:id')
  .get(authController.protect, testResultController.getResult);

testResultRouter
  .route('/')
  .post(authController.protect, testResultController.postResult);

module.exports = testResultRouter;
