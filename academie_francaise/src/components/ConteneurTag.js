import React from 'react';
import '../css/ConteneurTag.css';

function ConteneurTag({ nom, tags }) {
  return (
    <div className="ConteneurTag">
      <h3>{nom}</h3>
      <div className='Tags'>
        {tags.map((tag) => (
           tag 
        ))}
      </div>
    </div>
  );
}

export default ConteneurTag;
