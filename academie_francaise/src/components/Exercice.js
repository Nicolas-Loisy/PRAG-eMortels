import QcmQuestion from "./QcmQuestion";
import TrouQuestion from "./TrouQuestion";

function Exercice({ exercice }) {
  return (
    <div>
      <p>{exercice.niveau}</p>
      <p>{exercice.intitule}</p>
      <h2>{exercice.titre}</h2>
      {
        exercice.questions.map((question, index) => {
          switch (question.type) {
            case "QCM":
              return (
                <QcmQuestion
                  key={index}
                  ennonce={question.ennonce}
                  reponses={question.reponses}
                />
              );
            case "phraseTrous":
              return (
                <TrouQuestion
                  key={index}
                  ennonce={question.ennonce}
                  reponse={question.reponse}
                />
              );
            default:
              return null;
          }
        })
      }
      <button onClick={() => console.log(exercice.explication)}>Aide</button>
    </div>
  );
}


export default Exercice;
