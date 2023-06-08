import './App.css';
import { useEffect, useState } from 'react';
import uniqueRandom from 'unique-random';
import fetchMultiplePokemon from './components/fetch';

import Container from './components/Container';
import Header from './components/Header';
import GameOver from './components/GameOver';

function App() {
  // contains array of pokemon objects with name and image
  const [pokemonList, setPokemonList] = useState([]);
  // number of cards to render
  const [cardCount, setCardCount] = useState(4);
  // score
  const [score, setScore] = useState(0);
  // get highScore from localStorage**************************
  const [highScore, setHighScore] = useState(
    localStorage.getItem('highscore')
      ? localStorage.getItem('highscore')
      : score
  );

  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // generates a random number every run
    const random = uniqueRandom(1, 500);
    const from = random();
    // fetches and converts received data to an array of pokemon
    const getPokemonData = async () => {
      const data = await fetchMultiplePokemon(from, cardCount);
      const pokeList = [];
      data.map((pokemon) =>
        pokeList.push({
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default,
        })
      );
      setPokemonList([...pokeList]);
    };

    getPokemonData();
  }, []);

  // get and set highscore in localstorage and state
  useEffect(() => {
    if (score > localStorage.getItem('highscore')) {
      localStorage.setItem('highscore', score);
      setHighScore(localStorage.getItem('highscore'));
    }
  }, [score]);

  // triggers whenever pokemonList is updated
  useEffect(() => {
    if (pokemonList.length > 0) {
      const clickedAll = pokemonList.every(
        (pokemon) => 'clicked' in pokemon && pokemon.clicked === true
      );
      clickedAll ? nextStage() : null;
    }
  }, [pokemonList]);

  // when all objects in the pokemonList array contain clicked:true property
  const nextStage = () => {
    console.log('starting next stage');
    setLevel(level + 1);
    // setCardCount
  };

  useEffect(() => {
    console.log('level__', level);
    if (level !== 1) {
      setCardCount(cardCount + level + 1);
    }
  }, [level]);

  const updateObject = (i, newValue) => {
    // when an object containing clicked:true is clicked again
    if (pokemonList[i].clicked) {
      setScore(0);
      setIsGameOver(true);
      return;
    }

    setScore(score + 1);

    setPokemonList((prevState) => {
      const newArr = [...prevState];
      newArr[i] = newValue;
      return newArr;
    });
  };

  // sets score when clicking on a card
  const scoreSetter = (e) => {
    // e.target.id = pokemon name
    const i = e.target.id;
    updateObject(i, { ...pokemonList[i], clicked: true });
  };

  // start/restart game
  const startGame = () => {};

  return (
    <div className="App">
      <Header score={score} highScore={highScore} />
      {
        // isGameOver
        false ? (
          <>
            <GameOver />
            <Container pokemonList={pokemonList} scoreSetter={scoreSetter} />
          </>
        ) : (
          <Container pokemonList={pokemonList} scoreSetter={scoreSetter} />
        )
      }
    </div>
  );
}

export default App;
