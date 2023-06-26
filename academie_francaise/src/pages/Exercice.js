import EfQuestion from "../components/EfQuestions";
import QcmQuestion from "../components/QcmQuestion";
import TrouQuestion from "../components/TrouQuestion";
import Header from "../components/Header";
import Body from "../components/Body"

function Exercice({ exercice }) {
  return (
    <Body>
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
                case "EF":
                  return (
                    <EfQuestion
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
    </Body>
  );
}

export default Exercice;
