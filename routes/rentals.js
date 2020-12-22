const express = require('express');
const Transaction = require('mongoose-transactions');
const { Customer } = require('../models/customers');
const { Movie } = require('../models/movies');
const { validate, Rental } = require('../models/rentals');
const transaction = new Transaction();
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customer_id);
  if (!customer) return res.status(400).send('Invalid customer ID...');

  const movie = await Movie.findById(req.body.movie_id);
  if (!movie) return res.status(400).send('Invalid movie ID...');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  const rental = new Rental({
    customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
    },
    movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
    }
  });

  try {
    transaction.insert('Rental', rental);
    transaction.update('Movie', movie._id, { $inc: { numberInStock: -1 } });
    await transaction.run();
 
    res.send(rental);
  } 
  catch (ex) {
    res.status(500).send(ex);
  }

});

router.get('/', async (req, res) => {
  const rentals = await Rental.find(req.body.rental_id).sort('-dateOut');
  res.send(rentals);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(400).send('Invalid rental ID...');

  res.send(rental);
});

module.exports = router;