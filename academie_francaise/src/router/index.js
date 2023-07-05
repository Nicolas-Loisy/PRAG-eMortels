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
    path: "/catalogue",
    element: <ParcoursPrecis />
  },
  {
    path: "/catalogue/categorie/:categorie",
    element: <ParcoursPrecis />
  },
  {
    path: "/catalogue/categorie/:categorie/sousCategorie/:sousCategorie",
    element: <ChoixExercice />
  },
  {
    path: "/catalogue/categorie/:categorie/sousCategorie/:sousCategorie/niveau/:niveau",
    element: <ChoixExercice />
  },
  {
    path: "/catalogue/categorie/:categorie/sousCategorie/:sousCategorie/niveau/:niveau/exercice/:exercice",
    element: <ExercicePrecis />
  },
  {
    path: "/entrainement",
    element: <ChoixNiveau />
  },
  {
    path: "/entrainement/niveau/:niveau",
    element: <ExerciceAleatoire />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
