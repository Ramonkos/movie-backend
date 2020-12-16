const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength:30,
    required: true
  },
});

const Genre = mongoose.model('Genre', genreSchema);

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
module.exports.genreSchema =genreSchema;
module.exports.validate = validateGenre;
