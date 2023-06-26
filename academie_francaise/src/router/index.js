import { createBrowserRouter } from "react-router-dom";
import Exercice from "../pages/Exercice";
import data from "../ressources/Exemple.json"

export const router = createBrowserRouter([
  {path: "/", element: <Exercice exercice={data.Exercices[2]} />},
  {path: "/Exercice", element: <Exercice exercice={data.Exercices[2]} />}
]);