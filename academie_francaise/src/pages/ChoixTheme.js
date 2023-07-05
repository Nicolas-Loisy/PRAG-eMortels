import { useState, useEffect } from 'react';

import Content from "../components/Content";
import ConteneurTag from "../components/ConteneurTag";
import Tag from "../components/Tag";

import { api } from "../api/Api";
import "../css/ChoixTheme.css";

function ChoixTheme() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoriesData = await api.getCategories();
      setCategories(categoriesData.categories.sort((a, b) => a.nom.localeCompare(b.nom)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (url) => {
    window.location.href = url;
  };

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
