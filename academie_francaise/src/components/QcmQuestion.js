import React from 'react';
import '../css/QcmQuestion.css';

function QcmQuestion({ enonce, reponses, repondu, onUserResponse, reponseUtilisateur }) {
  const handleClick = (reponse) => {
    if (repondu === null) {
      onUserResponse(reponse.correcte, reponse.reponse);
    }
  };

  return (
    <div className='QcmQuestion'>
      <p>{enonce}</p>
      <ul>
        {Object.values(reponses).map((reponse, indexReponse) => (
          <li
            key={indexReponse}
            onClick={() => handleClick(reponse)}
            className={`${repondu !== null ? (reponse.correcte ? 'correct' : 'incorrect') : ''} ${reponseUtilisateur === reponse.reponse ? 'selected' : ''}`}
          >
            {reponse.reponse}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QcmQuestion;
