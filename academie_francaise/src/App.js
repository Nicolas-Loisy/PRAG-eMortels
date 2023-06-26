import Exercice from './components/Exercice';
import Exemple from './ressources/Exemple.json'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {
          <Exercice exercice={Exemple.Exercices[2]} />
        }
      </header>
    </div>
  );
}

export default App;

