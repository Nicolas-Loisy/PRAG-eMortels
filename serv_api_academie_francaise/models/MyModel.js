// models/MyModel.js

const mongoose = require('mongoose');

// Schéma pour les questions
const ReponsesSchema = new mongoose.Schema({
  reponse: {
    type: String,
    required: true
  },
  correcte: {
    type: Boolean,
    required: true
  },

});

// Schéma pour les questions
const QuestionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  reponse: {
    type: String,
    required: false
  },
  reponses: {
    type: [ReponsesSchema],
    required: false
  },
  motErreur: {
    type: String,
    required: false
  },
  extra: {
    type: String,
    required: false
  }
});

// Schéma pour les exercices
const ExerciceSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  intitule: {
    type: String,
    required: true
  },
  lien: {
    type: String,
    required: false
  },
  explication: {
    type: String,
    required: false
  },
  questions: {
    type: [QuestionSchema],
    required: true
  }
});

// Schéma pour les niveaux
const NiveauSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  exercices: {
    // type: [QuestionSchema],
    type: [ExerciceSchema],
    required: true
  }
});

// Schéma pour les sous-catégories
const SousCategorieSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  niveaux: {
    type: [NiveauSchema],
    required: true
  }
});

// Schéma pour les catégories
const CategorieSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  sousCategories: {
    type: [SousCategorieSchema],
    required: true
  }
});

// Schéma pour le document principal
const MySchema = new mongoose.Schema({
  categories: {
    type: [CategorieSchema],
    required: true
  }
});

// Création du modèle
// Attention => La ligne suivante ajoute une nouvelle "collection" dans la database de MongoDB.
// Ici "categorie" est le nom de la "collection".
// const MyModel = mongoose.model('categorie', MySchema);
// const MyModel = mongoose.model('newstruct', MySchema);
const MyModel = mongoose.model('categorie', MySchema);

module.exports = MyModel;
