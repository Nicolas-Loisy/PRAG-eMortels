import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";

import Question from '../components/Question';
import Content from "../components/Content"
import Tag from "../components/Tag";
import Numerotation from "../components/Numerotation";
import Recap from '../components/Recap';
import Bulle from '../components/Bulle';
import Bouton from '../components/Bouton';


import { api } from "../api/Api";

import '../css/ExercicePrecis.css';

function ExercicePrecis() {
  const params = useParams();
  const [exercice, setExercice] = useState(null);
  const [questionCourante, setQuestionCourante] = useState(0);
  const [voirRecap, setVoirRecap] = useState(false);
  const [message, setMessage] = useState({
    suggestion: <p>Besoin d'aide ?<br /><b>Clique sur moi !</b></p>,
    aide: null
  });
  const [statutMessage, setStatutMessage] = useState("attente");

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
    setStatutMessage("aide");
  };

  // Afficher la question sélectionnée
  const handleClickQuestion = (numQuestion) => {
    setVoirRecap(false); // Masquer le résumé de fin d'exercice
    setQuestionCourante(numQuestion); // Modifier la question à afficher

    if (exercice.exercice.questions[numQuestion] && exercice.exercice.questions[numQuestion].repondu != null){
      setStatutMessage("aide");
    } else {
      setStatutMessage("attente");
    }
  };

  // Afficher l'explication/règle, l'extra et le lien
  const handleClickMascotte = () => {
    if (statutMessage !== "aide"){
      setStatutMessage("aide");
    } else {
      setStatutMessage("masque");
    }
  };

  // Requète API lorsque params change
  useEffect(() => {
    fetchData();
  }, [fetchData, params]);

  // Création du message d'aide 
  useEffect(() => {
    if (exercice !== null) {
      var messageAide = null;
  
      // Récupération du message (extra = spécifique à la question par défaut, puis explication = lié à l'exercice)
      if (exercice.exercice.questions[questionCourante] && exercice.exercice.questions[questionCourante].extra && exercice.exercice.questions[questionCourante].extra !== null) {
        messageAide = <p dangerouslySetInnerHTML={{ __html: exercice.exercice.questions[questionCourante].extra }} />;
      }
      else if (exercice.exercice.explication && exercice.exercice.explication !== null) {
        messageAide = <p dangerouslySetInnerHTML={{ __html: exercice.exercice.explication }} />;
      }
  
      // Récupération du lien avec la même logique
      if (exercice.exercice.questions[questionCourante] && exercice.exercice.questions[questionCourante].lien && exercice.exercice.questions[questionCourante].lien !== null) {
        messageAide = (
          <>
            {messageAide}
            <a href={exercice.exercice.questions[questionCourante].lien} target='_blank' rel='noopener noreferrer'>
              En savoir plus
            </a>
          </>
        );
      }
      else if (exercice.exercice.lien && exercice.exercice.lien !== null) {
        messageAide = (
          <>
            {messageAide}
            <a href={exercice.exercice.lien} target='_blank' rel='noopener noreferrer'>
              En savoir plus
            </a>
          </>
        );
      }
  
      // Mise à jour de la valeur 
      setMessage(prevMessage => ({
        ...prevMessage,
        aide: messageAide
      }));
    }
  }, [exercice, questionCourante]);
  
  
  // Effectue  l'apparition d'une bulle de dialogue toutes les 10 secondes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (statutMessage === "attente") {
        setStatutMessage("suggestion");
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [questionCourante, statutMessage]);


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
            <div className="Mascotte" onClick={handleClickMascotte} />
            {
              statutMessage !== "attente" && statutMessage !== "masque" &&
              <Bulle>
                {message[statutMessage]}
              </Bulle>
            }
          </div>

          <div className="col_2">
            {exercice && (
              <>
                {/* Affichage classique (hors récap) */}
                {!voirRecap ? (
                  <>
                    {/* Contenu de l'exercice */}
                    <div>
                      <p className="intitule" dangerouslySetInnerHTML={{ __html: exercice.exercice.intitule }} />
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
                            <p onClick={() => handleClickQuestion(questionCourante - 1)}>
                              Précédent
                            </p>
                          </Tag>
                        </div>
                      )}

                      {exercice.exercice.questions[questionCourante].repondu !== null && questionCourante < exercice.exercice.questions.length - 1 && (
                        <div>
                          <Tag className="Cliquable">
                            <p onClick={() => handleClickQuestion(questionCourante + 1)}>
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
                              setStatutMessage("masque");
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
                    <Bouton 
                      nom={"Accueil"}
                      url={"/"}
                      className={"Primaire"}
                    />
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