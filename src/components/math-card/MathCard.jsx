import "./MathCard.scss";
import "../../styles/animations.scss"

function MathCard({cardAnimationClass, sizeClass, operationId,
                   operand1, operand2, result, showResult,
                   onCardClick}) {
  
  function precisionRound(number, precision) {
    const magnitude = Math.pow(10, precision);
    return Math.round(number * magnitude) / magnitude;
  }

  return (
    <div className={"math-card " + cardAnimationClass + " " + sizeClass}
         onClick={onCardClick.bind(this)} >

      <div className="math-card-content">

        <div className="equation-box">
          {operationId}
          <div className="operand-col">
            <div className="operand-box">
              {operand1}
            </div>
            <div className="operand-box">
            {operand2}
            </div>
          </div>
        </div>

        <div className="result-line" />

        <div className="equation-box">
          <div className="result-box">{showResult ? precisionRound(result, 2) : "?"} </div>
        </div>
      </div>

    </div>
  );

}

export { MathCard };