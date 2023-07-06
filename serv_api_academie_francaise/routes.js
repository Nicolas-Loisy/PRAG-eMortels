// routes.js
const express = require('express');
const router = express.Router();
const MyModel = require('./models/MyModel');

const seedrandom = require('seedrandom');

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

// GET /niveaux_types_exo/:categorie/:sousCategorie : Récupère les niveaux et les types des exercices d'une catégorie et d'une sous-catégorie spécifiques.
router.get('/niveaux_types_exo/:categorie/:sousCategorie', async (req, res) => {
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

    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'Exercices not found' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

router.get('/exercice/:categorie/:sousCategorie/:niveau/:exerciceId', async (req, res) => {
  try {
    const { categorie, sousCategorie, niveau, exerciceId } = req.params;

    console.log(`Requête : /exercice/${categorie}/${sousCategorie}/${niveau}/${exerciceId}`);

    const [categorieInfo, sousCategorieInfo, exo] = await Promise.all([
      MyModel.findOne({ "categories._id": categorie }, { "categories.$": 1 }),
      MyModel.findOne(
        { "categories._id": categorie, "categories.sousCategories._id": sousCategorie },
        { "categories.sousCategories.$": 1 }
      ),
      MyModel.aggregate([
        { $unwind: "$categories" },
        { $match: { "categories._id": categorie } },
        { $unwind: "$categories.sousCategories" },
        { $match: { "categories.sousCategories._id": sousCategorie } },
        { $unwind: "$categories.sousCategories.niveaux" },
        { $match: { "categories.sousCategories.niveaux._id": niveau } },
        { $unwind: "$categories.sousCategories.niveaux.exercices" },
        {
          $match: { "categories.sousCategories.niveaux.exercices._id": exerciceId }
        },
        {
          $project: {
            "_id": "$categories.sousCategories.niveaux.exercices._id",
            "intitule": "$categories.sousCategories.niveaux.exercices.intitule",
            "lien": "$categories.sousCategories.niveaux.exercices.lien",
            "explication": "$categories.sousCategories.niveaux.exercices.explication",
            "questions": "$categories.sousCategories.niveaux.exercices.questions",
            "categories": 1
          }
        }
      ]).exec()
    ]);

    if (!exo || exo.length === 0) {
      return res.status(404).json({ error: 'Exercice not found' });
    }

    const categorieNom = categorieInfo.categories[0].nom;
    const sousCategorieNom = sousCategorieInfo.categories[0].sousCategories[0].nom;
    const exercice = exo[0];

    res.json({ categorieNom, sousCategorieNom, exercice });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

// GET /niveaux : Récupère tous les différents niveaux disponibles avec leurs noms et leurs IDs (sans répétition)
router.get('/niveaux', async (req, res) => {
  console.log(`Requête : /niveaux`);

  try {
    const niveaux = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $unwind: "$categories.sousCategories" },
      { $unwind: "$categories.sousCategories.niveaux" },
      { $group: { _id: "$categories.sousCategories.niveaux._id", nom: { $first: "$categories.sousCategories.niveaux.nom" } } }
    ]);

    if (!niveaux || niveaux.length === 0) {
      return res.status(404).json({ error: 'Niveaux not found' });
    }

    res.json(niveaux);
  } catch (err) {
    console.error('Erreur lors de la récupération des niveaux', err);
    res.status(500).send('Erreur lors de la récupération des niveaux');
  }
});

// GET /exercices/:nbExercice : Récupère un nombre spécifique d'exercices aléatoirement parmi toutes les données.
router.get('/exercices/:nbExercice', async (req, res) => {
  const { nbExercice } = req.params;

  console.log(`Requête : /exercices/${nbExercice}`);

  try {
    const exercices = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $unwind: "$categories.sousCategories" },
      { $unwind: "$categories.sousCategories.niveaux" },
      { $unwind: "$categories.sousCategories.niveaux.exercices" },
      { $sample: { size: parseInt(nbExercice) } },
      { $limit: parseInt(nbExercice) }
    ]);

    if (!exercices || exercices.length === 0) {
      return res.status(404).json({ error: 'Exercices not found' });
    }
    
    res.json(exercices);
  } catch (err) {
    console.error('Erreur lors de la récupération des exercices', err);
    res.status(500).send('Erreur lors de la récupération des exercices');
  }
});

// GET /questions/:nbQuestions : Récupère un nombre spécifique de questions aléatoirement parmi toutes les données.
router.get('/questions/:nbQuestions', async (req, res) => {
  const { nbQuestions } = req.params;

  console.log(`Requête : /questions/${nbQuestions}`);

  try {
    const questions = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $unwind: "$categories.sousCategories" },
      { $unwind: "$categories.sousCategories.niveaux" },
      { $unwind: "$categories.sousCategories.niveaux.exercices" },
      { $unwind: "$categories.sousCategories.niveaux.exercices.questions" },
      { $sample: { size: parseInt(nbQuestions) } },
      { $limit: parseInt(nbQuestions) }
    ]);

    const formattedQuestions = questions.map(question => {
      return {
        "categorieNom": question.categories.nom,
        "sousCategorieNom": question.categories.sousCategories.nom,
        "intitule": question.categories.sousCategories.niveaux.exercices.intitule,
        "exerciceId": question.categories.sousCategories.niveaux.exercices._id,
        "question": question.categories.sousCategories.niveaux.exercices.questions
      };
    });

    if (!formattedQuestions || formattedQuestions.length === 0) {
      return res.status(404).json({ error: 'Questions not found' });
    }

    res.json({ questions: formattedQuestions });
  } catch (err) {
    console.error('Erreur lors de la récupération des questions', err);
    res.status(500).send('Erreur lors de la récupération des questions');
  }
});

// GET /questions/:niveau/:nbQuestions : Récupère un nombre spécifique de questions aléatoirement parmi les exercices d'un niveau donné.
router.get('/questions/:niveauId/:nbQuestions', async (req, res) => {
  const { niveauId, nbQuestions } = req.params;

  console.log(`Requête : /questions/${niveauId}/${nbQuestions}`);

  try {
    const questions = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $unwind: "$categories.sousCategories" },
      { $unwind: "$categories.sousCategories.niveaux" },
      { $match: { "categories.sousCategories.niveaux._id": niveauId } },
      { $unwind: "$categories.sousCategories.niveaux.exercices" },
      { $unwind: "$categories.sousCategories.niveaux.exercices.questions" },
      { $sample: { size: parseInt(nbQuestions) } },
      { $limit: parseInt(nbQuestions) }
    ]);

    const formattedQuestions = questions.map(question => {
      return {
        categorieNom: question.categories.nom,
        sousCategorieNom: question.categories.sousCategories.nom,
        intitule: question.categories.sousCategories.niveaux.exercices.intitule,
        exerciceId: question.categories.sousCategories.niveaux.exercices._id,
        question: question.categories.sousCategories.niveaux.exercices.questions
      };
    });

    if (!formattedQuestions || formattedQuestions.length === 0) {
      return res.status(404).json({ error: 'Questions not found' });
    }

    res.json({ questions: formattedQuestions });
  } catch (err) {
    console.error('Erreur lors de la récupération des questions', err);
    res.status(500).send('Erreur lors de la récupération des questions');
  }
});

// GET /exo-journalier : Récupère un exercice aléatoire par jour mais identique pour chaque joueur.
router.get('/exo-journalier', async (req, res) => {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const dateString = `${day+1}-${month}-${year}`;
    const random = seedrandom(dateString)();

    const allExercises = await MyModel.aggregate([
      { $unwind: "$categories" },
      { $unwind: "$categories.sousCategories" },
      { $unwind: "$categories.sousCategories.niveaux" },
      { $unwind: "$categories.sousCategories.niveaux.exercices" },
      {
        $project: {
          "_id": "$categories.sousCategories.niveaux.exercices._id",
          "intitule": "$categories.sousCategories.niveaux.exercices.intitule",
          "lien": "$categories.sousCategories.niveaux.exercices.lien",
          "explication": "$categories.sousCategories.niveaux.exercices.explication",
          "questions": "$categories.sousCategories.niveaux.exercices.questions",
          "categorieId": "$categories._id",
          "categorieNom": "$categories.nom",
          "sousCategorieId": "$categories.sousCategories._id",
          "sousCategorieNom": "$categories.sousCategories.nom"
        }
      }
    ]);

    const exerciseIndex = Math.floor(random * allExercises.length);
    const exercise = allExercises[exerciseIndex];

    if (!exercise) {
      return res.status(404).json({ error: 'Exercice not found' });
    }

    res.json({
      categorieNom: exercise.categorieNom,
      sousCategorieNom: exercise.sousCategorieNom,
      exercice: {
        _id: exercise._id,
        intitule: exercise.intitule,
        lien: exercise.lien,
        explication: exercise.explication,
        questions: exercise.questions
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Error: ' + error });
  }
});

module.exports = router;