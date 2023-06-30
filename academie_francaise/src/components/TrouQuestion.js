import React, { useState, useEffect } from 'react';
import '../css/TrouQuestion.css';

function TrouQuestion({ ennonce, reponse, repondu, onUserResponse, reponseUtilisateur }) {
  const regex = /\.{2,}/g;
  const [inputValue, setInputValue] = useState('');
  const ennonceUpdated = remplacePointsParInput(ennonce);
  const [corrige, setCorrige] = useState('');

  useEffect(() => {
    if (repondu === true) {
      setCorrige(
        <p dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="reponseUtilisateur correct">${reponseUtilisateur}</span>`) }} />
      );
    } else {
      setCorrige(
        <>
          <p dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="reponseUtilisateur incorrect">${reponseUtilisateur}</span>`) }} />
          <p className='correction' dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="correct">${reponse}</span>`) }} />
        </>
      );
    }
  }, [ennonce, repondu]);

  // Actions effectuées en cliquant sur "Valider"
  function handleClick() {
    if (repondu === null) {
      if (inputValue === reponse) {
        onUserResponse(true, inputValue);
        setCorrige(
          <p dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="reponseUtilisateur correct">${inputValue}</span>`) }} />
        );
      } else {
        onUserResponse(false, inputValue);
        setCorrige(
          <>
            <p dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="reponseUtilisateur incorrect">${inputValue}</span>`) }} />
            <p className='correction' dangerouslySetInnerHTML={{ __html: ennonce.replace(regex, `<span class="correct">${reponse}</span>`) }} />
          </>
        );
      }
      setInputValue('');
    }
  }

  function remplacePointsParInput(str) {
    const parts = str.split(regex);
    const elements = parts.map((part, index) => {
      return (
        <React.Fragment key={`element-${index}`}>
          <span dangerouslySetInnerHTML={{ __html: part }} />
          {index !== parts.length - 1 && (
            <input type="text" className="user-input" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
          )}
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
            <div className="button" onClick={handleClick}>Valider</div>
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
