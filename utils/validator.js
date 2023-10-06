const { celebrate, Joi } = require('celebrate');

const regex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-zA-Z0-9./?#-]{2,}$/;

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().pattern(regex).required(),
    trailerLink: Joi.string().pattern(regex).required(),
    thumbnail: Joi.string().pattern(regex).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
});

const validateMovieID = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  validateUserAuth,
  validateUserCreate,
  validateUser,
  validateMovie,
  validateMovieID,
};
