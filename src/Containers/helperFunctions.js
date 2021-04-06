import {EMPTY, TIE, COMPUTER, HUMAN} from './Constants.js';

export function detectWinner(p) {
  function lineFullOf(player){
    if(p[0] === player && p[1] === player && p[2] === player) return true; // First line is full
    if(p[3] === player && p[4] === player && p[5] === player) return true; // Second line is full
    if(p[6] === player && p[7] === player && p[8] === player) return true;

    if(p[0] === player && p[3] === player && p[6] === player) return true; // First column is full
    if(p[1] === player && p[4] === player && p[7] === player) return true;
    if(p[2] === player && p[5] === player && p[8] === player) return true;

    if(p[0] === player && p[4] === player && p[8] === player) return true;
    if(p[2] === player && p[4] === player && p[6] === player) return true;
  }

  function gridIsFull() {
    return p.every(position => position !== EMPTY);
  }

  const playerWon = lineFullOf(HUMAN);
  if(playerWon !== undefined) 
    return HUMAN;
  
  const computerWon = lineFullOf(COMPUTER);
  if(computerWon !== undefined) 
    return COMPUTER;
  
  const tie = gridIsFull();
  if(tie) 
    return TIE;

}

export function calculateResponse(p) { 
  
  // This function gives back the first empty position (if any) that is in a line
  // that is otherwise full of circles / crosses (depending on the parameter)
  function emptyPositionInLineFullOf(player) {
    if(p[0] === EMPTY && (                   // If the first position is empty,
      (p[1] === player && p[2] === player) ||   // but otherwise the first row is full
      (p[3] === player && p[6] === player) ||   // or the first column is full
      (p[4] === player && p[8] === player)      // or the diagonal line starting from first position is full
    )) return 0;                            // then return the first position
                                            // because it's a good position to defend / attack
    
    if(p[1] === EMPTY && (                   // If the second position is empty
      (p[0] === player && p[2] === player) ||   // but otherwise the first row is full
      (p[4] === player && p[7] === player)      // or the second column is full
    )) return 1;                            // then return the second position
                                            // because it's a good position to defend / attack
    
    if(p[2] === EMPTY && (
      (p[0] === player && p[1] === player) || 
      (p[5] === player && p[8] === player) || 
      (p[4] === player && p[6] === player)
    )) return 2;

    if(p[3] === EMPTY && (
      (p[4] === player && p[5] === player) || 
      (p[0] === player && p[6] === player)
    )) return 3;
    
    if(p[4] === EMPTY && (
      (p[3] === player && p[5] === player) || 
      (p[1] === player && p[7] === player) || 
      (p[0] === player && p[8] === player) || 
      (p[2] === player && p[6] === player)
    )) return 4;
    
    if(p[5] === EMPTY && (
      (p[3] === player && p[4] === player) || 
      (p[2] === player && p[8] === player)
    )) return 5;

    if(p[6] === EMPTY && (
      (p[7] === player && p[8] === player) || 
      (p[0] === player && p[3] === player) || 
      (p[4] === player && p[2] === player)
    )) return 6;
    
    if(p[7] === EMPTY && (
      (p[6] === player && p[8] === player) || 
      (p[1] === player && p[4] === player)
    )) return 7;
    
    if(p[8] === EMPTY && (
      (p[6] === player && p[7] === player) || 
      (p[2] === player && p[5] === player) || 
      (p[4] === player && p[0] === player)
    )) return 8;  
  }
  
  // If there's a position the computer can take and win then take it
  const winningPosition = emptyPositionInLineFullOf(COMPUTER);
  if(winningPosition !== undefined) 
    return winningPosition;
  
  // Otherwise if there's a position the human can take in next turn to win, then take it
  const defendingPosition = emptyPositionInLineFullOf(HUMAN);
  if(defendingPosition !== undefined) 
    return defendingPosition;
  
  // Otherwise pick random position that's empty
  while(true) {
    const randomPosition = Math.floor(Math.random()*9)
    if(p[randomPosition] === EMPTY) 
      return randomPosition;
  }
}