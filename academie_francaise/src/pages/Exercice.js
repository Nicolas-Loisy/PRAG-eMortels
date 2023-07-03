import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import QcmQuestion from "../components/QcmQuestion";
import TrouQuestion from "../components/TrouQuestion";
import Content from "../components/Content"
import Tag from "../components/Tag";
import NumQuestion from "../components/NumQuestion";
import Recap from '../components/Recap';

import { api } from "../api/Api";

import '../css/Exercice.css';

function Exercice() {
  const params = useParams();
  const [exercice, setExercice] = useState(null);
  const [questionCourante, setQuestionCourante] = useState(0);
  const [voirRecap, setVoirRecap] = useState(false);
  const [renderedQuestions, setRenderedQuestions] = useState([]);
  const [voirExplication, setVoirExplication] = useState(false);

  const fetchData = async () => {
    try {
      const exerciceData = await api.getExercice(
        params.categorie,
        params.sousCategorie,
        params.niveau,
        params.exercice
      );
  
      const updatedQuestions = exerciceData.exercice[0].questions.map((question) => ({
        ...question,
        repondu: null,
      }));
  
      const updatedExercice = {
        ...exerciceData.exercice[0],
        questions: updatedQuestions,
      };
  
      setExercice({
        ...exerciceData,
        exercice: [updatedExercice],
      });
  
    } catch (error) {
      console.error(error);
    }
  };
      
  useEffect(() => {
    fetchData();
  }, [params]);

  useEffect(() => {
    if (exercice !== null && exercice.exercice[0].questions) {
      const updatedRenderedQuestions = exercice.exercice[0].questions.map((question, index) => {
        switch (question.type) {
          case "QCM":
            return (
              <QcmQuestion
                key={index}
                ennonce={question.question}
                reponses={question.reponses}
                repondu={question.repondu}
                regle={question.explication}
                onUserResponse={(isCorrect) => handleUserResponse(index, isCorrect)}
              />
            );
          case "phraseTrous":
            return (
              <TrouQuestion
                key={index}
                ennonce={question.question}
                reponse={question.reponse}
                repondu={question.repondu}
                regle={question.explication}
                onUserResponse={(isCorrect, userInput) =>
                  handleUserResponse(index, isCorrect, userInput)
                }
                reponseUtilisateur={question.reponseUtilisateur}
              />
            );
          default:
            console.log("Type de question non pris en charge: " + question.type);
            return null;
        }
      });

      setRenderedQuestions(updatedRenderedQuestions);
    }
  }, [exercice]);

  const handleClickQuestion = (numQuestion) => {
    setVoirRecap(false);
    setQuestionCourante(numQuestion);
    setVoirExplication(false);
  };

  const handleClickExplication = () => {
    setVoirExplication(!voirExplication);
  };

  const handleUserResponse = (index, isCorrect, userInput) => {
    setExercice((prevExercice) => {
      const updatedExercice = {
        ...prevExercice,
        exercice: [
          {
            ...prevExercice.exercice[0],
            questions: prevExercice.exercice[0].questions.map((question, i) => {
              if (i === index) {
                return {
                  ...question,
                  repondu: isCorrect,
                  reponseUtilisateur: userInput,
                };
              }
              return question;
            }),
          },
        ],
      };
      return updatedExercice;
    });
  };

  return (
    <Content>
      <div className="Exercice">
        {/* Affichage des tags identifiants l'exercice */}
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
            <div className="Mascotte" onClick={handleClickExplication}></div>
            {voirExplication && (
              <div className="Explication">
                <p dangerouslySetInnerHTML={{ __html: exercice.exercice[0].explication}}/>
              </div>
            )}
          </div>

          {/* Contenu principal de l'exercice */}
          <div className="col_2">
            {exercice && (
              <>
                {voirRecap ? (
                  <div className="Recap">
                    <Recap questions={exercice.exercice[0].questions} />
                    <div>
                      <Tag className="Cliquable">
                        <p onClick={() => { window.location.href = "/" }}>Accueil</p>
                      </Tag>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="intitule">{exercice.exercice[0].intitule}</p>
                    {renderedQuestions.length > 0 && renderedQuestions[questionCourante]}
                  </div>
                )}

                {!voirRecap && (
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

                    {exercice.exercice[0].questions[questionCourante].repondu !== null && questionCourante < exercice.exercice[0].questions.length - 1 && (
                      <div>
                        <Tag className="Cliquable">
                          <p onClick={() => setQuestionCourante((prevQuestionCourante) => prevQuestionCourante + 1)}>
                            Suivant
                          </p>
                        </Tag>
                      </div>
                    )}
                  </div>
                )}

                {exercice.exercice[0].questions.every((question) => question.repondu !== null) && !voirRecap && (
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

                <div className="pagination">
                  {exercice.exercice[0].questions.map((question, i) =>
                  (
                    <NumQuestion
                      key={i}
                      Num={i}
                      isSelected={i === questionCourante}
                      onClick={() => handleClickQuestion(i)}
                      repondu={question.repondu}
                    />
                  )
                  )}
                </div>
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
