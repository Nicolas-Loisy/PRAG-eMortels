import '../css/Content.css';
import Header from './Header';
import Footer from './Footer';
import Ariane from './Ariane';
import { useParams, useLocation } from "react-router-dom";

function Content({ children }) {
  const params = useParams();
  const location = useLocation();
  const url = location.pathname;

  if (url.includes("parcours-precis")) {
    params.parcours = "parcours-precis";
  }

  var pages = initPages();

  function initPages() {
    //Crée les différents objets {url, nom} selon l'URL

    var array = [];
    var baseURL = "";
    const arrayParams = Object.entries(params);

    // Trouver l'index de l'attribut que vous ajoutez
    const addedAttributeIndex = arrayParams.findIndex(([key]) => key === 'parcours');

    // Créer un tableau temporaire avec les clés dans l'ordre souhaité
    const orderedParams = [
      ...arrayParams.slice(addedAttributeIndex, addedAttributeIndex + 1),
      ...arrayParams.slice(0, addedAttributeIndex),
      ...arrayParams.slice(addedAttributeIndex + 1)
    ];

    for (let i = 0; i < orderedParams.length; i++) {
      var [key, value] = orderedParams[i];

      //Cas particulier où la clef n'est pas affichée
      if (key === "parcours") {
        baseURL += "/" + value;
      } else {
        baseURL += "/" + key + "/" + value;
      }

      //Cas particulier où la clef est affichée avec le nom
      if (key === "niveau" || key === "exercice") {
        value = key + " " + value;
      }
      if (i === orderedParams.length - 1) {
        array.push({ nom: value });
      } else {
        array.push({ nom: value, url: baseURL });
      }
    }

    return array;
  }


  return (
    <div className="Content">
      <Header />
      {children}
      {pages.length > 2 &&
        <Ariane pages={pages} />
      }
      <Footer />
    </div>
  );
}

export default Content;

