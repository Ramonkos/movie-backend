
const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength:30,
    required: true
  },
}));

const validateGenre = (obj) => {
  const schema = Joi.object().keys({
    name: Joi
      .string()
      .min(3)
      .max(30)
      .required()
  });

  return schema.validate(obj);
};

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
