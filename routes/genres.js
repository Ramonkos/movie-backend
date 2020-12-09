const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength:30,
    required: true
  },
}));

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 })
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('Invalid genre ID...');
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!genre) return res.status(404).send('Invalid genre ID.');
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id)
  if (!genre) return res.status(404).send('Invalid genre ID.');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const {error} = validateGenre(req.body);
  if (error) return res.send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

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

module.exports = router;
