import '../css/QcmQuestion.css';

function QcmQuestion({ ennonce, reponses }) {
  return (
    <div className='QcmQuestion'>
      <h3>{ennonce}</h3>
      <ul>
        {reponses.map((reponse, index) => (
          <li key={index}>
            {reponse.reponse}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QcmQuestion;
