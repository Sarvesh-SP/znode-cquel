const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User } = require('../models');
const { roleRights } = require('../config/roles');
const catchAsync = require('../utils/catchAsync');
const { secret } = require('../config/envConfig').jwt;

const verifyAuth = (...requiredRights) =>
  catchAsync(async (req, res, next) => {
    // check auth header for Bearer Token format
    const authHeader = req.headers?.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate using Bearer Token format');
    }

    const token = authHeader.substring(7, authHeader.length);

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'No token provided');
    }

    // verify / decode token
    req.user = await jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Token doesn't match");
      }

      return User.findByPk(decoded.sub);
    });

    // check user rights
    if (requiredRights.length) {
      const userRights = roleRights.get(req.user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
      if (!hasRequiredRights && req.params.userId !== req.user.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
    }
    next();
  });

module.exports = verifyAuth;
