import { useState, useEffect } from 'react';

import Content from "../components/Content";
import ConteneurTag from "../components/ConteneurTag";
import Tag from "../components/Tag";

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

  // Fonction pour gérer le clic sur un tag et rediriger l'utilisateur vers une autre page
  const handleClick = (url) => {
    window.location.href = url;
  };

  // Fonction pour rendre les tags à partir des sous-catégories d'une catégorie
  const renderTags = (categorie) => {
    return categorie.sousCategories.map((sousCategorie, index) => (
      <Tag className="Cliquable" key={index}>
        <p onClick={() => handleClick("/catalogue/categorie/" + categorie._id + "/sousCategorie/" + sousCategorie._id)}>{sousCategorie.nom}</p>
      </Tag>
    ));
  };

  return (
    <Content>
      <h1>Catégories</h1>
      {categories.length > 0 && (
        <div className="ChoixTheme">
          <div className="CategorieContainer">
            {categories.map((categorie, index) => (
              <ConteneurTag
                nom={categorie.nom}
                tags={renderTags(categorie)}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </Content>
  );
}

export default ChoixTheme;
