import Content from "../components/Content";
import ConteneurTag from "../components/ConteneurTag"
import { getListeCategories } from "../utils/Api";

import "../css/ChoixTheme.css";

function ChoixTheme() {
  const categories = getListeCategories();

  return (
    <Content>
      <h1>Categories</h1>
      <div className="ParcoursPrecis">
        <div className="CategorieContainer">
          {
            Object.values(categories).map((categorie, index) => {
              return <ConteneurTag categorie={categorie} key={index} />;
            })
          }
        </div>
      </div>
    </Content>
  );
}

export default ChoixTheme; 