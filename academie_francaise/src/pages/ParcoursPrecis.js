import BlocChoix from "../components/BlocChoix";
import Content from "../components/Content";
import { getListeCategories } from "../utils/Api";

import "../css/Accueil.css";

function ParcoursPrecis() {
  console.log(getListeCategories());
  return (
    <Content>
    </Content>
  );
}

export default ParcoursPrecis; 