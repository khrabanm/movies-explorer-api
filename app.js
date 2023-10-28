const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, dataMovies } = require('./utils/config');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://movies-explorer.khr.nomoredomainsrocks.ru', 'https://api.movies-explorer.khr.nomoredomainsrocks.ru'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(dataMovies)
  .then(() => console.log('Connected to the data base'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
