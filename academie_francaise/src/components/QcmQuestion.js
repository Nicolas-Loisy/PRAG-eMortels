function QcmQuestion({ ennonce, reponses }) {
  return (
    <div>
      <h3>{ennonce}</h3>
      <ul>
        {reponses.map((reponse, index) => (
          <li key={index} onClick={() => console.log(reponse.correcte) } style={{ cursor: 'pointer' }}>
            {reponse.reponse}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QcmQuestion;
