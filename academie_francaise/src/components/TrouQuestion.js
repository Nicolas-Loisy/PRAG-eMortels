import React, { useState } from 'react';
import '../css/TrouQuestion.css';

const ReactDOMServer = require('react-dom/server');
const regex = /\.{2,}/g;

function TrouQuestion({ ennonce, reponse, repondu, onUserResponse, reponseUtilisateur }) {
  const [inputValue, setInputValue] = useState('');
  // Transformation de l'input text en string
  const userInput = ReactDOMServer.renderToString(
    <input type='text' id='test' className='user-input' value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
  );
  // Remplace les points en input
  const ennonceUpdated = ennonce.replace(regex, userInput);

  // Actions effectuées en cliquant sur "Valider"
  const handleClick = () => {
    if (repondu === null) {
      console.log(inputValue);
      if (inputValue === reponse) {
        onUserResponse(true, inputValue);
      } else {
        onUserResponse(false, inputValue);
      }
      setInputValue(''); // Réinitialise la valeur de l'input après la validation
    }
  };

  return (
    <div className='TrouQuestion'>
      <div className='ennonce'>
        {repondu === null ? <div className='textEnnonce' dangerouslySetInnerHTML={{ __html: ennonceUpdated }}></div> : afficherReponseEnnonce(ennonce, repondu, reponseUtilisateur, reponse)}
      </div>
      <div className='validation'>
        {repondu === null ? <button onClick={handleClick}>Valider</button> : null}
      </div>
    </div>
  );
}

// Affichage de l'ennoncé après validation
function afficherReponseEnnonce(ennonce, repondu, reponseUtilisateur, reponse) {
  const test = <div className='correct'>{reponse}</div>
  const ennonceUpdated = ennonce.replace(regex, test);
  if (repondu === false) {
    return (
      <div className='correction'>
        <div className='ennonce' dangerouslySetInnerHTML={{ __html: ennonceUpdated }}/>
      </div>
    );
  }
}


export default TrouQuestion;