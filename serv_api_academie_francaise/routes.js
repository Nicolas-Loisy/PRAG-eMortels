// routes.js
const express = require('express');
const router = express.Router();
const MyModel = require('./models/MyModel');

// GET /categories : Récupère la liste des catégories disponibles.
router.get('/categories', async (req, res) => {
  try {
    console.log('Requête : /categories');

    const categories = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $unwind: "$categories.sousCategories" },
      {
        $project: {
          _id: "$categories._id",
          nom: "$categories.nom",
          sousCategories: {
            _id: "$categories.sousCategories._id",
            nom: "$categories.sousCategories.nom"
          }
        }
      },
      {
        $group: {
          _id: "$_id",
          nom: { $first: "$nom" },
          sousCategories: { $push: "$sousCategories" }
        }
      },
      {
        $group: {
          _id: null,
          categories: { $push: { _id: "$_id", nom: "$nom", sousCategories: "$sousCategories" } }
        }
      },
      {
        $project: {
          _id: 0,
          categories: 1
        }
      }
    ]).exec();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: 'Categories not found' });
    }

    res.json(categories[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

// GET /sousCategories/:categorie : Récupère les sous-catégories d'une catégorie spécifique.
router.get('/sousCategories/:categorie', async (req, res) => {
  try {
    const { categorie } = req.params;
    
    console.log(`Requête : /sousCategories/${categorie}`);

    const sousCategories = await MyModel.findOne(
      { 'categories._id': categorie },
      { 'categories.$': 1, _id: 0 }
    ).exec();

    if (!sousCategories) {
      return res.status(404).json({ error: 'Sous-categories not found' });
    }

    res.json(sousCategories.categories[0].sousCategories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

// GET /niveaux/:categorie/:sousCategorie : Récupère les niveaux et les types des exercices d'une catégorie et d'une sous-catégorie spécifiques.
router.get('/niveaux/:categorie/:sousCategorie', async (req, res) => {
  try {
    const { categorie, sousCategorie } = req.params;

    console.log(`Requête : /niveaux/${categorie}/${sousCategorie}`);

    const niveaux = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $match: { "categories._id": categorie } },
      { $unwind: "$categories.sousCategories" },
      { $match: { "categories.sousCategories._id": sousCategorie } },
      {
        $project: {
          niveaux: "$categories.sousCategories.niveaux"
        }
      },
      { $unwind: "$niveaux" },
      {
        $project: {
          "_id": "$niveaux._id",
          "nom": "$niveaux.nom",
          "exercices": {
            $map: {
              input: "$niveaux.exercices",
              as: "exercice",
              in: {
                "_id": "$$exercice._id",
                "questions": {
                  $map: {
                    input: "$$exercice.questions",
                    as: "question",
                    in: {
                      "_id": "$$question._id",
                      "type": "$$question.type"
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]).exec();

    if (!niveaux) {
      return res.status(404).json({ error: 'Niveaux not found' });
    }

    res.json(niveaux);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

// GET /exercices/:categorie/:sousCategorie/:niveau : Récupère les exercices d'une catégorie, d'une sous-catégorie et d'un niveau spécifiques.
router.get('/exercices/:categorie/:sousCategorie/:niveau', async (req, res) => {
  try {
    const categoryId = req.params.categorie;
    const subCategoryId = req.params.sousCategorie;
    const levelId = req.params.niveau;

    const result = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $match: { "categories._id": categoryId } },
      { $unwind: "$categories.sousCategories" },
      { $match: { "categories.sousCategories._id": subCategoryId } },
      { $unwind: "$categories.sousCategories.niveaux" },
      { $match: { "categories.sousCategories.niveaux._id": levelId } },
      { $project: { exercices: "$categories.sousCategories.niveaux.exercices" } },
      { $unwind: "$exercices" },
      {
        $project: {
          "_id": "$exercices._id",
          "questions": "$exercices.questions"
        }
      }
    ]).exec();

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

// GET /exercice/:categorie/:sousCategorie/:niveau/:exerciceId : Récupère un exercice en fonction d'une catégorie, d'une sous-catégorie, d'un niveau et de l'id de l'exercice.
router.get('/exercice/:categorie/:sousCategorie/:niveau/:exerciceId', async (req, res) => {
  try {
    const { categorie, sousCategorie, niveau, exerciceId } = req.params;

    console.log(`Requête : /exercice/${categorie}/${sousCategorie}/${niveau}/${exerciceId}`);

    const exercice = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $match: { "categories._id": categorie } },
      { $unwind: "$categories.sousCategories" },
      { $match: { "categories.sousCategories._id": sousCategorie } },
      { $unwind: "$categories.sousCategories.niveaux" },
      { $match: { "categories.sousCategories.niveaux._id": niveau } },
      { $unwind: "$categories.sousCategories.niveaux.exercices" },
      { $match: { "categories.sousCategories.niveaux.exercices._id": exerciceId } },
      {
        $project: {
          "_id": "$categories.sousCategories.niveaux.exercices._id",
          "intitule": "$categories.sousCategories.niveaux.exercices.intitule",
          "lien": "$categories.sousCategories.niveaux.exercices.lien",
          "explication": "$categories.sousCategories.niveaux.exercices.explication",
          "questions": "$categories.sousCategories.niveaux.exercices.questions"
        }
      }  
    ]).exec();

    if (!exercice) {
      return res.status(404).json({ error: 'Exercice not found' });
    }

    res.json(exercice);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

module.exports = router;