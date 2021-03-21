const express = require('express');
const questionController = require('./../controllers/questionController');
const authController = require('./../controllers/authController');

const questionRouter = express.Router();

questionRouter
  .route('/')
  .get(authController.protect, questionController.getAllQuestions)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'teacher'),
    questionController.postQuestion
  );

questionRouter
  .route('/newest')
  .get(authController.protect, questionController.getQuestionsNewest);
questionRouter
  .route('/random')
  .get(authController.protect, questionController.getQuestionsRandomly);

module.exports = questionRouter;
