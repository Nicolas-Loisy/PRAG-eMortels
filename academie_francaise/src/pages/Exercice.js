import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";

import Question from '../components/Question';
import Content from "../components/Content"
import Tag from "../components/Tag";
import Numerotation from "../components/Numerotation";
import Recap from '../components/Recap';

import { api } from "../api/Api";

import '../css/Exercice.css';

function Exercice() {
  const params = useParams();
  const [exercice, setExercice] = useState(null);
  const [questionCourante, setQuestionCourante] = useState(0);
  const [voirRecap, setVoirRecap] = useState(false);

  // Extraction des données de la BDD
  const fetchData = useCallback(async () => {
    try {
      // Etape 1 : Requête API
      const exerciceData = await api.getExercice(
        params.categorie,
        params.sousCategorie,
        params.niveau,
        params.exercice
      );

      // Etape 2 : Ajout du champ repondu = null
      const updatedQuestions = exerciceData.exercice.questions.map((question) => ({
        ...question,
        repondu: null,
      }));

      // Etape 3 : Mise à jour de la liste des questions de l'exercice
      const updatedExercice = {
        ...exerciceData.exercice,
        questions: updatedQuestions,
      };

      // Etape 4 : Mise à jour de la valeur de la variable exercice
      setExercice({
        ...exerciceData,
        exercice: updatedExercice,
      });

    } catch (error) {
      console.error(error);
    }
  }, [params]); // Si params change alors fetchData est actualisé


  // Enregistrer la réponse d'un utilisateur
  const handleUserResponse = (index, isCorrect, reponseUtilisateur) => {
    setExercice((prevExercice) => {
      // récupération de la variable exercice
      const { exercice } = prevExercice;

      // Copie des questions existantes avec le spread operator
      const updatedQuestions = [...exercice.questions];

      // Enregistrement de la réponse de l'utilisateur
      const updatedQuestion = {
        ...updatedQuestions[index],
        repondu: isCorrect,
        reponseUtilisateur: reponseUtilisateur,
      };

      // Remplace la question existante par la nouvelle question mise à jour
      updatedQuestions[index] = updatedQuestion;

      // Création de l'objet updatedExercice avec les questions mises à jour
      const updatedExercice = {
        ...exercice,
        questions: updatedQuestions,
      };

      // Retour de l'exercice mis à jour dans l'objet retourné par setExercice
      return {
        ...prevExercice,
        exercice: updatedExercice,
      };
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

  return (
    <Content>
      <div className="Exercice">

        {/* Tags d'identifications de l'exercice */}
        {exercice &&
          <div className="TagList">
            <div className="col_1">
              <Tag>
                <p>{exercice.categorieNom}</p>
              </Tag>
              <Tag>
                <p>{exercice.sousCategorieNom}</p>
              </Tag>
            </div>

            <div className="col_2">
              <Tag>
                <p>{"Niveau " + params.niveau}</p>
              </Tag>
              <Tag>
                <p>{"Exercice " + params.exercice}</p>
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
                      <p className="intitule">{exercice.exercice.intitule}</p>
                      <Question
                        question={exercice.exercice.questions[questionCourante]}
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

                      {exercice.exercice.questions[questionCourante].repondu !== null && questionCourante < exercice.exercice.questions.length - 1 && (
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
                    {exercice.exercice.questions.every((question) => question.repondu !== null) && (
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
                    <Recap questions={exercice.exercice.questions} />
                    <div>
                      <Tag className="Cliquable">
                        <p onClick={() => { window.location.href = "/" }}>Accueil</p>
                      </Tag>
                    </div>
                  </div>
                )}

                {/* Navigation entre les questions (numéros) */}
                <Numerotation
                  questions={exercice.exercice.questions}
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

export default Exercice;
