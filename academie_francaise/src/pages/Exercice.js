import { useState } from 'react';

import QcmQuestion from "../components/QcmQuestion";
import Body from "../components/Content"
import Tag from "../components/Tag";
import Ariane from "../components/Ariane";
import NumQuestion from "../components/NumQuestion";
import '../css/Exercice.css';

function Exercice({ exercice }) {
  var questions = [];
  const [questionCourante, setQuestionCourante] = useState(0);

  const handleClickQuestion = (numQuestion) => {
    setQuestionCourante(numQuestion);
  };

  const pages = [
    { nom: exercice.categorie, url: 'https://www.example.com/page1' },
    { nom: exercice.niveau, url: 'https://www.example.com/page2' },
    { nom: exercice.titre}
  ];
  
  // Récupération des questions de l'exercice
  exercice.questions.forEach((question, index) => {
    switch (question.type) {
      case "QCM":
        questions.push(
          <QcmQuestion
            key={index}
            ennonce={question.question}
            reponses={question.reponse}
          />
        );
        break;
      default:
        console.log("Type de question non pris en charge: " + question.type);
        break;
    }
  });

  return (
    <Body>
      <div className="Exercice">
        
        <div className="TagList">
          <div className="col_1">
            <Tag Nom={exercice.categorie} />
            <Tag Nom={exercice.titre} />
          </div>

          <div className="col_2">
            <Tag Nom={exercice.niveau} />
            <Tag Nom={exercice.id} />
          </div>
        </div>

        <p className='intitule'>{exercice.intitule}</p>

        <div>
          {questions[questionCourante]}
        </div>

        <div className='pagination'>
          {questions.map((question, i) => (
            <NumQuestion
              key={i}
              Num={i}
              isSelected={i === questionCourante}
              onClick={() => handleClickQuestion(i)}
            />
          ))}
        </div>

        <button onClick={() => console.log(exercice.explication)}>Aide</button>
        
        <Ariane pages={pages}/>

      </div>
    </Body>
  );
}

export default Exercice;
