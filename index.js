require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const winston = require('winston');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth')
const error = require('./middleware/error');

winston.add(winston.transports.File, { filename: 'logfile.log' });

Joi.objectId = require('joi-objectid')(Joi);
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
} 

mongoose.connect('mongodb://localhost/movie-backend', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to the DB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));