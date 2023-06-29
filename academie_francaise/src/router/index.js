import { createBrowserRouter } from "react-router-dom";
import Exercice from "../pages/Exercice";
//import data from "../ressources/Exemple.json"
import Accueil from "../pages/Accueil";
import data from "../ressources/nv1-2.json"


export const router = createBrowserRouter([
  { path: "/", element: <Accueil /> },
  //{ path: "/Exercice", element: <Exercice exercice={data.Exercices[6]} /> }
  { path: "/Exercice", element: <Exercice exercice={data.categories[1].sousCategories[0].niveaux[1].exercices[3]} categorie={data.categories[1]} /> }
]);