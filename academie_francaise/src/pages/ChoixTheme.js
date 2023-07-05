import { useState, useEffect } from 'react';

import Content from "../components/Content";
import Bouton from '../components/Bouton';

import { api } from "../api/Api";
import "../css/ChoixTheme.css";

function ChoixTheme() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData(); // Appel de la fonction fetchData après le rendu initial du composant
  }, []);

  // Fonction asynchrone pour récupérer les données des catégories depuis l'API
  const fetchData = async () => {
    try {
      const categoriesData = await api.getCategories();
      setCategories(categoriesData.categories.sort((a, b) => a.nom.localeCompare(b.nom))); // Mise à jour de la variable d'état categories avec les catégories triées par nom
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Content>
      {categories.length > 0 && (
        <div className="ChoixTheme">
          <h1>Catégories</h1>
          {/* Pour chaque catégorie */}
          {categories.map((categorie, index) => (
            <div className="Categorie" key={index}>
              <h2>{categorie.nom}</h2>

              {/* Pour chaque sous-catégorie */}
              <div className='Conteneur_SousCategorie'>
                {categorie.sousCategories.map((sousCategorie, subIndex) => (
                  <Bouton
                    key={subIndex}
                    className={"Primaire Big"}
                    nom={sousCategorie.nom}
                    url={"/catalogue/categorie/" + categorie._id + "/sousCategorie/" + sousCategorie._id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Content>
  );
}

export default ChoixTheme;
