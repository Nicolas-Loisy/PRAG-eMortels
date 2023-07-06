import '../css/ReperageQuestion.css';

function ReperageQuestion({ enonce, reponse, repondu, onUserResponse, reponseUtilisateur }) {
  const mots = separerMots(enonce);

  // Compte le nombre de fois qu'un mot apparait dans la phrase en fonction de sa position dans la liste
  function nbIterationMot(index, mot) {
    var nbIteration = 0;
    for (var i = 0; i <= index; i++) {
      if (mots[i].toLowerCase().includes(mot.toLowerCase())) { 
        nbIteration++;
      }
    }
    return nbIteration;
  }

  // Vérifie s'il s'agit de la bonne réponse ou non
  function verifMot(mot, index) {
    if (reponse.toLowerCase().includes(mot.toLowerCase()) && nbIterationMot(index, mot) <= 1) {
        return true;
    }
    return false;
  }

  function separerMots(phrase) {
    var espaceApresApostrophes = phrase.replace(/'/g, "' ");
    var mots = espaceApresApostrophes.split(' ');
    return mots;
  }

  // Définition du nom de la classe (pour le style du texte)
  function defineNomClasse(mot, repondu, index, isCorrection) {
    if (isCorrection) {
      if (reponse.toLowerCase().includes(mot.toLowerCase()) && nbIterationMot(index, mot) <= 1) {
        return 'correct correction';
      } else {
        return 'text';
      }
    } else if (repondu !== null) {
      if ((repondu && mot.toLowerCase().includes(reponseUtilisateur.toLowerCase())) && nbIterationMot(index, mot) <= 1) {
        return 'correct';
      } else if (!repondu && mot.toLowerCase().includes(reponseUtilisateur.toLowerCase())) {
        if (nbIterationMot(index, mot) > 1 || nbIterationMot(mots.length - 1, mot) === 1) return 'incorrect';
        return 'text';
      } else return 'text';
    }
    return 'enonce';
    
  }

  function affichageEnonce(mot, index, repondu, isCorrection) {
    return(
      <span
        className={defineNomClasse(mot, repondu, index, isCorrection)}
        key={index} 
        onClick={() => repondu === null ? onUserResponse(verifMot(mot, index), mot) : null}
        dangerouslySetInnerHTML={{ __html: mot.includes("'") ? mot : mot + ' '}}
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
      {repondu !== null && !repondu ? affichageCorrection() : null}
    </div>
  );
}

export default ReperageQuestion;
