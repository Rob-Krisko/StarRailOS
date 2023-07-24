import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #000;
  color: #fff;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Cell = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => props.color ? props.color : 'white'};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    animation: ${rotate} 2s linear infinite;
  }
`;

const GameInfo = styled.div`
  margin-top: 20px;
  font-size: 24px;
`;

function ConnectFour() {
  const emptyBoard = Array(6).fill().map(() => Array(7).fill(null));
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);

  const checkWin = () => {
    // Check rows for winner
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] &&
                board[row][col] === board[row][col + 1] &&
                board[row][col] === board[row][col + 2] &&
                board[row][col] === board[row][col + 3]) {
                return board[row][col];
            }
        }
    }

    // Check columns for winner
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (board[row][col] &&
                board[row][col] === board[row + 1][col] &&
                board[row][col] === board[row + 2][col] &&
                board[row][col] === board[row + 3][col]) {
                return board[row][col];
            }
        }
    }

    // Check diagonals (bottom left to top right) for winner
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] &&
                board[row][col] === board[row - 1][col + 1] &&
                board[row][col] === board[row - 2][col + 2] &&
                board[row][col] === board[row - 3][col + 3]) {
                return board[row][col];
            }
        }
    }

    // Check diagonals (top left to bottom right) for winner
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] &&
                board[row][col] === board[row + 1][col + 1] &&
                board[row][col] === board[row + 2][col + 2] &&
                board[row][col] === board[row + 3][col + 3]) {
                return board[row][col];
            }
        }
    }

    return null;
  };

  const makeMove = (board, col, color) => {
    for (let row = 5; row >= 0; row--) {
      if (!board[row][col]) {
        board[row][col] = color;
        return;
      }
    }
    throw new Error('Invalid move');
  };
  

  const handleCellClick = (col) => {
    if (winner) return;
    const reversedBoard = [...board].reverse();
    try {
      makeMove(reversedBoard, col, currentPlayer);
      setBoard(reversedBoard.reverse());
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
    } catch (e) {
      // Ignore invalid moves
    }
  };
  

useEffect(() => {
  const winner = checkWin();
  setWinner(winner);
  if (!winner && currentPlayer === 'yellow') {
    const reversedBoard = [...board].reverse();
    while (true) {
      const col = Math.floor(Math.random() * 7);
      try {
        makeMove(reversedBoard, col, 'yellow');
        setBoard(reversedBoard.reverse());
        setCurrentPlayer('red');
        break;
      } catch (e) {
        // Ignore invalid moves and try again
      }
    }
  }
}, [board, currentPlayer]);


  return (
    <GameContainer>
        <Board>
        {[...board].reverse().map((row, i) => (
            <Row key={i}>
            {row.map((cell, j) => (
                <Cell key={j} color={cell} onClick={() => handleCellClick(j)} />
            ))}
            </Row>
        ))}
        </Board>

      <GameInfo>Current Player: {currentPlayer}</GameInfo>
      {winner && <GameInfo>Winner: {winner}</GameInfo>}
    </GameContainer>
  );
}

export default ConnectFour;
