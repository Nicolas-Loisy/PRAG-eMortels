// routes.js
const express = require('express');
const router = express.Router();
const MyModel = require('./models/MyModel');


router.get('/categories', async (req, res) => {
  try {
    console.log("Requête : /categories");
    donnees =  await MyModel.find({ "categories.nom" : "Syntaxe" }).exec();
    // donnees =  await MyModel.find({ "categories.nom": 'Morphologie'}).exec();
    // donnees =  await MyModel.find({ "categories._id" : "syntaxe" }).exec();
    // donnees =  await MyModel.find({ "categories.nom" : "Syntaxe" }, {"sousCategories.nom": 'Les adjectifs de couleur'}).exec();

    res.json(donnees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error : ' + error });
  }
});

module.exports = router;