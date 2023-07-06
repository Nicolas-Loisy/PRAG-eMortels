import { useState, useEffect, useCallback } from 'react';

import Content from "../components/Content";
import Bulle from '../components/Bulle';

import { api } from "../api/Api";
import "../css/ChoixNiveau.css";
import Bouton from '../components/Bouton';

function ChoixNiveau() {
  const [niveaux, setNiveaux] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const niveauxData = await api.getAllNiveaux();
      niveauxData.sort((a, b) => a._id - b._id);
      setNiveaux(niveauxData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Content>
      <div className="ChoixNiveau">
        <h1>NIVEAUX</h1>
        <div className='ColContainer'>
          <div className='Col1'>
            <div className='Mascotte' />
          </div>
          <div className='Col2'>
          <Bulle>
              <h2>Bienvenue dans mon entraînement jeune E-mortel !</h2>
              <p>Dans ce mode de jeu, ton Français sera mis à rude épreuve avec une série d'exercices aléatoires concoctés par mes soins. <br/>
                 Installe-toi confortablement et fais ton choix parmi mes trois niveaux de difficulté. Plus le chiffre du niveau est élevé, plus le défi sera relevé ! <br/>
                 Chaque niveau comprend une série de 10 exercices sur des règles de Français variées.<br/>
                 <strong>Alors prépare-toi à affronter mes terribles niveaux et bonne chance !!! </strong>
              </p>
            </Bulle>
          </div>
          <div className='Col3'>
            <div className='Niveaux'>
              {
                niveaux && niveaux.map((niveau, index) => {
                  return (
                    <Bouton
                      key={index}
                      nom={niveau.nom}
                      url={"entrainement/niveau/" + niveau._id}
                      className="Primaire Big"
                    />)
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default ChoixNiveau;
