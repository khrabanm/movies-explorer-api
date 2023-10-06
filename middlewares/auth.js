require('dotenv').config();
const jwt = require('jsonwebtoken');
const { DEV_SECRET } = require('../utils/constants');
const ErrorAccess = require('../utils/errors/ErrorAccess');

const { JWT_SECRET, NODE_ENV } = process.env;

const handleAuthError = (req, res, next) => next(new ErrorAccess('Необходима авторизация'));

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(req, res, next);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    return handleAuthError(req, res, next);
  }
  req.user = payload;

  return next();
};
