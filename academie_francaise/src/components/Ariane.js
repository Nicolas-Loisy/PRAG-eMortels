import React from 'react';
import '../css/Ariane.css';

function Ariane({ pages }) {
  return (
    <div className='Ariane'>
      {
        pages.map((page, index) => (
          page.url ? (
            <React.Fragment key={index}>
              <a href={page.url}>{page.nom}</a>
              <span> &#x203A; </span>
            </React.Fragment>
          ) : (
            <span key={index}>{page.nom}</span>
          )
        ))
      }
    </div>
  );
}

export default Ariane;
