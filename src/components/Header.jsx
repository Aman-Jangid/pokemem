import ScoreBoard from './ScoreBoard';

export default function Header(props) {
  const logo = 'public/favicon.png';

  return (
    <div className="header">
      <div className="logo">
        PokéMem <img src={logo} width={'35px'} />
      </div>
      <ScoreBoard score={props} />
      <button className="control">Start</button>
    </div>
  );
}
