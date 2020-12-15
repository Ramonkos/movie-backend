const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}));

router.get('/', async (req, res) => {
  const customer = await Customer.find();
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Invalid customer ID...');

  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });
  const result = await customer.save();
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.send(error.details[0].message);

  let customer = await Customer.findByIdAndUpdate(req.params.id, {
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  }, { new: true });
  if (!customer) return res.status(404).send('Invalid customer ID...');

  const result = await customer.save();
  res.send(result);
});

router.delete('/:id', async (req, res) => {
  const course = await Customer.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).send('Invalid course ID...')
  res.send(course);
})

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

module.exports = router;