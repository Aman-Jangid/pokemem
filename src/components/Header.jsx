import ScoreBoard from './ScoreBoard';

export default function Header(props) {
  const logo = '/favicon.png';

  return (
    <div className="header">
      <div className="logo">
        PokéMem <img src={logo} width={'35px'} />
      </div>
      <ScoreBoard score={props} />
      <div className="level">
        level <span>{props.level}</span>
      </div>
    </div>
  );
}
