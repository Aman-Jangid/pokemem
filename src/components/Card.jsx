import { useRef } from 'react';
import useSound from 'use-sound';
import clickSound from '../assets/select.mp3';

export default function Card(props) {
  const { name, image } = props.pokemon;

  const [play] = useSound(clickSound);

  const onClickHandle = (e) => {
    props.scoreSetter(e);
    play();
  };

  return (
    <div className="card" style={props.dimension}>
      <div
        className="overlay"
        id={props.id}
        onClick={(e) => onClickHandle(e)}
        style={props.dimension}
      ></div>
      <div className="cardBackground">
        <img src={image} alt="pokemon" onClick={props.scoreSetter} />
      </div>
      <label htmlFor="cardBackground">{name}</label>
    </div>
  );
}
