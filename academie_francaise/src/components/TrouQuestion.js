import React, { useState, useEffect, useMemo } from 'react';
import '../css/TrouQuestion.css';

function TrouQuestion({ enonce, reponse, repondu, onUserResponse, reponseUtilisateur }) {
  const regex = useMemo(() => /\.{2,}/g, []);
  const [inputValue, setInputValue] = useState('');
  const enonceUpdated = remplacePointsParInput(enonce);
  const [corrige, setCorrige] = useState('');

  useEffect(() => {
    if (repondu === true) {
      setCorrige(
        <p dangerouslySetInnerHTML={{ __html: enonce.replace(regex, `<span class="reponseUtilisateur correct">${reponseUtilisateur}</span>`) }} />
      );
    } else {
      setCorrige(
        <>
          <p dangerouslySetInnerHTML={{ __html: enonce.replace(regex, `<span class="reponseUtilisateur incorrect">${reponseUtilisateur}</span>`) }} />
          <p className='correction' dangerouslySetInnerHTML={{ __html: enonce.replace(regex, `<span class="correct">${reponse}</span>`) }} />
        </>
      );
    }
  }, [regex, reponse, reponseUtilisateur, enonce, repondu]);

  // Actions effectuées en cliquant sur "Valider"
  function handleClick() {
    if (repondu === null) {
      if (inputValue === reponse) {
        onUserResponse(true, inputValue);
        setCorrige(
          <p dangerouslySetInnerHTML={{ __html: enonce.replace(regex, `<span class="reponseUtilisateur correct">${inputValue}</span>`) }} />
        );
      } else {
        onUserResponse(false, inputValue);
        setCorrige(
          <>
            <p dangerouslySetInnerHTML={{ __html: enonce.replace(regex, `<span class="reponseUtilisateur incorrect">${inputValue}</span>`) }} />
            <p className='correction' dangerouslySetInnerHTML={{ __html: enonce.replace(regex, `<span class="correct">${reponse}</span>`) }} />
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
        <div className='enonce'>
          <p className='textenonce'>
            {enonceUpdated}
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
