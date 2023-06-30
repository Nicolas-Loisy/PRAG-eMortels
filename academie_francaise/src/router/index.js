import { createBrowserRouter } from "react-router-dom";
import Accueil from "../pages/Accueil";
import ParcoursPrecis from "../pages/ParcoursPrecis";
import ChoixExercice from "../pages/ChoixExercice";
import Exercice from "../pages/Exercice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />
  },
  {
    path: "/parcours-precis",
    element: <ParcoursPrecis />
  },
  {
    path: "/parcours-precis/:categorieId",
    element: <ParcoursPrecis />
  },
  {
    path: "/parcours-precis/:categorieId/:sousCategorieId",
    element: <ChoixExercice />
  },
  {
    path: "/parcours-precis/:categorieId/:sousCategorieId/:niveauId",
    element: <ChoixExercice />
  },
  {
    path: "/parcours-precis/:categorieId/:sousCategorieId/:niveauId/:exerciceId",
    element: <Exercice />
  },
]);
