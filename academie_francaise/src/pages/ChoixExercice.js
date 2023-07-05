import { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router";

import Content from "../components/Content";
import Bouton from '../components/Bouton';

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

  // Fonction pour formater les valeurs uniques et les afficher dans les tags
  function getUniquesTypes(exercice) {
    const typesUniques = [...new Set(exercice.questions.map(obj => obj.type))];
    var str = `${typesUniques.join(', ')}`;
    str = str.replace("phraseTrous", "Texte à trous");
    str = str.replace("EF", "Enoncé fautif");
    return str;
  }

  return (
    <Content>
      <div className="ChoixExercice">
        <h1>EXERCICES</h1>
        <div className="Niveaux">
          {
            niveaux.map((niveau, index) => {
              return (
              <div className='Niveau' key={index}>
                <h2>{niveau.nom}</h2>
                <div className='Exercices'>
                    {
                      niveau.exercices.map((exercice, subIndex) => {
                        return (
                          <Bouton
                            key={subIndex}
                            nom={"<b>Exercice " + exercice._id + "</b><br>" + getUniquesTypes(exercice)}
                            url={"/catalogue/categorie/" + params.categorie + "/sousCategorie/" + params.sousCategorie + "/niveau/" + niveau._id + "/exercice/" + exercice._id}
                            className={"Primaire Big"}
                          />
                        )
                      })
                    }
                </div>
              </div>
            )})
          }
        </div>
      </div>
    </Content>
  );
}

export default ChoixExercice;
