import '../css/QcmQuestion.css';

function QcmQuestion({ ennonce, reponses, repondu, onUserResponse }) {
  const handleClick = (reponse) => {
    if (repondu === null) {
      onUserResponse(reponse.correcte, reponse.reponse);
    }
  };

  return (
    <div className='QcmQuestion'>
      <h3>{ennonce}</h3>
      <ul>
        {Object.values(reponses).map((reponse, indexReponse) => (
          <li
            key={indexReponse}
            onClick={() => handleClick(reponse)}
            className={repondu !== null ? (reponse.correcte ? 'correct' : 'incorrect') : ''}
          >
            {reponse.reponse}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QcmQuestion;
