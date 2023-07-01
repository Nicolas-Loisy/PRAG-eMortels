import Content from "../components/Content";
import "../css/NotFound.css";

function NotFound() {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <Content>
      <div className="NotFound">
        <h1>
          Cette page n'existe pas
        </h1>
        <div className="button" onClick={handleClick}>
          <p>Accueil</p>
        </div>
      </div>
    </Content>
  );
}

export default NotFound;