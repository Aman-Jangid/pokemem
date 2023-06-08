import useSound from 'use-sound';
import gameOverSound from '../assets/gameover.wav';
import { useEffect } from 'react';

export default function GameOver(props) {
  const [play] = useSound(gameOverSound);

  useEffect(() => {
    play();
  }, [play]);

  return (
    <div className="gameoverOverlay">
      Game Over :(
      <button onClick={() => props.restart()} className="control playagain">
        Play Again
      </button>
    </div>
  );
}
