import logo from './logo.svg';
import Exercice from './components/Exercice';
import Exemple from './ressources/Exemple.json'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Exercice exercice={Exemple.Exercices[2]} />
      </header>
    </div>
  );
}

export default App;

