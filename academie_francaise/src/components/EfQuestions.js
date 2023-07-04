function EfQuestion({ ennonce, reponse, motErreur }) {
  const mots = ennonce.split(' '); // Divise la chaîne de caractères "ennonce" en mots individuels
  const msgPasErreur = "Pas de faute"; // Message à afficher pour le bouton "Pas de faute"

  return (
    <div>
      {mots.map((mot, index) => (
        <span key={index} onClick={() => verifMot(mot, motErreur) ? console.log("Bonne réponse") : console.log("Mauvaise réponse")}>
          {mot}{' '}
        </span>
      ))}
      <button onClick={() => verifMot(msgPasErreur, motErreur) ? console.log("Bonne réponse") : console.log("Mauvaise réponse")}>{msgPasErreur}</button>
    </div>
  );
}

function verifMot(mot, motErreur) {
  console.log(`Mot cliqué: ${mot}`);
  if (motErreur !== "Pas de faute") {
    if (mot.includes(motErreur)) {
      return true;
    }
  } else {
    if (mot === motErreur) {
      return true;
    }
  }
  return false;
}



export default EfQuestion;
