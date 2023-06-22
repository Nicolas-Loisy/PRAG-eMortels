import Qcm_question from "./Qcm_question";

function Exercice({ exercice }) {
  return (
    <div>
      <p>{exercice.niveau}</p>
      <p>{exercice.intitule}</p>
      <h2>{exercice.titre}</h2>
      {
        exercice.questions.map((question, index) =>
          question.type === "QCM" ? (
            <Qcm_question
              key={index}
              ennonce={question.ennonce}
              reponses={question.reponses}
            />
          ) : null
        )
      }
      <button onClick={() => console.log(exercice.explication)}>Aide</button>
    </div>
  );
}

export default Exercice;
