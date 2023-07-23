import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import snakeHead from '../assets/snake-head.png';
import snakeBody from '../assets/snake-body.png';
import foodImg from '../assets/food.png';

const StyledSnakeGameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: #f5f5f5;
  height: auto;
`;

const StyledSnakeGameBoard = styled.div`
  position: relative;
  margin: 0 auto;
  border: 1px solid #000;
  background-color: #000;
  width: ${(props) => `${props.boardSize * props.cellSize}px`};
  height: ${(props) => `${props.boardSize * props.cellSize}px`};
`;

const StyledSnakeGameCell = styled.div`
  position: absolute;
  width: ${(props) => `${props.cellSize}px`};
  height: ${(props) => `${props.cellSize}px`};
  left: ${(props) => `${props.x * props.cellSize}px`};
  top: ${(props) => `${props.y * props.cellSize}px`};
`;

const StyledSnakeGameFood = styled(StyledSnakeGameCell)`
  background-image: url(${foodImg});
  background-size: cover;
`;

const StyledSnakeHead = styled(StyledSnakeGameCell)`
  background-image: url(${snakeHead});
  background-size: cover;
`;

const StyledSnakeBody = styled(StyledSnakeGameCell)`
  background-image: url(${snakeBody});
  background-size: cover;
`;

const StyledGameStart = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  button {
    font-size: 18px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const StyledGameOver = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  button {
    font-size: 18px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const GameStart = ({ onStart }) => (
  <StyledGameStart>
    <h1>Snake Game</h1>
    <button onClick={onStart}>Start Game</button>
  </StyledGameStart>
);

const GameOver = ({ onRestart, newHighScore, score }) => (
  <StyledGameOver>
    <h1>Game Over</h1>
    {newHighScore && <p>New High Score: {score}</p>}
    <button onClick={onRestart}>Restart</button>
  </StyledGameOver>
);

const SnakeGame = () => {
  const boardSize = 25;
  const cellSize = 25;

  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });  
  const [direction, setDirection] = useState('right');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameStarted === false && !gameOver) {
      const interval = setInterval(moveSnake, 200);
      return () => clearInterval(interval);
    }
  }, [snake, gameOver, gameStarted]);

  const generateFood = () => {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);
    while (snake.some(cell => cell.x === x && cell.y === y)) {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    }
    return { x, y };
  };
  

  const checkCollision = (head) => {
    return head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snake.some(cell => cell.x === head.x && cell.y === head.y);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[newSnake.length - 1] };

    switch (direction) {
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      default:
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setSnake((prevSnake) => [...prevSnake, {}]);
      setScore(prevScore => prevScore + 1);
    } else {
      newSnake.shift();
    }

    newSnake.push(head);
    setSnake(newSnake);
  };

  const handleKeyPress = (e) => {
    if (gameOver) return;

    e.preventDefault();
    const { key } = e;
    if (key === 'ArrowUp' && direction !== 'down') setDirection('up');
    if (key === 'ArrowDown' && direction !== 'up') setDirection('down');
    if (key === 'ArrowLeft' && direction !== 'right') setDirection('left');
    if (key === 'ArrowRight' && direction !== 'left') setDirection('right');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <StyledSnakeGameContainer>
      <div className="current-score">Score: {score}</div>
      <StyledSnakeGameBoard
        boardSize={boardSize}
        cellSize={cellSize}
      >
        {snake.map((cell, index) => {
          if (index === snake.length - 1) {
            return (
              <StyledSnakeHead
                key={index}
                cellSize={cellSize}
                x={cell.x}
                y={cell.y}
              />
            );
          } else {
            return (
              <StyledSnakeBody
                key={index}
                cellSize={cellSize}
                x={cell.x}
                y={cell.y}
              />
            );
          }
        })}
        <StyledSnakeGameFood
          cellSize={cellSize}
          x={food.x}
          y={food.y}
        />
        {gameStarted === null && (
          <GameStart onStart={() => setGameStarted(false)} />
        )}
        {gameOver && (
          <GameOver
            onRestart={() => {
              setSnake([{ x: 2, y: 2 }]);
              setFood({ x: 5, y: 5 });
              setDirection('right');
              setGameOver(false);
              setGameStarted(false);
              setScore(0);
            }}
            newHighScore={score > 0 /* Assuming 0 is the lowest score */}
            score={score}
          />
        )}
      </StyledSnakeGameBoard>
    </StyledSnakeGameContainer>
  );
};

export default SnakeGame;
