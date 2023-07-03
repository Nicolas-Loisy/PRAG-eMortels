import Content from "../components/Content";
import "../css/ChoixNiveau.css";

function ChoixNiveau() {
  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <Content>
      <div className="ChoixNiveau">
        <h1>
          Niveaux
        </h1>
      </div>
    </Content>
  );
}

export default ChoixNiveau;