import { createBrowserRouter } from "react-router-dom";
import Exercice from "../pages/Exercice";
import data from "../ressources/Exemple.json"
import Accueil from "../pages/Accueil";

export const router = createBrowserRouter([
  {path: "/", element: <Accueil />},
  {path: "/Exercice", element: <Exercice exercice={data.Exercices[6]} />}
]);