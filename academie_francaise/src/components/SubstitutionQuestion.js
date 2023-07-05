import React, { useState, useEffect } from 'react';
import '../css/SubstitutionQuestion.css';

function SubstitutionQuestion({ enonce, reponse, repondu, onUserResponse, reponseUtilisateur }) {
	const [inputValue, setInputValue] = useState('');
	const [corrige, setCorrige] = useState('');

	useEffect(() => {
		if (repondu === true) {
			setCorrige(
				<p dangerouslySetInnerHTML={{ __html: `<span class="reponseUtilisateur correct">${reponseUtilisateur}</span>` }} />
			);
		} else {
			setCorrige(
				<>
					<p className='rep_incorrecte' dangerouslySetInnerHTML={{ __html: `<span class="reponseUtilisateur incorrect">${reponseUtilisateur}</span>` }} />
					<p className='correction' dangerouslySetInnerHTML={{ __html: `<span class="correct">${reponse}</span>` }} />
				</>
			);
		}
	}, [reponse, reponseUtilisateur, enonce, repondu]);

	// Actions effectuées en cliquant sur "Valider"
	function handleClick() {
		if (repondu === null) {
			if (inputValue === reponse) {
				onUserResponse(true, inputValue);
				setCorrige(
					<p dangerouslySetInnerHTML={{ __html: `<span class="reponseUtilisateur correct">${reponseUtilisateur}</span>` }} />
				);
			} else {
				onUserResponse(false, inputValue);
				setCorrige(
					<>
						<p dangerouslySetInnerHTML={{ __html: `<span class="reponseUtilisateur incorrect">${inputValue}</span>` }} />
						<p className='correction' dangerouslySetInnerHTML={{ __html: `<span class="correct">${reponse}</span>` }} />
					</>
				);
			}
			setInputValue(''); // Réinitialisation de la valeur de l'input
		}
	}

	return (
		<div className='SubstitutionQuestion'>
			<div className='enonce'>
				<p dangerouslySetInnerHTML={{ __html: enonce  }} /> {/* Affiche le contenu de "enonce" en tant que balise HTML */}

			</div>
			{repondu === null ? (
				<><input type="text" placeholder="Entrez votre texte ici" className="user-input" value={inputValue} onChange={(event) => setInputValue(event.target.value)} /><div className='validation'>
					<div className="button" onClick={handleClick}>Valider</div>
				</div></>
			) : (
				<div>
					{corrige} {/* Affiche le contenu corrigé */}
				</div>
			)}
		</div>
	);
}
export default SubstitutionQuestion;