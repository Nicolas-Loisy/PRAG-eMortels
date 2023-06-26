import React from 'react';
import '../css/Ariane.css';

function Ariane({ pages }) {
  return (
    <div className='Ariane'>
      {pages.map((page) => (
        page.url ? (
          <>
            <a href={page.url}>{page.nom}</a>
            <span> &#x203A; </span>
          </>
        ) : (
          <span>{page.nom}</span>
        )
      ))}
    </div>
  );
}

export default Ariane;
