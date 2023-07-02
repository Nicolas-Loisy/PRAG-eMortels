import '../css/Header.css';
import logo from "../ressources/Images/Logo.png";

function Header() {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div className='Header'>
      <div className="logo"  onClick={handleClick}>
        <img src={logo} alt="Logo" />
        <p>Académie Française</p>
      </div>
    </div>
  );
}

export default Header;
