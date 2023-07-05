import { useState, useEffect, useCallback } from 'react';

import Content from "../components/Content";
import BlocChoix from "../components/BlocChoix";

import { api } from "../api/Api";
import "../css/ChoixNiveau.css";

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
        <div className='NiveauConteneur'>
          {
            niveaux && niveaux.map((niveau, index) => {
              return (<BlocChoix
                key={index}
                titre={niveau.nom}
                url={"entrainement/niveau/" + niveau._id}
                description={"Je souhaite m'entrainer sur des questions aléatoires de niveau " + niveau._id}
              />)
            })
          }
        </div>
      </div>
    </Content>
  );
}

export default ChoixNiveau;
