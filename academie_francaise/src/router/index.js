import { createBrowserRouter } from "react-router-dom";
import Accueil from "../pages/Accueil";
import ParcoursPrecis from "../pages/ChoixTheme";
import ChoixExercice from "../pages/ChoixExercice";
import ExercicePrecis from "../pages/ExercicePrecis";
import NotFound from "../pages/NotFound";
import ChoixNiveau from "../pages/ChoixNiveau";
import ExerciceAleatoire from "../pages/ExerciceAleatoire";

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
    element: <ExercicePrecis />
  },
  {
    path: "/parcours-aleatoire",
    element: <ChoixNiveau />
  },
  {
    path: "/parcours-aleatoire/niveau/:niveau",
    element: <ExerciceAleatoire />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
