
import { useParams } from "react-router";
import BlocChoix from "../components/BlocChoix";
import Content from "../components/Content";

import "../css/Accueil.css";
import { getSousCategorieById } from "../utils/Api";

function ChoixExercice() {
  const params = useParams();
  const sousCategorie = getSousCategorieById(params.categorie, params.sousCategorie);
  console.log(sousCategorie);
  
  return (
    <Content>
      
    </Content>
  );
}

export default ChoixExercice; 