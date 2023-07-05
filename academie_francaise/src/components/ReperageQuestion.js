import '../css/ReperageQuestion.css';

function ReperageQuestion({ enonce, reponse, repondu, onUserResponse, reponseUtilisateur }) {
  const mots = separerMots(enonce);

  // Vérifie s'il s'agit de la bonne réponse ou non
  function verifMot(mot) {
    if (reponse.toLowerCase().includes(mot.toLowerCase())) {
        return true;
    }
    return false;
  }

  function separerMots(phrase) {
    var phraseAvecEspaces = phrase.replace(/'/g, "' ");
    var mots = phraseAvecEspaces.split(' ');
    return mots;
  }

  // Définition du nom de la classe (pour le style du texte)
  function defineNomClasse(mot, repondu, isCorrection) {
    if (isCorrection) {
      if (mot.toLowerCase().includes(reponse.toLowerCase())) {
        return 'correct correction';
      } else {
        return 'text';
      }
    } else if (repondu !== null) {
      if (repondu && mot.toLowerCase().includes(reponseUtilisateur.toLowerCase())) {
        return 'correct';
      } else if (!repondu && mot.toLowerCase() === reponseUtilisateur.toLowerCase()) {
        return 'incorrect';
      } else return 'text';
    }
    return 'enonce';
    
  }

  function affichageEnonce(mot, index, repondu, isCorrection) {
    return(
      <span
        className={defineNomClasse(mot, repondu, isCorrection)}
        key={index} 
        onClick={() => repondu === null ? onUserResponse(verifMot(mot, reponse), mot) : null} 
        dangerouslySetInnerHTML={{ __html: mot + ' '}}
      />
    );
  }

  function affichageCorrection() {
    return(
        <div className='ReperageQuestion correction'>
            {mots.map((mot, index) => {
            return affichageEnonce(mot, index, repondu, true);
            })}
        </div>
    );
  }

  // Affichage HTML (ternaires à refaire)
  return (
    <div className='ReperageQuestion'>
      {mots.map((mot, index) => (
        affichageEnonce(mot, index, repondu)
      ))}
    </div>
  );
}

export default ReperageQuestion;
