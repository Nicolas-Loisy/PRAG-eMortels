import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Content from "../components/Content";

import { api } from "../api/Api";
import "../css/ExerciceAleatoire.css";
import QcmQuestion from '../components/QcmQuestion';
import TrouQuestion from '../components/TrouQuestion';
import SubstitutionQuestion from '../components/SubstitutionQuestion';

function ExerciceAleatoire() {
  const [questions, setQuestions] = useState([]);
  const [renderedQuestions, setRenderedQuestions] = useState([]);
  const [questionCourante, setQuestionCourante] = useState(0);
  const params = useParams();

  const fetchData = useCallback(async () => {
    try {
      const questionsData = await api.getNbQuestionsNiveau(params.niveau, 10);
      setQuestions(questionsData.questions);
    } catch (error) {
      console.error(error);
    }
  }, [params.niveau]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (questions.length > 0) {
      console.log(questions);

      const updatedRenderedQuestions = questions.map((question, index) => {
        switch (question.question.type) {
          case "QCM":
            return (
              <QcmQuestion
                key={index}
                ennonce={question.question.question}
                reponses={question.question.reponses}
                repondu={question.question.repondu}
                onUserResponse={(isCorrect, reponseUtilisateur) =>
                  handleUserResponse(index, isCorrect, reponseUtilisateur)
                }
                reponseUtilisateur={question.question.reponseUtilisateur}
              />
            );
          case "phraseTrous":
            return (
              <TrouQuestion
                key={index}
                ennonce={question.question.question}
                reponse={question.question.reponse}
                repondu={question.question.repondu}
                onUserResponse={(isCorrect, reponseUtilisateur) =>
                  handleUserResponse(index, isCorrect, reponseUtilisateur)
                }
                reponseUtilisateur={question.question.reponseUtilisateur}
              />
            );
          case "substitution":
            return (
              <SubstitutionQuestion
                key={index}
                ennonce={question.question.question}
                reponse={question.question.reponse}
                repondu={question.question.repondu}
                onUserResponse={(isCorrect, reponseUtilisateur) =>
                  handleUserResponse(index, isCorrect, reponseUtilisateur)
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
  }, [questions]);

  const handleUserResponse = (index, isCorrect, reponseUtilisateur) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        question: {
          ...updatedQuestions[index].question,
          repondu: isCorrect,
          reponseUtilisateur: reponseUtilisateur,
        },
      };
      return updatedQuestions;
    });
  };
  

  return (
    <Content>
      <div className="ExerciceAleatoire">
        <h1>Niveaux {params.niveau}</h1>
        <div className='ExerciceConteneur'>
          {questions.length > 0 && (
            <>
              <p className='Intitule'>{questions[0].intitule}</p>
              {renderedQuestions[questionCourante]}
            </>
          )}
        </div>
      </div>
    </Content>
  );
  
}

export default ExerciceAleatoire;
