const { sign } = require('jsonwebtoken');

const signToken = (payload) => {
  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = signToken;
