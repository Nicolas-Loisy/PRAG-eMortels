import '../css/Content.css';
import Footer from './Footer';
import Ariane from './Ariane';
import { useParams, useLocation } from "react-router-dom";

function Content({ children }) {
  const params = useParams();
  const location = useLocation();
  const url = location.pathname;

  var pages = initPages();

  function initPages() {
    //Crée les différents objets {url, nom} selon l'URL

    var array = [];
    var baseURL = "/";

    if (url.includes("catalogue")) {
      baseURL += "catalogue";
    }

    const arrayParams = Object.entries(params);

    for (let i = 0; i < arrayParams.length; i++) {
      var [key, value] = arrayParams[i];

      //Cas particulier où la clef n'est pas affichée
      baseURL += "/" + key + "/" + value;
    

      //Cas particulier où la clef est affichée avec le nom
      if (key === "niveau" || key === "exercice") {
        value = key + " " + value;
      }
      if (i === arrayParams.length - 1) {
        array.push({ nom: value });
      } else {
        array.push({ nom: value, url: baseURL });
      }
    }

    return array;
  }


  return (
    <div className="Content">
      <div className='Page'>
        {children}
      </div>
      {pages.length > 1 &&
        <Ariane pages={pages} />
      }
      <Footer />
    </div>
  );
}

export default Content;

