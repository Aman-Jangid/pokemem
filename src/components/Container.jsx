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
              : { width: '150px', height: '175px' }
          }
          scoreSetter={props.scoreSetter}
          pokemon={pokemon}
          key={uniqid()}
        />
      ))}
    </div>
  );
}
