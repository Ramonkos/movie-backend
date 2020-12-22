const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genres');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  genre: {
    type: genreSchema,
    rerquired: true
  },
  numberInStock: {
    type: Number,
    required:true,
    min: 0,
    max: 99
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 99
  }
}));

const validateMovie = (obj) => {
  const schema = Joi.object().keys({
    title: Joi
      .string()
      .min(3)
      .max(50)
      .required(),
    genreId: Joi
      .objectId()
      .required(),
    numberInStock: Joi
      .number()
      .min(0)
      .max(99)
      .required(),
    dailyRentalRate: Joi
      .number()
      .min(0)
      .max(99)
      .required(),
  });

  return schema.validate(obj);
};

module.exports.Movie = Movie;
module.exports.validate = validateMovie;