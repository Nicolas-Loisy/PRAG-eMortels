import React from 'react';
import '../css/Recap.css';

function Recap({ questions }) {
  const score = calculateScore();
  const pourcentage = (score / questions.length) * 100;
  const message = choixMessage(pourcentage);

  function calculateScore() {
    let score_temp = 0;

    questions.forEach(question => {
      if (question.repondu === true) {
        score_temp++;
      }
    });
    return score_temp;
  }

  function choixMessage(score) {
    if (score < 60) {
      return "";
    } else if (score < 100) {
      return "Bravo ! ";
    } else if (score === 100) {
      return "Parfait ! ";
    }
  }

  return (
    <div className='Recap'>
      <p className='message'>{message}&nbsp;Vous avez eu&nbsp;&nbsp;<span className='score'>{pourcentage}%</span>&nbsp;&nbsp;de bonnes réponses !</p>
    </div>

  );
}

export default Recap;
