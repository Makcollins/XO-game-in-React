import { useState } from "react";
import Board from "./Board";
import GameState from "./GameState";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);;
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: any) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: any) {
        setCurrentMove(nextMove);
    }

    const winner = calculateWinner(currentSquares);

    let status;
    let statusTitle;
    if (currentSquares.every((e: any) => e === null)) {
        statusTitle = "Start game"
        status = "X goes first"
    }
    else if (winner) {
        statusTitle = "Game Over"
        status = `${winner} wins`;
    }
    else if (!winner && currentSquares.every((e: any) => e !== null)) {
        statusTitle = "Game Over"
        status = `Draw`;
    }
    else {
        statusTitle = "Next player is"
        status = (xIsNext ? "X" : "O");
    }

    function handleValues(i: number) {
        if (currentSquares[i] || calculateWinner(currentSquares)) {
            return;
        }
        const nextSquares = currentSquares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        // setSquares(nextSquares);
        // setXIsNext(!xIsNext);
        handlePlay(nextSquares);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board status={status} statusTitle={statusTitle} squares={currentSquares} handleValues={handleValues} />
            </div>
            <div className="game-info">
                {/* <ol>{moves}</ol> */}
                <div className="game-btns">
                    <button className="clear-board" onClick={() => jumpTo(0)}>Clear Board</button>
                    <button className="go-back" onClick={() => jumpTo(history.length - 2)}>Go Back</button>
                    <button className="go-back" onClick={() => jumpTo(history.length - 1)}>Redo</button>
                </div>
                <GameState statusTitle = {statusTitle} status = {status} />
            </div>
        </div>
    );
}

export default Game;

function calculateWinner(currentSquares: any) {
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
        if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
            return currentSquares[a];
        }
    }
    return null;
}