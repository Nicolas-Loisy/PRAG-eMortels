import { createBrowserRouter } from "react-router-dom";
import Accueil from "../pages/Accueil";
import ParcoursPrecis from "../pages/ChoixTheme";
import ChoixExercice from "../pages/ChoixExercice";
import Exercice from "../pages/Exercice";
import NotFound from "../pages/NotFound";

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
    path: "/parcours-precis/categorie/:categorie",
    element: <ParcoursPrecis />
  },
  {
    path: "/parcours-precis/categorie/:categorie/sousCategorie/:sousCategorie",
    element: <ChoixExercice />
  },
  {
    path: "/parcours-precis/categorie/:categorie/sousCategorie/:sousCategorie/niveau/:niveau",
    element: <ChoixExercice />
  },
  {
    path: "/parcours-precis/categorie/:categorie/sousCategorie/:sousCategorie/niveau/:niveau/exercice/:exercice",
    element: <Exercice />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
