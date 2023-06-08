import uniqid from 'uniqid';
import Card from './Card';
import { useState } from 'react';

export default function Container(props) {
  const [clicked, setClicked] = useState(false);

  const data = props.pokemonList;

  return (
    <div className="container">
      {data.map((pokemon, index) => (
        <Card
          id={index}
          setClicked={setClicked}
          dimension={
            data.length < 13
              ? { width: '200px', height: '225px' }
              : data.length > 14 && data.length < 16
              ? { width: '145px', height: '160px' }
              : data.length > 15
              ? { width: '145px', height: '155px' }
              : { width: '170px', height: '195px' }
          }
          scoreSetter={props.scoreSetter}
          pokemon={pokemon}
          key={uniqid()}
        />
      ))}
    </div>
  );
}
