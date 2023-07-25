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
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: flex-end;
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

const PreviewRow = styled(Row)`
  &:hover {
    animation: ${rotate} 2s linear infinite;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;


const PreviewCell = styled(Cell)`
  background-color: ${props => props.color ? props.color : 'transparent'};
  border: none;
  &:hover {
    background-color: ${props => props.color};
    animation: ${rotate} 2s linear infinite;
  }
`;




const delay = ms => new Promise(res => setTimeout(res, ms));

function ConnectFour() {
  const emptyBoard = Array(6).fill().map(() => Array(7).fill(null));
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const [aiTurn, setAiTurn] = useState(false);
  const [previewCol, setPreviewCol] = useState(null);


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

  const isValidMove = (board, col) => {
    return board[0][col] === null;
  };

  const scorePosition = (board, player) => {
    let score = 0;
    const opponent = player === 'red' ? 'yellow' : 'red';
  
    // Calculate score for horizontal, vertical, and diagonal positions
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        // Higher score for positions closer to the center
        score += (3 - Math.abs(3 - col)) * (board[row][col] === player ? 10 : 0);
  
        // Check horizontal
        if (col < 4) {
          let horizontal = [board[row][col], board[row][col + 1], board[row][col + 2], board[row][col + 3]];
          score += evaluateLine(horizontal, player);
        }
        // Check vertical
        if (row < 3) {
          let vertical = [board[row][col], board[row + 1][col], board[row + 2][col], board[row + 3][col]];
          score += evaluateLine(vertical, player);
        }
        // Check diagonal (/)
        if (col < 4 && row >= 3) {
          let diagonalAsc = [board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]];
          score += evaluateLine(diagonalAsc, player);
        }
        // Check diagonal (\)
        if (col < 4 && row < 3) {
          let diagonalDesc = [board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]];
          score += evaluateLine(diagonalDesc, player);
        }
      }
    }
    return score;
  };

  const evaluateLine = (line, player) => {
    let score = 0;
  
    const opponent = player === 'red' ? 'yellow' : 'red';
    let countPlayer = line.filter(piece => piece === player).length;
    let countOpponent = line.filter(piece => piece === opponent).length;
    let countEmpty = line.filter(piece => piece === null).length;
  
    // Conditions for scoring based on player's pieces
    if (countPlayer === 3 && countEmpty === 1) {
      score += 100;
    } else if (countPlayer === 2 && countEmpty === 2) {
      score += 50;
    } else if (countPlayer === 1 && countEmpty === 3) {
      score += 10;
    }
  
    // Conditions for scoring based on opponent's pieces
    if (countOpponent === 3 && countEmpty === 1) {
      score -= 90;  // Opponent has a potential win, must block
    } else if (countOpponent === 2 && countEmpty === 2) {
      score -= 40;  // Opponent has a potential double-sided threat, should block
    }
  
    return score;
  };
  
  
  
    
  const minimax = (board, depth, alpha, beta, maximizingPlayer) => {
    const validColumns = [];
    for (let col = 0; col < 7; col++) {
      if (isValidMove(board, col)) {
        validColumns.push(col);
      }
    }
  
    // When at depth 0 or no valid moves are left, return the evaluated score of the board
    if (depth === 0 || validColumns.length === 0) {
      // Score the board from the AI's perspective and the player's perspective
      const aiScore = scorePosition(board, 'yellow');
      const playerScore = scorePosition(board, 'red');
      // Return the difference as the evaluated score
      return aiScore - playerScore;
    }
  
    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let col of validColumns) {
        let newBoard = [...board];
        if (isValidMove(newBoard, col)) {
          makeMove(newBoard, col, 'yellow');
          let evaluationScore = minimax(newBoard, depth - 1, alpha, beta, false);
          maxEval = Math.max(maxEval, evaluationScore);
          alpha = Math.max(alpha, evaluationScore);
          if (beta <= alpha) {
            break;  // Beta cut-off
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let col of validColumns) {
        let newBoard = [...board];
        if (isValidMove(newBoard, col)) {
          makeMove(newBoard, col, 'red');
          let evaluationScore = minimax(newBoard, depth - 1, alpha, beta, true);
          minEval = Math.min(minEval, evaluationScore);
          beta = Math.min(beta, evaluationScore);
          if (beta <= alpha) {
            break;  // Alpha cut-off
          }
        }
      }
      return minEval;
    }
  };
  


  const handleCellClick = (col) => {
    console.log('Player clicked column: ', col); // New log
    if (winner || aiTurn) return;
    const newBoard = [...board];
    try {
      makeMove(newBoard, col, currentPlayer);
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
      setAiTurn(true);  // After player makes a move, it becomes AI's turn
    } catch (e) {
      // Ignore invalid moves
    }
  };
  
  useEffect(() => {
    const depth = 7;  // choose a number that suits your game's performance needs
    const alpha = -Infinity;
    const beta = Infinity;
    const winner = checkWin();
    setWinner(winner);
    if (!winner && aiTurn) {
        let bestScore = -Infinity;
        let bestMove;
        for (let col = 0; col < 7; col++) {
          if (!isValidMove(board, col)) continue;
          let newBoard = JSON.parse(JSON.stringify(board)); // Deep copy the board
          makeMove(newBoard, col, 'yellow');  // Temporarily make the move on the new board
          let score = minimax(newBoard, depth - 1, alpha, beta, false);
          console.log(`Column: ${col}, Score: ${score}`); // Log AI progress
          if (score > bestScore) {
            bestScore = score;
            bestMove = col;
          }
        }
        if (bestMove !== undefined) {
          const newBoard = JSON.parse(JSON.stringify(board)); // Deep copy the board again
          makeMove(newBoard, bestMove, 'yellow'); // Make the best move on the real board
          console.log('AI made move in column: ', bestMove); // New log
          setBoard(newBoard);
          setCurrentPlayer('red');
        }
        setAiTurn(false);  // After AI makes a move, it's no longer AI's turn
      }
      
  }, [board, currentPlayer, aiTurn, setAiTurn]);
  
  return (
    <GameContainer>
      <Board>
        {Array(7).fill(null).map((_, colIndex) => (
          <Column key={colIndex} onMouseEnter={() => setPreviewCol(colIndex)} onMouseLeave={() => setPreviewCol(null)}>
            <PreviewCell color={colIndex === previewCol ? currentPlayer : null} />
            {[...board].map((row, rowIndex) => (
              <Cell
                key={rowIndex * 7 + colIndex}
                color={row[colIndex]}
                onClick={() => handleCellClick(colIndex)}
              />
            ))}
          </Column>
        ))}
      </Board>
      <GameInfo>Current Player: {currentPlayer}</GameInfo>
      {winner && <GameInfo>Winner: {winner}</GameInfo>}
    </GameContainer>
  );
  
}

export default ConnectFour;
