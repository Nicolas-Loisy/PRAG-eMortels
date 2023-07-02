import BlocChoix from "../components/BlocChoix";
import Content from "../components/Content";
import "../css/Accueil.css";

function Accueil() {
  return (
    <Content>
      <h1>L'ACADEMIE DE RENART</h1>
      <div className="optionContainer">
        <BlocChoix
          titre="Rechercher un thème"
          url="/parcours-precis"
          description="Je souhaite m'entrainer sur une thèmatique précise."
        />

        <BlocChoix
          titre="Questions aléatoires"
          url="/parcours-aleatoire"
          description="Je souhaite m'entrainer en répondant à des questions aléatoires."
        />
      </div>

    </Content>
  );
}

export default Accueil; 