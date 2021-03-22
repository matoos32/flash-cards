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

import { useState } from "react";
import "./styles/App.scss";
//import logo from "./res/logo.svg";
import { MathCard } from "./components/math-card/MathCard";
import { MathCardControls } from "./components/math-card/MathCardControls";

function App() {

  const ADDITION = '+';
  const SUBTRACTION = '-';
  const MULTIPLICATION = 'x';
  const DIVISION = '÷';

  const ONES = 1;
  const TENS = 10;
  const HUNDREDS = 100;
  const THOUSANDS = 1000;

  const operations = new Map();
  operations.set(ADDITION, (x, y) => { return x + y });
  operations.set(SUBTRACTION, (x, y) => { return x - y });
  operations.set(MULTIPLICATION, (x, y) => { return x * y });
  operations.set(DIVISION, (x, y) => { return x / y });

  const ranges = new Set();
  ranges.add(ONES);
  ranges.add(TENS);
  ranges.add(HUNDREDS);
  ranges.add(THOUSANDS);

  const MULTIPLICATION_TABLE_MAX = 12;
  const MULTIPLICATION_TABLE = getMultiplicationTable(MULTIPLICATION_TABLE_MAX);

  const CARD_CLICK_ANIM_CLASSES = [
    "anim-flip3d-y-left",
    "anim-flip3d-y-right",
    "anim-flip3d-y-up",
    "anim-flip3d-y-down",
    "anim-spin-clockwise-360",
    "anim-spin-counter-clockwise-360"
  ];

  const CARD_SIZE_MEDIUM = "card-size-med";
  const CARD_SIZE_LARGE = "card-size-lg";

  const [operationId, setOperationId] = useState(ADDITION);
  const [operandRange, setOperandRange] = useState(ONES);
  const [operand1, setOperand1] = useState(getRandForMagnitude(operandRange));
  const [operand2, setOperand2] = useState(getRandForMagnitude(operandRange));
  const [result, setResult] = useState( operand1 + operand2 );
  const [showResult, setShowResult] = useState( false );
  const [cardAnimation, setCardAnimation] = useState(CARD_CLICK_ANIM_CLASSES[0]);
  const [cardSize, setCardSize] = useState(CARD_SIZE_LARGE);

  function handleModeChange(newMode) {

    if( operations.has(newMode) ) {
      resetCard(newMode, operandRange);
    } else {
      // Should never be here.
      console.error('Unsupported mode (' + newMode + '). Defaulting to addition.');
      resetCard(ADDITION, operandRange);
    }
  }

  function handleRangeChange(newRange) {

    if( ranges.has(newRange) ) {
      resetCard(operationId, newRange);

    } else {
      // Should never be here.
      console.error('Unsupported range (' + newRange + '). Defaulting to ' + TENS + '.');
      resetCard(operationId, TENS);
    }
  }

  function handleCardClick() {

    if(!showResult) {
      setShowResult(!showResult);
    }

    if(showResult) {
      // Animate first so data can change during the animation
      setNextCardAnimation();
      resetCard(operationId, operandRange)
    }
  }

  function resetCard(opId, range) {
    const operation = operations.get(opId);
    let op1 = 1;
    let op2 = 1;
    
    // Some UX optimizations

    if(opId === ADDITION) {
      op1 = getRand(0, (10 * range) - 1);
      op2 = getRand(0, (10 * range) - 1);
    }

    if(opId === SUBTRACTION) {
      op1 = getRand(0, (10 * range) - 1);
      op2 = getRand(0, (10 * range) - 1);

      // Don't allow negative results
      if(op2 > op1) {
        let temp = op1;
        op1 = op2;
        op2 = temp;
      }
    }

    if(opId === MULTIPLICATION) {

      if(range === ONES) {
        op1 = getRand(1, MULTIPLICATION_TABLE_MAX);
        op2 = getRand(1, MULTIPLICATION_TABLE_MAX);
      } else {
        // Ensure most of the time the multiplications are simple,
        // but occasionally allow a hard one to slip in :)
        const keepItSimple = Math.random() < 0.90;

        if (keepItSimple) {
          op1 = getRand(range, (10 * range) - 1);
          op2 = getRand(0, (10 * ONES) - 1);
          const swapOperandOrder = Math.random() < 0.20;
          if(swapOperandOrder) {
            let temp = op1;
            op1 = op2;
            op2 = temp;
          }
        } else {
          op1 = getRand(0, (10 * range) - 1);
          op2 = getRand(0, (10 * range) - 1);
        }
      }
    }

    if(opId === DIVISION) {

      if(range === ONES) {
        let multOp1 = getRand(1, MULTIPLICATION_TABLE_MAX);
        let multOp2 = getRand(1, MULTIPLICATION_TABLE_MAX);
        op1 = MULTIPLICATION_TABLE[multOp1 - 1][multOp2 - 1];
        op2 = multOp2;
      } else {
        // Only allow whole number division
        // Always keep it simple
        // Allow 10 in the ones range
        op2 = getRand(1, (10 * ONES));

        // TODO: optimize this so a loop isn't needed
        do {
          op1 = op2 * getRand(range, (10 * range) - 1);
        } while(op1 > 10 * range);
      }      
    }

    const res = operation(op1, op2);

    setOperationId(opId);
    setOperandRange(range);
    setOperand1(op1);
    setOperand2(op2);
    setResult(res);
    setShowResult(false);

    let aCardSize = (opId === MULTIPLICATION) && (range === THOUSANDS) ? CARD_SIZE_LARGE : CARD_SIZE_MEDIUM;

    setCardSize(aCardSize);
  }

  function setNextCardAnimation() {

    let nextCardAnimation = null;

    if(CARD_CLICK_ANIM_CLASSES.length === 1) {
      nextCardAnimation = CARD_CLICK_ANIM_CLASSES[0];
    } else {
      do {
        nextCardAnimation = CARD_CLICK_ANIM_CLASSES[getRand(0, CARD_CLICK_ANIM_CLASSES.length - 1)];
      } while(nextCardAnimation === cardAnimation);
    }

    setCardAnimation(nextCardAnimation);
  }

  function getRand(min, max) {
    return Math.round(min + (Math.random() * (max - min)));
  }

  function getRandForMagnitude(magnitude) {
    return Math.round(Math.random() * ((10 * magnitude) - 1));
  }

  function getMultiplicationTable(max) {
    let table = new Array(max);
    for(let i = 0; i < max; i++) {
      table[i] = new Array(max);
      for(let j = 0; j < max; j++) {
        table[i][j] = (i+1) * (j+1);  
      } 
    }
    return table;
  }

  return (
    <div className="App theme-dark">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>Welcome to Math Cards!</div>
      </header>

      <div className="App-body">
        <MathCard cardAnimationClass={cardAnimation}
                  sizeClass={cardSize}
                  operationId={operationId}
                  operand1={operand1}
                  operand2={operand2}
                  result={result}
                  showResult={showResult}
                  onCardClick={handleCardClick}/>

        <div className="tap-prompt">Tap the card</div>
      </div>

      <footer className="App-footer">
        <MathCardControls modes={[ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION]}
                            ranges={[ONES, TENS, HUNDREDS, THOUSANDS]}
                            onModeClick={handleModeChange}
                            onRangeClick={handleRangeChange} />
      </footer>
    </div>
  );
}

export default App;
