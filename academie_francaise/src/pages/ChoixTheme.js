import Content from "../components/Content";
import ConteneurTag from "../components/ConteneurTag"
import Tag from "../components/Tag";
import { getListeCategories } from "../utils/Api";

import "../css/ChoixTheme.css";

function ChoixTheme() {
  const categories = getListeCategories();

  const handleClick = (url) => {
    window.location.href = url;
  };

  function getTags(categorie) {
    return Object.values(categorie.sousCategories).map((sousCategorie, index) => {
      return (
        <Tag className="Cliquable" key={index}>
          <p onClick={handleClick}>{sousCategorie}</p>
        </Tag>
      );
    });
  }
  
  return (
    <Content>
      <h1>Categories</h1>
      <div className="ChoixTheme">
        <div className="CategorieContainer">
          {
            Object.values(categories).map((categorie, index) => {
              return <ConteneurTag nom={categorie.nom} tags={getTags(categorie)} key={index} />;
            })
          }
        </div>
      </div>
    </Content>
  );
}

export default ChoixTheme; 