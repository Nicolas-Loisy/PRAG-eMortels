import React from 'react';
import '../css/Bouton.css';

function Bouton({ nom, url, className }) {

  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className={"Bouton " + className}  onClick={() => handleClick(url)}>
      <p dangerouslySetInnerHTML={{ __html: nom }}/>
    </div>
  )

}

export default Bouton;
