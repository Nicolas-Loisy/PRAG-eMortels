function QCM_question({ question, options, regle, reponse }) {
  return (
    <div>
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index} onClick={() => console.log(option === reponse) }>
            {option}
          </li>
        ))}
      </ul>
      <button onClick={() => console.log(regle)}>Aide</button>
    </div>
  );
}
export default QCM_question;
