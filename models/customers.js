const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  }
})

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (obj) => {
  const schema = Joi.object().keys({
    name: Joi
      .string()
      .min(3)
      .max(30)
      .required(),
    isGold: Joi
      .boolean()
      .required(),
    phone: Joi
      .string()
      .min(3)
      .max(30)
      .required()
  });

  return schema.validate(obj);
};

module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
module.exports.validate = validateCustomer;
