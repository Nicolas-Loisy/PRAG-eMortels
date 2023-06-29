import "../css/BlocChoix.css";

function BlocChoix({ titre, url, description }) {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <div className="BlocChoix" onClick={handleClick}>
      <h3>{titre}</h3>
      <p>{description}</p>
    </div>
  );
}

export default BlocChoix;
