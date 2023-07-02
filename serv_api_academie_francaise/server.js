const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors'); // Importez le module CORS

const app = express();
const port = 3000;

app.use(express.json());

// Ajoutez le middleware CORS à votre application
app.use(cors());

// Configurez les options CORS si nécessaire
// Par exemple, pour autoriser les requêtes uniquement depuis http://localhost:3001
app.use(cors({
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Start the server
app.listen(port, () => {
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
