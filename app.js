const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const questionRouter = require('./routes/questionRoutes');
const userRouter = require('./routes/userRoutes');
const testRouter = require('./routes/testRoutes');
const testResultRouter = require('./routes/testResultRoutes');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/questions', questionRouter);
app.use('/api/users', userRouter);
app.use('/api/tests', testRouter);
app.use('/api/testResults', testResultRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API running!',
  });
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);

  const statusCode = error.statusCode || 500;
  const status = error.status || 'fail';
  res.status(statusCode).json({
    status: status,
    message: error.message,
  });
});

module.exports = app;
