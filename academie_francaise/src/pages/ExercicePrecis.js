import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";

import Question from '../components/Question';
import Content from "../components/Content"
import Tag from "../components/Tag";
import Numerotation from "../components/Numerotation";
import Recap from '../components/Recap';
import Bulle from '../components/Bulle';

import { api } from "../api/Api";

import '../css/ExercicePrecis.css';

function ExercicePrecis() {
  const params = useParams();
  const [exercice, setExercice] = useState(null);
  const [questionCourante, setQuestionCourante] = useState(0);
  const [voirRecap, setVoirRecap] = useState(false);
  const [voirExplication, setVoirExplication] = useState(false);
  const [voirBulle, setVoirBulle] = useState(false);

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

      // Vérification si l'utilisateur a répondu à la question
      const aRepondu = updatedQuestions.some((question) => question.repondu !== null);

      // Mettre à jour l'état de voirExplication en fonction de la réponse de l'utilisateur
      setVoirExplication(aRepondu);

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
    setVoirExplication(false); // Masquer l'explication de l'exercice
    setVoirBulle(false); // Masquer la bulle de discussion de la mascotte
  };

  // Afficher l'explication/règle, l'extra et le lien
  const handleClickExplication = () => {
    setVoirExplication(!voirExplication); // Changer l'apparition de l'explication à chaque clic
    setVoirBulle(false); // Masquer la bulle de discussion de la mascotte
  };

  // Effectue une requète API lorsque params change
  useEffect(() => {
    fetchData();
  }, [fetchData, params]);

  // Effectue  l'apparition d'une bulle de dialogue toutes les 10 secondes
  useEffect(() => {
    setVoirBulle(false); // Réinitialise la valeur de voirBulle à false à chaque changement de question
  
    const timeout = setTimeout(() => {
      if (!voirExplication){
        setVoirBulle(true); // Active la bulle après 10 secondes
      }
    }, 2000);
  
    return () => {
      clearTimeout(timeout); // Annule le timer lorsque le composant est démonté
    };
  }, [questionCourante, voirExplication]);
  
  return (
    <Content>
      <h1>EXERCICE</h1>
      <div className="ExercicePrecis">

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
            <div className="Mascotte" onClick={handleClickExplication}/>
              {/* Affichage de la bulle de dialogue uniquement après 10s et si l'utilisateur n'a pas déjà répondu */}
              {voirBulle && exercice.exercice.questions[questionCourante].repondu === null && !exercice.exercice.questions[questionCourante].extra && !exercice.exercice.questions[questionCourante].lien && (
                <Bulle>
                <p> Si tu as besoin d'aide pour cette question, n'hésite pas à cliquer sur moi ! <br/>
                    Je suis là pour t'assister et te guider dans la bonne direction.
                </p>
              </Bulle>
              )}

              {/* Affichage de la règle de français et du lien s'ils existent */}
              {voirExplication && exercice.exercice.explication && exercice.exercice.lien && (
                    <div className='ExplicationEtLien'>
                      <div className="Explication">
                        <p dangerouslySetInnerHTML={{ __html: exercice.exercice.explication}}/>
                        <div className="Lien">
                          <a href={exercice.exercice.lien}  target="_blank" rel="noreferrer">Lien d'explication</a>
                        </div>
                      </div>
                    </div>
              )}
              
              {/* Affichage de la règle de français et du lien s'ils existent */}
              {voirExplication && exercice.exercice.explication && exercice.exercice.lien && (
                    <div className='ExplicationEtLien'>
                      <div className="Explication">
                        <p dangerouslySetInnerHTML={{ __html: exercice.exercice.explication}}/>
                        <div className="Lien">
                          <a href={exercice.exercice.lien}  target="_blank" rel="noreferrer">Lien d'explication</a>
                        </div>
                      </div>
                    </div>
              )}

              {/* Affichage de l'extra et du lien s'ils existent et que l'utilisateur ait répondu à la question */}
              {voirExplication && exercice.exercice.questions[questionCourante].repondu !== null && exercice.exercice.questions[questionCourante].extra && exercice.exercice.questions[questionCourante].lien && (
                    <div className='ExplicationEtLien'>
                      <div className="Explication">
                        <p dangerouslySetInnerHTML={{ __html: exercice.exercice.questions[questionCourante].extra}}/>
                        <div className="Lien">
                          <a href={exercice.exercice.questions[questionCourante].lien}  target="_blank" rel="noreferrer">Lien d'explication</a>
                        </div>
                      </div>
                    </div>
              )}
          </div>

          <div className="col_2">
            {exercice && (
              <>
                {/* Affichage classique (hors récap) */}
                {!voirRecap ? (
                  <>
                    {/* Contenu de l'exercice */}
                    <div>
                      <p className="intitule" dangerouslySetInnerHTML={{ __html: exercice.exercice.intitule}}/>
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

export default ExercicePrecis;
