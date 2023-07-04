import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";

import Question from '../components/Question';
import Content from "../components/Content"
import Tag from "../components/Tag";
import Numerotation from "../components/Numerotation";
import Recap from '../components/Recap';

import { api } from "../api/Api";

import '../css/ExerciceAleatoire.css';

function ExerciceAleatoire() {
  const params = useParams();
  const [exercice, setExercice] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionCourante, setQuestionCourante] = useState(0);
  const [voirRecap, setVoirRecap] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // Etape 1: Requête API
      const exerciceData = await api.getNbQuestionsNiveau(params.niveau, 10);

      // Etape 2: Ajout du champ repondu = null
      const updatedQuestions = exerciceData.questions.map((question) => ({
        ...question,
        question: {
          ...question.question,
          repondu: null,
        },
      }));

      // Etape 4: Mise à jour de la valeur de la variable exercice
      setExercice(updatedQuestions);

      // Etape 5 : Création d'une liste de questions
      setQuestions(updatedQuestions.map(question => ({
        ...question.question,
      })));

    } catch (error) {
      console.error(error);
    }
  }, [params]);


  // Enregistrer la réponse d'un utilisateur
  const handleUserResponse = (index, isCorrect, reponseUtilisateur) => {
    setExercice((prevExercice) => {
      // Récupération de la variable exercice
      const updatedExercice = [...prevExercice];

      // Copie de la question existante avec le spread operator
      const updatedQuestion = {
        ...updatedExercice[index].question,
        repondu: isCorrect,
        reponseUtilisateur: reponseUtilisateur,
      };

      // Remplace la question existante par la nouvelle question mise à jour
      updatedExercice[index].question = updatedQuestion;

      return updatedExercice;
    });
  };

  // Afficher la question sélectionnée
  const handleClickQuestion = (numQuestion) => {
    setVoirRecap(false); // Masquer le résumé de fin d'exercice
    setQuestionCourante(numQuestion); // Modifier la question à afficher
  };

  // Effectue une requète API lorsque params change
  useEffect(() => {
    fetchData();
  }, [fetchData, params]);

  // Met à jour questions lorsque exercice est modifié
  useEffect(() => {
    if (exercice !== null) {
      setQuestions(exercice.map(question => ({
        ...question.question,
      })));
    }
  }, [exercice]);

  return (
    <Content>
      <div className="ExerciceAleatoire">

        {/* Tags d'identifications de l'exercice */}
        {exercice &&
          <div className="TagList">
            <div className="col_1">
              <Tag>
                <p>{exercice[questionCourante].categorieNom}</p>
              </Tag>
              <Tag>
                <p>{exercice[questionCourante].sousCategorieNom}</p>
              </Tag>
            </div>

            <div className="col_2">
              <Tag>
                <p>{"Niveau " + params.niveau}</p>
              </Tag>
              <Tag>
                <p>{"Exercice " + exercice[questionCourante].exerciceId}</p>
              </Tag>
            </div>
          </div>
        }

        <div className="col_container">
          {/* Affichage de la mascotte et des règles de français */}
          <div className="col_1">
            <div className="Mascotte"></div>
          </div>
          <div className="col_2">
            {exercice && (
              <>
                {/* Affichage classique (hors récap) */}
                {!voirRecap ? (
                  <>
                    {/* Contenu de l'exercice */}
                    <div>
                      <p className="intitule" dangerouslySetInnerHTML={{ __html: exercice[questionCourante].intitule }} />
                      <Question
                        question={questions[questionCourante]}
                        index={questionCourante}
                        handleUserResponse={handleUserResponse}
                      />
                    </div>

                    {/* Navigation (précédent / suivant) */}
                    <div className="Navigation tagCliquable">
                      {questionCourante > 0 && (
                        <div>
                          <Tag className="Cliquable">
                            <p onClick={() => setQuestionCourante((prevQuestionCourante) => prevQuestionCourante - 1)}>
                              Précédent
                            </p>
                          </Tag>
                        </div>
                      )}

                      {exercice[questionCourante].repondu !== null && questionCourante < exercice.length - 1 && (
                        <div>
                          <Tag className="Cliquable">
                            <p onClick={() => setQuestionCourante((prevQuestionCourante) => prevQuestionCourante + 1)}>
                              Suivant
                            </p>
                          </Tag>
                        </div>
                      )}
                    </div>

                    {/* Affichage du bouton résumé */}
                    {questions.every((question) => question.repondu !== null) && (
                      <div className="tagCliquable">
                        <Tag className="Cliquable">
                          <p
                            onClick={() => {
                              setVoirRecap(true);
                              setQuestionCourante(-1);
                            }}
                          >
                            Résumé
                          </p>
                        </Tag>
                      </div>
                    )}
                  </>
                ) : (

                  /* Affichage du score du joueur */
                  <div className="Recap">
                    <Recap questions={questions} />
                    <div>
                      <Tag className="Cliquable">
                        <p onClick={() => { window.location.href = "/" }}>Accueil</p>
                      </Tag>
                    </div>
                  </div>
                )}

                {/* Navigation entre les questions (numéros) */}
                <Numerotation
                  questions={questions}
                  questionCourante={questionCourante}
                  onClick={handleClickQuestion}
                />

              </>
            )}
          </div>

          {/* Colonne non utilisée */}
          <div className="col3"></div>
        </div>
      </div>
    </Content>
  );
}

export default ExerciceAleatoire;
