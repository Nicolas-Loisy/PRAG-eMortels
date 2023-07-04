import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router";

import Content from "../components/Content";
import ConteneurTag from "../components/ConteneurTag"
import Tag from "../components/Tag";

import { api } from "../api/Api";
import "../css/ChoixExercice.css";

function ChoixExercice() {
  const params = useParams(); // Extraction des paramètres de l'URL
  const [niveaux, setNiveaux] = useState([]);

  // Définition de la fonction fetchData en utilisant useCallback
  const fetchData = useCallback(async () => {
    try {
      const niveauxData = await api.getNiveauxTypesExo(params.categorie, params.sousCategorie); // Appel de l'API pour récupérer les données de niveaux
      setNiveaux(niveauxData); // Mise à jour de la variable d'état niveaux avec les données récupérées
    } catch (error) {
      console.error(error);
    }
  }, [params.categorie, params.sousCategorie]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fonction pour gérer le clic sur un tag et rediriger l'utilisateur vers une autre page
  const handleClick = (url) => {
    window.location.href = url;
  };

  // Fonction pour formater les valeurs uniques et les afficher dans les tags
  function formatUniqueValues(uniqueValues) {
    var str = ` - ${uniqueValues.join(', ')}`;
    str = str.replace("phraseTrous", "Texte à trous");
    str = str.replace("EF", "Enoncé fautif");
    return str;
  }

  // Fonction pour générer les tags à partir des données et des paramètres
  function getTags(niveau) {
    return niveau.exercices.map((exercice, index) => {
      const typesUniques = [...new Set(exercice.questions.map(obj => obj.type))];
      const typesAffichage = formatUniqueValues(typesUniques);
      return (
        <Tag className="Cliquable" key={index}>
          <p onClick={() => handleClick("/parcours-precis/categorie/" + params.categorie + "/sousCategorie/" + params.sousCategorie + "/niveau/" + niveau._id + "/exercice/" + exercice._id)}>
            {
              "Exercice " + exercice._id + typesAffichage
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
            niveaux.map((niveau, index) => {
              return <ConteneurTag nom={niveau.nom} tags={getTags(niveau)} key={index} />;
            })
          }
        </div>
      </div>
    </Content>
  );
}

export default ChoixExercice;
