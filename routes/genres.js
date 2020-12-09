const express = require('express');
const router = express.Router();

const genres = [
  {id: 1, name: 'Horror'}, 
  {id: 2, name: 'Thriller'}, 
  {id: 3, name: 'Comedy'}
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Invalid genre ID.');
  res.send(genre);
})

router.put('/:id', (req, res) => {
  const {error} = validateGenre(req.body);
  if (error) return res.send(error.details[0].message);
  
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Invalid genre ID.');
  genre.name = req.body.name;
  res.send(genre);
})

router.delete('/:id', (req, res) => {
  const index = genres.findIndex(g => g.id === parseInt(req.params.id));
  const genre = genres[index];
  if (!genre) return res.status(404).send('Invalid genre ID.');
  genres.splice(index, 1);
  res.send(genre);
})

router.post('/', (req, res) => {
  const {error} = validateGenre(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = {id: genres.length + 1, name: req.body.name};
  genres.push(genre);
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

  return schema.validate(obj)
};

module.exports = router;
