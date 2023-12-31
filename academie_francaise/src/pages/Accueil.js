import Content from "../components/Content";
import logo from "../ressources/Images/Logo.png";
import Bouton from "../components/Bouton";
import Bulle from "../components/Bulle";

import "../css/Accueil.css";
import feuilleOlivier from "../ressources/Images/feuille-mini.png";


function Accueil() {
  return (
    <Content>
      <div className="Accueil">
        <div className="Titre">
          <img src={logo} alt="Logo" />
          <h1>L'ACADÉMIE DE RENART</h1>
        </div>

        <div className="ColContainer">

          <div className="Col1">
            <div className="Mascotte" />
          </div>

          <div className="Col2">
            <Bulle>
              <h2>Bienvenue dans mon académie !</h2>
              <p>  Ici, vous trouverez plusieurs types d’exercices sur différents thèmes pour voir ou revoir quelques règles de la langue française.<br />
                Je suis Maître Renart et je pourrai vous aider à chaque question pour vous rappeler la règle que vous devez appliquer, il suffit de cliquer sur moi pour me demander !<br /><br />
                Ici, tu peux parcourir le catalogue à la recherche d'un thème en particulier ou tu peux t'entrainer sur des exercices de ma sélection.
              </p>
            </Bulle>
            <div className="Navigation">
              <img src={feuilleOlivier} alt="FeuilleOlivier" />
              <Bouton
                nom="Défi du jour"
                url="/DefiDuJour"
                className="Primaire"
              />
              <Bouton
                nom="Catalogue"
                url="/catalogue"
                className="Primaire"
              />
              <Bouton
                nom="Entraînement"
                url="/entrainement"
                className="Primaire"
              />
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default Accueil; 