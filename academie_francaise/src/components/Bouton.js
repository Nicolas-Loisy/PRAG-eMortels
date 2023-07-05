import React from 'react';
import '../css/Bouton.css';

function Bouton({ nom, url, version}) { 

  const handleClick = (url) => {
    window.location.href = url;
  };

  if (version === "Primaire") {
    return (
    <div className="Bouton Primaire" onClick={() => handleClick(url)}>
      <p>{nom}</p>
    </div>
    );
  } 
}

export default Bouton;
