import useSound from 'use-sound';
import clickSound from '../assets/select.mp3';

export default function Card(props) {
  const { name, image } = props.pokemon;

  const mobileWidth = '100px';
  const styles = {
    '--mobile-width': props.dimension.width,
    '--mobile-height': props.dimension.height,
  };
  const [play] = useSound(clickSound);

  console.log(styles);
  const onClickHandle = (e) => {
    props.scoreSetter(e);
    play();
  };

  return (
    <div className="card" style={styles}>
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
