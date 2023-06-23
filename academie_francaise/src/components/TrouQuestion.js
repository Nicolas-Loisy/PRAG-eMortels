function TrouQuestion({ ennonce }) {
  return (
    <div>
      <h3 dangerouslySetInnerHTML={ajout_input(ennonce)}/>
      <button>Valider</button>
    </div>
  );
}

function ajout_input(ennonce) {
  const regex = /\.{2,}/g;
  const replacedText = ennonce.replace(regex, '<input type="text" />');
  return { __html: replacedText };
}

export default TrouQuestion;