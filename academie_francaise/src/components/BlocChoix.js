import "../css/BlocChoix.css";

function BlocChoix({ titre, url, description }) {
  return (
    <a href={url}>
      <div className="BlocChoix">
        <h3>{titre}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
}

export default BlocChoix;
