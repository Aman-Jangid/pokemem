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

  console.log(
    'pokemonList ' + pokemonList,
    'cardCount ' + cardCount,
    'score ' + score,
    'highScore ' + highScore,
    'level ' + level,
    'isGameOver ' + isGameOver
  );
  // generates a random number every run
  const random = uniqueRandom(1, 500);
  // fetches and converts received data to an array of pokemon
  const getPokemonData = async (from) => {
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
  // returns an array of given length with random non-repeating numbers
  const generateRandomList = (length) => {
    // create an array of numbers from 0 to length
    const numbers = Array.from({ length: length }, (_, index) => index);
    const result = [];

    while (numbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers.splice(randomIndex, 1)[0];
      result.push(randomNumber);
    }
    return result;
  };

  // 1.fetches random pokemon when component mounts
  useEffect(() => {
    const from = random();
    getPokemonData(from);
  }, []);

  // get and set highscore in localstorage and state
  useEffect(() => {
    if (score > localStorage.getItem('highscore')) {
      localStorage.setItem('highscore', score);
      setHighScore(localStorage.getItem('highscore'));
    }
  }, [score]);

  // when all objects in the pokemonList array contain clicked:true property
  const nextStage = () => {
    setLevel(level + 1);
    setCardCount(cardCount + 1);
  };

  // triggers whenever pokemonList is updated and calls nextStage() when all the cards contain clicked property
  useEffect(() => {
    if (pokemonList.length > 0) {
      const clickedAll = pokemonList.every(
        (pokemon) => 'clicked' in pokemon && pokemon.clicked === true
      );
      clickedAll ? nextStage() : null;
    }
  }, [pokemonList]);

  useEffect(() => {
    if (level < 2) {
      setCardCount(4);
    }

    // setCardCount(cardCount + 1);
    const from = random();
    getPokemonData(from);
  }, [level]);

  const updateObject = (i, newValue) => {
    // when an object containing clicked:true is clicked again
    if (pokemonList[i].clicked) {
      // setScore(0);
      setIsGameOver(true);
      return;
    }

    // increment score
    setScore(score + 1);

    // initialize an array of random non-repeating numbers
    const randomIndexes = generateRandomList(cardCount);
    const newPokemonArray = [];

    pokemonList.forEach((pokemon, index) => {
      newPokemonArray[randomIndexes[index]] = pokemon;
    });

    newPokemonArray.map((pokemon) => {
      if (pokemon.name === newValue.name) {
        pokemon.clicked = true;
      }
    });
    setPokemonList([...newPokemonArray]);
  };

  // sets score when clicking on a card
  const scoreSetter = (e) => {
    const i = e.target.id;
    updateObject(i, { ...pokemonList[i], clicked: true });
  };

  // start/restart game
  const restartGame = () => {
    console.log('restarted');
    // resetting state
    setCardCount(4);
    setScore(0);
    setHighScore(localStorage.getItem('highscore'));
    setLevel(1);
    setIsGameOver(false);
    // setPokemonList([]);

    const from = random();
    getPokemonData(from);
  };

  return (
    <div className="App">
      <Header score={score} highScore={highScore} level={level} />
      {isGameOver ? (
        <>
          <GameOver restart={restartGame} />
          <Container pokemonList={pokemonList} scoreSetter={scoreSetter} />
        </>
      ) : (
        <Container pokemonList={pokemonList} scoreSetter={scoreSetter} />
      )}
    </div>
  );
}
export default App;
