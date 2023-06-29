import { useState } from 'react';

import QcmQuestion from "../components/QcmQuestion";
import Content from "../components/Content"
import Tag from "../components/Tag";
import Ariane from "../components/Ariane";
import NumQuestion from "../components/NumQuestion";
import Recap from '../components/Recap';
import '../css/Exercice.css';

function Exercice({ exercice, categorie }) {
  //   const [questions, setQuestions] = useState(exercice.questions.questions.map(question => ({ ...question, repondu: null })));
  const [questions, setQuestions] = useState(exercice.questions.map(question => ({ ...question, repondu: null })));
  const [questionCourante, setQuestionCourante] = useState(0);
  const [voirRecap, setVoirRecap] = useState(false);
  const pages = [
    //{ nom: exercice.categorie, url: 'https://www.example.com/page1' },
    { nom: categorie.nom, url: 'https://www.example.com/page1' },
    //{ nom: exercice.titre, url: 'https://www.example.com/page2' },
    { nom: categorie.sousCategories[0].nom, url: 'https://www.example.com/page2' },
    //{ nom: exercice.niveau }
    { nom: categorie.sousCategories[0].niveaux[1].nom }
  ];


  const handleClickQuestion = (numQuestion) => {
    setVoirRecap(false);
    setQuestionCourante(numQuestion);
  };

  const handleUserResponse = (index, isCorrect) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], repondu: isCorrect };
      return updatedQuestions;
    });
  };

  const renderedQuestions = exercice.questions.map((question, index) => {
    switch (question.type) {
      case "QCM":
        return (
          <QcmQuestion
            ennonce={question.question}
            reponses={question.reponses}
            repondu={questions[index].repondu}
            onUserResponse={isCorrect => handleUserResponse(index, isCorrect)}
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
              <p>{categorie.sousCategories[0].nom}</p>
            </Tag>
          </div>

          <div className="col_2">
            <Tag>
              <p>{categorie.sousCategories[0].niveaux[1].nom}</p>
            </Tag>
            <Tag>
              <p>{exercice._id}</p>
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
