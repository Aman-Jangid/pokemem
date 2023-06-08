export default function GameOver(props) {
  // trying to change the style of the remaining cards ************
  // const cards = document.querySelectorAll('.card');
  // cards.forEach((card, i) => {
  //   const child = card.querySelector('label');

  //   props.remainingPokemon[i].name === child.textContent &&
  //   props.remainingPokemon[i].clicked
  //     ? child.parentElement.classList.add('remaining')
  //     : console.log('aaaaaaa');
  // });
  return (
    <div className="gameoverOverlay">
      Game Over :(
      <button className="control playagain">Play Again</button>
    </div>
  );
}
