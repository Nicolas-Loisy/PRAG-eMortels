import '../css/NumQuestion.css';

function NumQuestion({ Num, onClick, isSelected, repondu }) {
  const handleClick = () => {
    onClick(Num);
  };

  let containerClassName = 'NumQuestion';

  if (isSelected) {
    containerClassName += ' selected';
  }

  if (repondu !== null) {
    containerClassName += repondu ? ' correct' : ' incorrect';
  }

  return (
    <div className={containerClassName} onClick={handleClick}>
      <p>{Num + 1}</p>
    </div>
  );
}

export default NumQuestion;
