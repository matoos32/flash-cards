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
