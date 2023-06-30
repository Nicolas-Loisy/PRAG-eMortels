import '../css/QcmQuestion.css';

function QcmQuestion({ ennonce, reponses, repondu, onUserResponse }) {
  const handleClick = (indexReponse) => {
    if (repondu === null) {
      onUserResponse(reponses[indexReponse].correcte, reponses[indexReponse].reponse);
    }
  };

  return (
    <div className='QcmQuestion'>
      <h3>{ennonce}</h3>
      <ul>
        {reponses.map((reponse, indexReponse) => (
          <li
            key={indexReponse}
            onClick={() => handleClick(indexReponse)}
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