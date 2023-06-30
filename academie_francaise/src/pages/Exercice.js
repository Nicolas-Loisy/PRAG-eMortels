import { useState } from 'react';
import { useParams } from "react-router-dom";

import QcmQuestion from "../components/QcmQuestion";
import TrouQuestion from "../components/TrouQuestion";
import Content from "../components/Content"
import Tag from "../components/Tag";
import Ariane from "../components/Ariane";
import NumQuestion from "../components/NumQuestion";
import Recap from '../components/Recap';

import { getCategorieById, getSousCategorieById, getNiveauById, getExerciceById } from '../utils/Api';
import '../css/Exercice.css';

function Exercice() {

  const { categorieId, sousCategorieId, niveauId, exerciceId } = useParams();

  const categorie = getCategorieById(categorieId);
  const sousCategorie = getSousCategorieById(categorieId, sousCategorieId);
  const niveau = getNiveauById(categorieId, sousCategorieId, niveauId);
  const exercice = getExerciceById(categorieId, sousCategorieId, niveauId, exerciceId);

  const [questions, setQuestions] = useState(
    Object.values(exercice.questions).map(question => ({ ...question, repondu: null }))
  );

  const [questionCourante, setQuestionCourante] = useState(0);
  const [voirRecap, setVoirRecap] = useState(false);
  const pages = [
    { nom: categorie.nom, url: '/parcours-precis' },
    { nom: sousCategorie.nom, url: '/parcours-precis/' + categorie._id + "/" + sousCategorie._id },
    { nom: niveau.nom, url: '/parcours-precis/' + categorie._id + "/" + sousCategorie._id },
    { nom: "Exercice " + exercice._id}
  ];

  const handleClickQuestion = (numQuestion) => {
    setVoirRecap(false);
    setQuestionCourante(numQuestion);
  };

  const handleUserResponse = (index, isCorrect, userInput) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], repondu: isCorrect , reponseUtilisateur: userInput};
      return updatedQuestions;
    });
  };

  const renderedQuestions = Object.values(exercice.questions).map((question, index) => {
    switch (question.type) {
      case "QCM":
        return (
          <QcmQuestion
            ennonce={question.question}
            reponses={question.reponses}
            repondu={questions[index].repondu}
            onUserResponse={(isCorrect) => handleUserResponse(index, isCorrect)}
          />
        );
        case "phraseTrous":
          return (
            <TrouQuestion
              ennonce={question.question}
              reponse={question.reponse}
              repondu={questions[index].repondu}
              onUserResponse={(isCorrect, userInput) => handleUserResponse(index, isCorrect, userInput)}
              reponseUtilisateur={questions[index].reponseUtilisateur}
            />
          );
      default:
        console.log("Type de question non pris en charge: " + question.type);
        return null;
    }
  });

  return (
    <Content>
      <div className="Exercice">

        {/* Affichage des tags identifiants l'exercice */}
        <div className="TagList">
          <div className="col_1">
            <Tag>
              <p>{categorie.nom}</p>
            </Tag>
            <Tag>
              <p>{sousCategorie.nom}</p>
            </Tag>
          </div>

          <div className="col_2">
            <Tag>
              <p>{niveau.nom}</p>
            </Tag>
            <Tag>
              <p>{"Exercice" + exercice._id}</p>
            </Tag>
          </div>
        </div>

        <div className='col_container'>

          {/* Affichage de la mascotte et des règles de français */}
          <div className='col_1'>
            <div className='Mascotte'></div>
          </div>

          {/* Contenu principal de l'exercice */}
          <div className='col_2'>

            {/* Question ou récapitulatif du score */}
            <div>
              {voirRecap ? (
                <div className='Recap'>
                  <Recap questions={questions} />
                  <div>
                    <Tag className='Cliquable'>
                      <p onClick={() => { }}>Accueil</p>
                    </Tag>
                  </div>
                </div>
              ) : (
                <div>
                  <p className='intitule'>{exercice.intitule}</p>
                  {renderedQuestions[questionCourante]}
                </div>
              )}
            </div>

            {/* Bouton de navigation entre les questions */}
            {!voirRecap && (
              <div className='Navigation tagCliquable'>
                {questionCourante > 0 && (
                  <div>
                    <Tag className='Cliquable'>
                      <p onClick={() => setQuestionCourante(prevQuestionCourante => prevQuestionCourante - 1)}>Précédent</p>
                    </Tag>
                  </div>
                )}

                {questionCourante < questions.length - 1 && questions[questionCourante].repondu !== null && (
                  <div>
                    <Tag className='Cliquable'>
                      <p onClick={() => setQuestionCourante(prevQuestionCourante => prevQuestionCourante + 1)}>Suivant</p>
                    </Tag>
                  </div>
                )}
              </div>
            )}

            {/* Bouton de récapitulatif */}
            {questions.every(question => question.repondu !== null) && !voirRecap && (
              <div className='tagCliquable'>
                <Tag className='Cliquable'>
                  <p onClick={() => {
                    setVoirRecap(true);
                    setQuestionCourante(-1);
                  }}>Résumé</p>
                </Tag>
              </div>
            )}

            {/* Numératation des questions */}
            <div className='pagination'>
              {renderedQuestions.map((question, i) => (
                <NumQuestion
                  key={i}
                  Num={i}
                  isSelected={i === questionCourante}
                  onClick={() => handleClickQuestion(i)}
                  repondu={questions[i].repondu}
                />
              ))}
            </div>
          </div>

          {/* Colonne non utilisée */}
          <div className='col3'></div>
        </div>

        {/* Fil d'ariane */}
        <Ariane pages={pages} />

      </div>
    </Content>
  );
}

export default Exercice;
