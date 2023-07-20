import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Square = styled.button`
  width: 60px;
  height: 60px;
  margin: 0;
  border: 1px solid #000;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
`;

const BoardRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Status = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const ResetButton = styled.button`
  display: block;
  width: 100px;
  margin: 20px auto;
  padding: 5px;
`;

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  useEffect(() => {
    if (!isXNext && !winner) {
      const index = findBestMove(board);
      const newBoard = [...board];
      newBoard[index] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
    }
  }, [board, isXNext, winner]);

  function handleClick(index) {
    if (board[index] !== null || winner !== null) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  }

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes(null)) return 'Tie';
    return null;
  }

  function minimax(board, depth, isMaximizing) {
    const winner = calculateWinner(board);
    if (winner === 'X') return { score: -10 };
    if (winner === 'O') return { score: 10 };
    if (winner === 'Tie') return { score: 0 };

    if (isMaximizing) {
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          let newScore = minimax(board, depth + 1, false).score;
          board[i] = null;
          if (newScore > bestScore) {
            bestScore = newScore;
            move = i;
          }
        }
      }
      return { score: bestScore, move: move };
    } else {
      let bestScore = Infinity;
      let move;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          let newScore = minimax(board, depth + 1, true).score;
          board[i] = null;
          if (newScore < bestScore) {
            bestScore = newScore;
            move = i;
          }
        }
      }
      return { score: bestScore, move: move };
    }
  }

  function findBestMove(board) {
    let bestMove = minimax(board, 0, true).move;
    return bestMove;
  }

  function renderSquare(i) {
    return <Square onClick={() => handleClick(i)}>{board[i]}</Square>;
  }

  let status;
  if (winner) {
    status = winner === 'Tie' ? 'Tie Game!' : 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O');
  }

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div>
      <Status>{status}</Status>
      <BoardRow>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </BoardRow>
      <BoardRow>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </BoardRow>
      <BoardRow>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </BoardRow>
      <ResetButton onClick={resetBoard}>Reset</ResetButton>
    </div>
  );
}

export default TicTacToe;
