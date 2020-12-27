const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

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
