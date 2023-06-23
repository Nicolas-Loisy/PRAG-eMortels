import EF_question from "./EF_questions";
import Qcm_question from "./QCM_question";
import Trou_question from "./Trou_question";

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
                <Qcm_question
                  key={index}
                  ennonce={question.ennonce}
                  reponses={question.reponses}
                />
              );
            case "phraseTrous":
              return (
                <Trou_question
                  key={index}
                  ennonce={question.ennonce}
                  reponse={question.reponse}
                />
              );
              case "EF":
                return (
                  <EF_question
                    key={index}
                    ennonce={question.ennonce}
                    reponse={question.reponse}
                    motErreur={question.motErreur}
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
