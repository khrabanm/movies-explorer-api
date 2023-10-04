const { ValidationError } = require('mongoose').Error;
const {
  STATUS_OK,
  CREATED
} = require('../utils/constants');
const NotFound = require('../utils/errors/NotFound');
const BadRequest = require('../utils/errors/BadRequest');
const Forbidden = require('../utils/errors/Forbidden');

const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res
        .status(STATUS_OK)
        .send({data: {movies}});
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const movie = req.body;
  Movie.create({ ...movie, owner: _id })
    .then((movie) => {
      res
        .status(CREATED)
        .send(movie);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .orFail(new NotFound('Фильм с указанным id не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        return Promise.reject(new Forbidden('У пользователя нет возможности удалять фильмы других пользователей'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
};