import '../css/Header.css';
import logo from "../ressources/Images/logo.png"

function Header() {
  const handleClick = () => {
    // Gérer l'événement de clic ici
    console.log('Le bloc cliquable du header a été cliqué !');
  };

  return (
    <div className='Header'>
      <div onClick={handleClick} className="logo">
        <img src={logo} alt="Logo" />
        <p>Académie Française</p>
      </div>
    </div>
  );
}

export default Header;
