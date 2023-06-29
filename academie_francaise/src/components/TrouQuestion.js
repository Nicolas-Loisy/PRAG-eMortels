import React, { useState } from 'react';
import '../css/TrouQuestion.css';

function TrouQuestion({ ennonce, reponse, repondu, onUserResponse, reponseUtilisateur }) {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    if (repondu === null) {
      if (inputValue === reponse) {
        onUserResponse(true, inputValue);
      } else {
        onUserResponse(false, inputValue);
      }
      setInputValue(''); // Réinitialise la valeur de l'input après la validation
    }
  };

  const regex = /\.{2,}/g;
  const parts = ennonce.split(regex);

  return (
    <div className='TrouQuestion'>
      {parts.map((part, index) => {
        if (index === parts.length - 1) {
          return <span key={index}>{part}</span>;
        } else {
          if (repondu !== null) {
            if (repondu) return(
              <React.Fragment key={index}>
              <br/>
              <h3>{part} <div className={`${repondu !== null ? repondu ? 'correct' : 'incorrect' : ''} inline-div`}>
                {reponseUtilisateur}</div>.
              </h3>
            </React.Fragment>
            );
            else
          return(
            <React.Fragment key={index}>
              <br/>
              <h3>{part} <div className={`${repondu !== null ? repondu ? 'correct' : 'incorrect' : ''} inline-div`}>
                {reponseUtilisateur}</div>.
              </h3>
              <p className='correction'>{part} <div className={`correct inline-div`}> {reponse}</div>.</p>
            </React.Fragment>
          );
          } else {
          return (
            <React.Fragment key={index}>
              <br/>
              <h3>{part}
              <input type="text" placeholder='...' className="user-input" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />.
              </h3>
              <ul><li onClick={handleClick}>Valider</li></ul>
            </React.Fragment>
          );
          }
        }
      })}
      
    </div>
  );
}

export default TrouQuestion;
