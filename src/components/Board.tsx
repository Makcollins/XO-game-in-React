import Square from "./Square";

function Board({xIsNext, squares, onPlay}:any) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleValues(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square val={squares[0]} onSquareClick={() => handleValues(0)} />
        <Square val={squares[1]} onSquareClick={() => handleValues(1)} />
        <Square val={squares[2]} onSquareClick={() => handleValues(2)} />
      </div>
      <div className="board-row">
        <Square val={squares[3]} onSquareClick={() => handleValues(3)} />
        <Square val={squares[4]} onSquareClick={() => handleValues(4)} />
        <Square val={squares[5]} onSquareClick={() => handleValues(5)} />
      </div>
      <div className="board-row">
        <Square val={squares[6]} onSquareClick={() => handleValues(6)} />
        <Square val={squares[7]} onSquareClick={() => handleValues(7)} />
        <Square val={squares[8]} onSquareClick={() => handleValues(8)} />
      </div>
    </>
  )

}

export default Board

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}