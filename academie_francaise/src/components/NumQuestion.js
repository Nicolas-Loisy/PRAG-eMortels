import '../css/NumQuestion.css';

function NumQuestion({ Num, onClick, isSelected }) {
  const handleClick = () => {
    onClick(Num);
  };

  let containerClassName = 'NumQuestion';

  if (isSelected) {
    containerClassName += ' selected';
  }

  return (
    <div className={containerClassName} onClick={handleClick}>
      <p>{Num}</p>
    </div>
  );
}

export default NumQuestion;
