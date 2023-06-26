import logo from "../ressources/Images/logo.png"

function Header() {
  const handleClick = () => {
    // Gérer l'événement de clic ici
    console.log('Le bloc cliquable du header a été cliqué !');
  };

  return (
    <header>
      <div onClick={handleClick}>
        <img src={logo} alt="Logo" />
        <p>Académie Française</p>
      </div>
    </header>
  );
}

export default Header;
