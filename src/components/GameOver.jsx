import useSound from 'use-sound';
import gameOverSound from '../assets/gameover.wav';
import gameWinSound from '../assets/win.mp3';
import { useEffect } from 'react';

export default function GameOver(props) {
  const [play] = useSound(
    props.title === 'Game Over 😞' ? gameOverSound : gameWinSound
  );

  useEffect(() => {
    play();
  }, [play]);

  return (
    <div className="gameoverOverlay">
      {props.title}
      <button onClick={() => props.restart()} className="control playagain">
        Play Again
      </button>
    </div>
  );
}
