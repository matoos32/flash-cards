/**
 * Copyright © 2021 Math Cards site owner
 * 
 * Permission is hereby granted to access and use this website as it is made available
 * online by the author, however you may not copy, re-distribute, modify, or sell this
 * website, or sell access to this site, in part or as a whole, under any circumstances.
 * 
 * THE WEBSITE AND SOFTWARE ARE PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE WEBSITE OR SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE WEBSITE OR SOFTWARE.
 */

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