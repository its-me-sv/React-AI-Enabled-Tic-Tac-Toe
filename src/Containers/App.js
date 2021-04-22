import '../index.css';
import React, {useState} from 'react';
import {EMPTY, HUMAN, COMPUTER} from './Constants.js';
import Square from '../Components/square.js';
import Result from '../Components/result.js';
import {detectWinner, calculateResponse} from './helperFunctions.js';
import bulb_on from './bulb_on.png';
import bulb_off from './bulb_off.png';

const initialState = {
  player: HUMAN,
  positions: [
  EMPTY, EMPTY, EMPTY, 
  EMPTY, EMPTY, EMPTY,
  EMPTY, EMPTY, EMPTY
  ],
  bulb: false,
  bulbSrc: bulb_off
};

function App() {
  const [state, setState] = useState(initialState);

  const winner = detectWinner(state.positions);

  // If the game is not yet finished and it's the computer's turn
  if(winner === undefined && state.player === COMPUTER) {
    // Calculate which position will the computer take
    const position = calculateResponse(state.positions);
    // Wait a few milliseconds before the computer goes, make it look like 'thinking'
    setTimeout(() => takeTurn(position), 300)  
  }

  function takeTurn(position) {
    const positions = [...state.positions];
    positions[position] = state.player;

    setState({...state, ...{
      player: state.player === HUMAN ? COMPUTER : HUMAN,
      positions
    }});
  }

  function reset() {
    setState(initialState);
  }

  function changeTheme() {
    let bulb = state.bulb;
    let bulbSrc;
    let background = document.getElementById("root");
    let squareBackground = document.getElementsByClassName("square");
    
    if (bulb === true){
      background.style.backgroundColor = '#333333';
      for (let i = 0; i < squareBackground.length; i += 1)
        squareBackground[i].style.backgroundColor = '#333333';
      bulbSrc = bulb_off;
    } else {
      background.style.backgroundColor = '#e6e6e6';
      for (let i = 0; i < squareBackground.length; i += 1)
        squareBackground[i].style.backgroundColor = '#e6e6e6';
      bulbSrc = bulb_on;
    }

    bulb = !bulb;
    setState({...state, ...{bulb, bulbSrc}});
  }

  let nineSquares = state.positions.map((val, i) => 
    <div key={i}>
      <Square position={i} value={state.positions[i]} takeTurn={takeTurn} />
    </div>);

  return (
    <div>
      <img src={state.bulbSrc} alt="" onClick={changeTheme}></img>
      <h1>Tic Tac Toe</h1>
      <div className="grid">
        {nineSquares}
      </div>
      {winner !== undefined && (<Result winner={winner} reset={reset} />)}
    </div>
  );
}

export default App;