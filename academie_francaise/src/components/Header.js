import '../css/Header.css';
import logo from "../ressources/Images/logo.png"

function Header() {
  return (
    <div className='Header'>
      <a className="logo" href='./'>
        <img src={logo} alt="Logo" />
        <p>Académie Française</p>
      </a>
    </div>
  );
}

export default Header;
