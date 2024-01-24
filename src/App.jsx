import Gameboard from './components/Gameboard';
import Player from './components/Player';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';
import { useState } from 'react';

const PLAYERS = {
    X : "Player 1",
    O : "Player 2"
};

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns){
  let currentPlayer = 'X';
  if(turns.length > 0 && turns[0].playerSymbol == 'X'){
        currentPlayer = 'O';
      }
  return currentPlayer;
}

function deriveGameBoard(turns){
  let board = [...initialBoard.map(innerArray => [...innerArray])];
  for(const turn of turns){
      const {square, playerSymbol} = turn;
      const {row, col} = square; 
      board[row][col] = playerSymbol;
  }
  return board;
}

function deriveWinner(board, playerName){
  let winner;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = board[combination[0].row][combination[0].column]
    const secondSquareSymbol = board[combination[1].row][combination[1].column]
    const thirdSquareSymbol = board[combination[2].row][combination[2].column]

    if(firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol){
        winner = playerName[firstSquareSymbol];
      }
  }   
  return winner;
}

function App() {

  const [turns, setTurns] = useState([]);
  const [playerName, setName] = useState(PLAYERS)
  const board = deriveGameBoard(turns);
  const winner = deriveWinner(board, playerName);
  let drawOccured = (turns.length == 9 && !winner);
  const activePlayer = deriveActivePlayer(turns);

  function handleClickofPlayer(rowIndex, colIndex){
    setTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: {row: rowIndex ,col: colIndex}, playerSymbol: currentPlayer },
          ...prevTurns
      ];
      return updatedTurns;
    })
  }
  
  function reStart(){
    setTurns([]);
  }

  function nameChange(symbol, newName){
    setName((prevPlayers) => {
      return{
        ...prevPlayers,
        [symbol] : newName
      }
    })}

  return (
    <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">  
          <Player initialName={PLAYERS.X} symbol ='X' isActive={activePlayer === 'X'} onNameChange={nameChange}/>
          <Player initialName={PLAYERS.O} symbol ='O' isActive={activePlayer === 'O'} onNameChange={nameChange}/>
      </ol>
      {(winner || drawOccured) && <GameOver winner={winner} onOver={reStart}/>}
      <Gameboard onSelectThis={handleClickofPlayer} gameBoard={board} />
    </div>
    <Log logTurn={turns} nameOfPlayer={playerName}/>
    </main>
  )
}

export default App