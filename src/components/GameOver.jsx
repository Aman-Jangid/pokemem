export default function GameOver(props) {
  return (
    <div className="gameoverOverlay">
      Game Over :(
      <button onClick={() => props.restart()} className="control playagain">
        Play Again
      </button>
    </div>
  );
}
