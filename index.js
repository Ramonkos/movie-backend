const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers')
const app = express();

mongoose.connect('mongodb://localhost/movie-backend', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to the DB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`))