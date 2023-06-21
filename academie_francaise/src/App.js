import logo from './logo.svg';
import QCM_question from './components/QCM_question';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <QCM_question 
          question="Est-ce qu'un immortel sent bon ?"
          options={["Oui", "Non"]}
          regle="Un vieux sent toujours mauvais."
          reponse="Non"
        />
      </header>
    </div>
  );
}

export default App;

