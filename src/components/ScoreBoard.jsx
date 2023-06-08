export default function ScoreBoard(props) {
  return (
    <div className="scoreboard">
      <div className="currentScoreContainer">
        <label htmlFor="current-score">Current Score</label>
        <div className="currentScore" id="current-score">
          {props.score.score}
        </div>
      </div>
      <div className="highScoreContainer">
        <label htmlFor="high-score">High Score</label>
        <div className="highScore" id="high-score">
          {props.score.highScore}
        </div>
      </div>
    </div>
  );
}
