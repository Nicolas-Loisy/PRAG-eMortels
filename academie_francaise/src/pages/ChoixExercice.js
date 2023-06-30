import { useParams } from "react-router-dom";

import BlocChoix from "../components/BlocChoix";
import Content from "../components/Content";

import "../css/Accueil.css";
import { getSousCategorieById } from "../utils/Api";

function ChoixExercice() {
  const { categorieId, sousCategorieId } = useParams();
  const sousCategorie = getSousCategorieById(categorieId, sousCategorieId);
  
  return (
    <Content>
    </Content>
  );
}

export default ChoixExercice; 