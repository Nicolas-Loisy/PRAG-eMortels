import '../css/Footer.css';
import logo from "../ressources/Images/Logo.png";

function Footer() {
  const handleClick = (url) => {
    window.location.href = url;
  };


  return (
    <div className='Footer'>

      <div className='col col-1'>
        <ul>
          <li>
            <p>
              Autres sites :
            </p>
          </li>
          <li>
            <a href="https://www.academie-francaise.fr" title="Académie Française" target="_blank" rel="noopener noreferrer">
              Académie Française
            </a>
          </li>
          <li>
            <a href="https://www.dictionnaire-academie.fr" title="Dictionnaire de l'Académie Française" target="_blank" rel="noopener noreferrer">
              Dictionnaire de l'Académie Française
            </a>
          </li>
          <li>
            <a href="https://www.institutdefrance.fr" title="Institut de France" target="_blank" rel="noopener noreferrer">
              Institut de France
            </a>
          </li>
        </ul>
      </div>

      <div className='col col-2'>
        <p>
          © Académie française, 2023
        </p>
      </div>

      <div className='col col-3'>
        <div className="logo" onClick={() => handleClick("/")}>
          <img src={logo} alt="Logo" />
          <p>Académie de Renart</p>
        </div>

      </div>
    </div>
  );
}

export default Footer;
