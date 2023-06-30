import React, { useState } from 'react';
import '../css/TrouQuestion.css';

function TrouQuestion({ ennonce, reponse, repondu, onUserResponse }) {
  const regex = /\.{2,}/g;
  const [inputValue, setInputValue] = useState('');
  const ennonceUpdated = remplacePointsParInput(ennonce);
  const [corrige, setCorrige] = useState('');

  // Actions effectuées en cliquant sur "Valider"
  function handleClick() {
    if (repondu === null) {
      if (inputValue === reponse) {
        setCorrige(
          <p dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="reponseUtilisateur correct">${inputValue}</span>`) }} />
        );
        onUserResponse(true, inputValue);
      } else {
        setCorrige(
          <>
            <p dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="reponseUtilisateur incorrect">${inputValue}</span>`) }} />
            <p className='correction' dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="correct">${reponse}</span>`) }} />
          </>
        );
        onUserResponse(false, inputValue);
      }
      setInputValue('');
    }
  }

  // Remplace les points en input
  function remplacePointsParInput(str) {
    const parts = str.split(regex);
    const elements = parts.map((part, index) => {
      return (
        <React.Fragment key={`element-${index}`}>
          {part}
          {index !== parts.length - 1 && <input type="text" className="user-input" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />}
        </React.Fragment>
      );
    });

    return elements;
  }
  

  return (
    <div className='TrouQuestion'>
      {repondu === null ? (
        <div className='ennonce'>
          <p className='textEnnonce'>
            {ennonceUpdated}
          </p>
          <div className='validation'>
            <button onClick={handleClick}>Valider</button>
          </div>
        </div>
      ) : (
        <div>
          {corrige}
        </div>
      )}
    </div>
  );
}

export default TrouQuestion;
