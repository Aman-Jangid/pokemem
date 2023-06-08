export default function Card(props) {
  const { name, image } = props.pokemon;

  const onClickHandle = (e) => {
    props.scoreSetter(e);
  };

  return (
    <div className="card" style={props.dimension}>
      <div
        className="overlay"
        id={props.id}
        onClick={(e) => props.scoreSetter(e)}
        style={props.dimension}
      ></div>
      <div className="cardBackground">
        <img src={image} alt="pokemon" onClick={props.scoreSetter} />
      </div>
      <label htmlFor="cardBackground">{name}</label>
    </div>
  );
}
