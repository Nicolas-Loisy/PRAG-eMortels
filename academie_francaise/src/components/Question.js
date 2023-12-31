import React, { useCallback } from 'react';

import QcmQuestion from './QcmQuestion';
import SubstitutionQuestion from './SubstitutionQuestion';
import TrouQuestion from './TrouQuestion';
import EfQuestion from './EfQuestion';
import ReperageQuestion from './ReperageQuestion';

import '../css/Question.css';

function Question({ question, index, handleUserResponse }) {
  // Création des composants HTML contenant les questions
  const renderQuestionComponent = useCallback(() => {
    switch (question.type) {
      case 'QCM':
        return (
          <QcmQuestion
            key={index}
            enonce={question.question}
            reponses={question.reponses}
            repondu={question.repondu}
            onUserResponse={(isCorrect, reponseUtilisateur) =>
              handleUserResponse(index, isCorrect, reponseUtilisateur)
            }
            reponseUtilisateur={question.reponseUtilisateur}
          />
        );
      case 'phraseTrous':
        return (
          <TrouQuestion
            key={index}
            enonce={question.question}
            reponse={question.reponse}
            repondu={question.repondu}
            onUserResponse={(isCorrect, reponseUtilisateur) =>
              handleUserResponse(index, isCorrect, reponseUtilisateur)
            }
            reponseUtilisateur={question.reponseUtilisateur}
          />
        );
      case 'substitution':
        return (
          <SubstitutionQuestion
            key={index}
            enonce={question.question}
            reponse={question.reponse}
            repondu={question.repondu}
            onUserResponse={(isCorrect, reponseUtilisateur) =>
              handleUserResponse(index, isCorrect, reponseUtilisateur)
            }
            reponseUtilisateur={question.reponseUtilisateur}
          />
        );
        case "EF":
          return (
            <EfQuestion
              enonce={question.question}
              reponse={question.reponse}
              motErreur={question.motErreur}
              repondu={question.repondu}
              onUserResponse={(isCorrect, reponseUtilisateur) =>
                handleUserResponse(index, isCorrect, reponseUtilisateur)
              }
              reponseUtilisateur={question.reponseUtilisateur}
            />
          );
        case "reperage":
          return (
            <ReperageQuestion
              enonce={question.question}
              reponse={question.reponse}
              repondu={question.repondu}
              onUserResponse={(isCorrect, reponseUtilisateur) =>
                handleUserResponse(index, isCorrect, reponseUtilisateur)
              }
              reponseUtilisateur={question.reponseUtilisateur}
            />
          );
      default:
        console.error('Type de question non pris en charge: ' + question.type);
        return null;
    }
  }, [question, index, handleUserResponse]);

  return <>{renderQuestionComponent()}</>;
}

export default Question;
