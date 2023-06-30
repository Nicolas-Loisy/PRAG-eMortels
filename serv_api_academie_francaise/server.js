// server.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

mongoose.connect('mongodb://127.0.0.1:27017/academie', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});


// Configure your routes here
app.use('/api', routes);