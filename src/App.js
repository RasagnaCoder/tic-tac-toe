import './App.css';
import { useState } from 'react';

function Square({ val, onSquareClick }) {
  return <button className='square' onClick={onSquareClick}>{val}</button>;
}

let player1 = "player1", player2 = "player2", b1 = false, b2 = false;

function Inp({ nameinps }) {
  return (
    <>
      <div className="inps">
        <div>
          <label className="lbs">Enter Player1's name: </label>
          <input className="inp" type="text" id="p1" placeholder="player 1"></input>
        </div>
        <div>
          <label className="lbs">Enter Player2's name: </label>
          <input className="inp" id="p2" type="text" placeholder="Player 2"></input>
        </div>
      </div>
      <div className="inps">
        <button className="btn" onClick={nameinps}>Submit</button>
      </div>
    </>
  );
}

function Play({ name }) {
  return <p className="play">{`${name}'s turn:`}</p>;
}

function Heading() {
  return <h1 className="heading">Tic Tac Toe</h1>;
}

function DispWinner({ name }) {
  return <p className="win">&#128293; &#128293;{`  ${name} Won   `} &#128293; &#128293;</p>;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [player, setPlayer] = useState(player1);

  function nameinps() {
    player1 = document.getElementById("p1").value.toUpperCase();
    player2 = document.getElementById("p2").value.toUpperCase();
    if (player1 === "") player1 = "player1";
    if (player2 === "") player2 = "player2";
    setPlayer(player1);
    b1 = true;
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calculateWinner(nextSquares)) return;
    nextSquares[i] = isNext ? "X" : "O";
    setSquares(nextSquares);
    setPlayer(player === player1 ? player2 : player1);

    if (calculateWinner(nextSquares)) b2 = true;
    setIsNext(!isNext);
  }

  return (
    <main>
      <Heading />
      <Inp nameinps={nameinps} />
      {b1 && <Play name={player} />}
      <div className="bparent">
        {b1 && <div className="board">
          <div className='board-row'>
            <Square val={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square val={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square val={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className='board-row'>
            <Square val={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square val={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square val={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className='board-row'>
            <Square val={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square val={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square val={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>}
      </div>
      {b2 && <DispWinner name={player === player1 ? player2 : player1} />}
    </main>
  );
}
