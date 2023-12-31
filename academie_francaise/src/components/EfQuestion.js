import '../css/EfQuestion.css';

function EfQuestion({ enonce, reponse, motErreur, repondu, onUserResponse, reponseUtilisateur }) {
  const mots = enonce.split(' ');
  const msgPasErreur = "Pas de faute";

  // Vérifie s'il s'agit de la bonne réponse ou non
  function verifMot(mot, motErreur) {
    if (reponse.toLowerCase().includes(msgPasErreur.toLowerCase())) {
      if (reponse.toLowerCase().includes(mot.toLowerCase())) {
        return true;
      }
    }
    else if (!reponse.toLowerCase().includes(msgPasErreur.toLowerCase())) {
      if (mot.toLowerCase().includes(motErreur.toLowerCase())) {
        return true;
      }
    }
    return false;
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
    return (
      <span
        className={defineNomClasse(mot, repondu, isCorrection)}
        key={index}
        onClick={() => repondu === null ? onUserResponse(verifMot(mot, motErreur), mot) : null}
        dangerouslySetInnerHTML={{ __html: mot + ' ' }}
      />
    );
  }

  function affichageCorrection() {
    var motCorrige;
    if (reponse.toLowerCase().includes(msgPasErreur.toLowerCase()))
      return (
        <p className='EfQuestion correction correct'>{msgPasErreur}</p>
      );
    else
      return (
        <div className='EfQuestion correction'>
          {mots.map((mot, index) => {
            mot.toLowerCase().includes(motErreur.toLowerCase()) ? motCorrige = reponse : motCorrige = mot;
            return affichageEnonce(motCorrige, index, repondu, true);
          })}
        </div>
      );
  }

  // Affichage HTML (ternaires à refaire)
  return (
    <div className='EfQuestion'>
      <div className='EfQuestion lenonce'>
        {mots.map((mot, index) => (
          affichageEnonce(mot, index, repondu)
        ))}
      </div>
      {repondu !== null && reponseUtilisateur.toLowerCase().includes(msgPasErreur.toLowerCase()) ? <p className={defineNomClasse(msgPasErreur, repondu, false)}>{msgPasErreur}</p> : null}
      {repondu !== null && motErreur.toLowerCase().includes(msgPasErreur.toLowerCase()) === false ? repondu && reponseUtilisateur.toLowerCase().includes(msgPasErreur.toLowerCase()) ? null : affichageCorrection() : null}
      {repondu === null ? <button className='button' onClick={() => onUserResponse(verifMot(msgPasErreur, motErreur), msgPasErreur)}>{msgPasErreur}</button> : null}
    </div>
  );
}

export default EfQuestion;
