import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';  
import styled, { keyframes } from 'styled-components';
import connect1 from '../assets/kafka_icon.png';
import connect2 from '../assets/silver_icon.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const GameContainer = styled.div`
  font-family: 'Orbitron', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #1a1a2e;
  color: #e0e0e0;
`;

const Board = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: flex-end;
  background: #162447;
  border-radius: 15px;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Disc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => props.color === 'red' ? `url(${connect1})` : props.color === 'yellow' ? `url(${connect2})` : 'none'};
  background-size: 130%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
`;

const AnimatedDisc = animated(Disc);

const Cell = styled.div`
  width: 70px;
  height: 70px;
  background-color: #1f4068; // Even darker blue for cells to resemble viewports
  border: 1px solid #e0e0e0; // Light grey border
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    animation: ${rotate} 2s linear infinite;
    border-color: #e43f5a;
    font-family: 'Orbitron', sans-serif;
  }
`;

const GameLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #162447; // Same color as the board
  border-radius: 15px;
  margin-left: 20px;
  min-width: 300px;
`;

const GameInfo = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: #e0e0e0;
  font-weight: bold; 
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

const Button = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  background: #1f4068;
  color: #e0e0e0;
  border: none;
  border-radius: 5px;

  &:hover {
    background: #e43f5a;
    color: #e0e0e0;
  }
`;

const PreviewCell = styled(Cell)`
  background-color: ${props => props.color ? props.color : 'transparent'};
  border: none;
  &:hover {
    background-color: ${props => props.color};
    animation: ${rotate} 2s linear infinite;
    border-color: #e43f5a; // Red color when hovering to indicate selection
  }
`;

// Convert Cell to an animated component
const AnimatedCell = animated(Cell);

const delay = ms => new Promise(res => setTimeout(res, ms));

function ConnectFour() {
  const emptyBoard = Array(6).fill().map(() => Array(7).fill(null));
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const [aiTurn, setAiTurn] = useState(false);
  const [previewCol, setPreviewCol] = useState(null);
  const [discs, setDiscs] = useState({});
  const [discToAnimate, setDiscToAnimate] = useState(null);
  const [discsToDrop, setDiscsToDrop] = useState([]);
  const [springs, setSprings] = useState({});

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
        const discId = `${color}-${col}-${row}`;
        setDiscsToDrop(discs => [
          ...discs,
          {
            id: discId,
            from: '-600px',
            to: '0px'
          }
        ]);
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

  const handleCellClick = async (col) => {
    if (winner || aiTurn) return;
    const newBoard = JSON.parse(JSON.stringify(board));
    try {
      makeMove(newBoard, col, currentPlayer);
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
      setAiTurn(true);
      await delay(500);
    } catch (e) {
      // Ignore invalid moves
    }
  };

  useEffect(() => {
    if (discsToDrop.length > 0) {
      const disc = discsToDrop[0];
      setDiscToAnimate(disc);
      setDiscsToDrop(discs => discs.slice(1));
    }
  }, [discsToDrop]);
  
  useEffect(() => {
    if (discToAnimate) {
      const { id, from, to } = discToAnimate;
      const config = { to: { top: to }, from: { top: from }, config: { duration: 500 } };
      setSprings(springs => ({ ...springs, [id]: config }));
      setDiscToAnimate(null);
    }
  }, [discToAnimate]);
  
  useEffect(() => {
    const depth = 15;  // choose a number that suits your game's performance needs
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
        makeMove(newBoard, bestMove, 'yellow');
        setBoard(newBoard);
        setCurrentPlayer('red');
        setAiTurn(false);
      }
    }
  }, [board, currentPlayer, aiTurn, setAiTurn]);

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer('red');
    setWinner(null);
    setAiTurn(false);
    setPreviewCol(null);
    setDiscs({});
  };
  
  return (
    <GameContainer>
      <GameLayout>
        <Board>
          {Array(7).fill(null).map((_, colIndex) => (
            <Column 
              key={colIndex} 
              onMouseEnter={() => setPreviewCol(colIndex)} 
              onMouseLeave={() => setPreviewCol(null)}
              onClick={() => handleCellClick(colIndex)}
            >
              <PreviewCell color={colIndex === previewCol ? currentPlayer : null}>
                <Disc color={colIndex === previewCol ? currentPlayer : null} />
              </PreviewCell>
              {board.map((row, rowIndex) => {
                const color = row[colIndex];
                const discId = `${color}-${colIndex}-${rowIndex}`;
                const spring = springs[discId] || { to: { top: '0px' }, from: { top: '0px' } };
                return (
                  <Cell key={`${colIndex}-${rowIndex}`}>
                    <AnimatedDisc
                      color={color}
                      style={spring}
                    />
                  </Cell>
                );
              })}
            </Column>
          ))}
        </Board>
        <InfoContainer>
          <GameInfo>Current Player: {currentPlayer}</GameInfo>
          {winner && <GameInfo>Winner: {winner}</GameInfo>}
          <Button onClick={resetGame}>Reset Game</Button>
        </InfoContainer>
      </GameLayout>
    </GameContainer>
  );
  
  
}

export default ConnectFour;
