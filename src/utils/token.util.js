const jwt = require('jsonwebtoken');

const createJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = {
  createJWTToken,
};
