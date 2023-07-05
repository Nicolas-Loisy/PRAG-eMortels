import React from 'react';
import '../css/Numerotation.css';

function Numerotation({ questions, questionCourante, onClick }) {
  const handleClick = (index) => {
    onClick(index);
  };

  return (
    <div className='Numerotation'>
      {questions.map((question, index) => (
        <div
          key={index}
          className={`Numero ${index === questionCourante ? 'selected' : ''} ${question.repondu !== null ? (question.repondu ? 'correct' : 'incorrect') : ''}`}
          onClick={() => handleClick(index)}
        >
          <p>{index + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default Numerotation;
