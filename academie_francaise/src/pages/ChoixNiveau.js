import { useState, useEffect, useCallback } from 'react';

import Content from "../components/Content";

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
