const express = require('express');
const { Customer, validate } = require('../models/customers');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  const customer = await Customer.find();
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Invalid customer ID...');

  res.send(customer);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });
  const result = await customer.save();
  res.send(result);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
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

router.delete('/:id', [auth, admin], async (req, res) => {
  const course = await Customer.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).send('Invalid course ID...')
  res.send(course);
})

module.exports = router;