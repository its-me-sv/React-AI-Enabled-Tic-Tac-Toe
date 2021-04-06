import React from 'react';
import '../index.css';
import {TIE, HUMAN, COMPUTER} from '../Containers/Constants.js';

function Result({winner, reset}){
  return (
    <div className="result">
      {winner === COMPUTER && "Computer Won The Game"}
      {winner === HUMAN && "You Won The Game"}
      {winner === TIE && "Game Tied"}
      <button onClick={reset}>Play Again</button>
    </div>
  );
}

export default Result;