const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024
  }
}));

const validateUser = (obj) => {
  const schema = Joi.object().keys({
    name: Joi
      .string()
      .min(3)
      .max(50)
      .required(),
    email: Joi
      .string()
      .email()
      .min(3)
      .max(255)
      .required(),
    password: Joi
      .string()
      .min(3)
      .max(255)
      .required()
  });

  return schema.validate(obj);
};

module.exports.User = User;
module.exports.validate = validateUser;
