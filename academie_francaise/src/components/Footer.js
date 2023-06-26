import '../css/Footer.css';

function Footer() {
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
            <a href="https://www.academie-francaise.fr" title="Académie Française">
              Académie Française
            </a>
          </li>
          <li>
            <a href="https://www.dictionnaire-academie.fr" title="Dictionnaire de l'Académie Française">
              Dictionnaire de l'Académie Française
            </a>
          </li>
          <li>
            <a href="https://www.institutdefrance.fr" title="Institut de France">
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

      </div>
    </div>
  );
}

export default Footer;
