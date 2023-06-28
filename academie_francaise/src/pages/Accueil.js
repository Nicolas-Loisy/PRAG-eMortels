import BlocChoix from "../components/BlocChoix";
import Content from "../components/Content";

function Accueil({ }) {
  return (
    <Content>

      <h1>L'ACADEMIE DE RENART</h1>
      <div>
        <BlocChoix
          titre="Rechercher un thème"
          url="/categorie"
          description="Je souhaite m'entrainer sur une thèmatique précise."
        />
        
        <BlocChoix
          titre="Questions aléatoires"
          url="/choix-niveau"
          description="Je souhaite m'entrainer en répondant à des questions aléatoires."
        />
      </div>

    </Content>
  );
}

export default Accueil; 