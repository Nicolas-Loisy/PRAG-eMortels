import React from 'react';
import Tag from './Tag';
import '../css/ConteneurTag.css';

function ConteneurTag({ categorie }) {
  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className="ConteneurTag">
      <h3>{categorie.nom}</h3>
      <div className='Tags'>
        {
          Object.values(categorie.sousCategories).map((sousCategorie, index) => {
            return (
              <Tag key={index} className="Cliquable">
                <p onClick={() => handleClick()}>{sousCategorie}</p>
              </Tag>
            );
          })
        }
      </div>
    </div>
  );
}

export default ConteneurTag;
