const express = require('express');
const genres = require('./routes/genres');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/movie-backend', { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to the DB...'));

app.use(express.json());
app.use('/api/genres', genres)

const port = 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`))