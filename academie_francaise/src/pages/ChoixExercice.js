import { useParams } from "react-router";
import Content from "../components/Content";
import ConteneurTag from "../components/ConteneurTag"

import Tag from "../components/Tag";
import "../css/ChoixExercice.css";
import { getSousCategorieById } from "../utils/Api";

function ChoixExercice() {
  const params = useParams();
  const sousCategorie = getSousCategorieById(params.categorie, params.sousCategorie);

  const handleClick = (url) => {
    window.location.href = url;
  };

  function formatUniqueValues(uniqueValues) {
    var str = ` - ${uniqueValues.join(', ')}`;
    str = str.replace("phraseTrous", "Texte à trous");
    return str;
  }

  function getTags(exercices) {
    return Object.values(exercices).map((exercice, index) => {
      const typesUnique = [...new Set(Object.values(exercice.questions).map(obj => obj.type))];
      const typesAffichage = formatUniqueValues(typesUnique);
      return (
        <Tag className="Cliquable" key={index}>
          <p onClick={handleClick}>
            {
              exercice.intitule + typesAffichage
            }
          </p>
        </Tag>
      );
    });
  }

  return (
    <Content>
      <h1>Exercices</h1>
      <div className="ChoixExercice">
        <div className="ExercicesConteneur">
          {
            Object.values(sousCategorie.niveaux).map((niveau, index) => {
              return <ConteneurTag nom={niveau.nom} tags={getTags(niveau.exercices)} key={index} />;
            })
          }
        </div>
      </div>
    </Content>
  );
}

export default ChoixExercice; 