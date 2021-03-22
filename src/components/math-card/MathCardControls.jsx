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

import "./MathCardControls.scss";

function FlipModeSelectionCtrls({modes, onModeClick}) {

  function onClick(mode) {
    if(onModeClick) {
      onModeClick(mode);
    }
  }

  if (!modes) {
    return <div></div>;
  } else {
    return (
      <div className="btn-group">
        {modes.map((mode, index) => <button key={index} onClick={() => onClick(mode)}>{mode}</button>)}
      </div>
    );
  }
}

function FlipRangeCtrls({ranges, onRangeClick}) {

  function onClick(range) {
    if(onRangeClick) {
      onRangeClick(range);
    }
  }

  if (!ranges) {
    return <div></div>;
  } else {
    return (
      <div className="btn-group">
        {ranges.map((range, index) => <button key={index} onClick={() => onClick(range)}>{range}</button>)}
      </div>
    );
  }
}

function MathCardControls({modes, ranges, onModeClick, onRangeClick}) {
  return (
    <div className="card-controls">
      <FlipRangeCtrls ranges={ranges} onRangeClick={onRangeClick}/>
      <FlipModeSelectionCtrls modes={modes} onModeClick={onModeClick}/>
    </div>
  );
}

export { MathCardControls };
