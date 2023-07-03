import '../css/EfQuestion.css';

function EfQuestion({ enonce, reponse, motErreur }) {
  const mots = enonce.split(' ');
  const msgPasErreur = "Pas de faute";

  return (
    <div className='EfQuestion'>
      {mots.map((mot, index) => (
        <span className='ennonce' key={index} onClick={() => verifMot(mot, motErreur) ? console.log("Bonne réponse") : console.log("Mauvaise réponse")}>
          {mot}{' '}
        </span>
      ))}
      <button className='button' onClick={() => verifMot(msgPasErreur, motErreur) ? console.log("Bonne réponse") : console.log("Mauvaise réponse")}>{msgPasErreur}</button>
    </div>
  );
}

function verifMot(mot, motErreur) {
  console.log(`Mot cliqué: '${mot}'`);
  console.log(`Mot erreur: '${motErreur}'`);
  if (motErreur.toLowerCase() !== "Pas de faute".toLowerCase()) {
    if (mot.toLowerCase().substring(0, mot.length-1).includes(motErreur.toLowerCase()) || mot.toLowerCase() === motErreur.toLowerCase()) {
      return true;
    }
  } else {
    if (mot.toLowerCase() === motErreur.toLowerCase()) {
      return true;
    }
  }
  return false;
}



export default EfQuestion;
