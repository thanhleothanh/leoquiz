const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;

process.on('uncaughtException', (error) => {
  console.log(error);
  console.log('uncaughted exceptions! shutting down program...');
  process.exit(1);
});
const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('db connected'));

app.listen(
  port,
  console.log('listening on port ' + port + ' in ' + process.env.NODE_ENV)
);
