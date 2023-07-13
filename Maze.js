import React, { useState, useEffect } from 'react';
import styles from './Maze.module.css'; // Import the CSS module

const Maze = () => {
  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1 represents a wall
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //5
    [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1], //10
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], //15
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  ];

const initialPlayerPos = { x: 1, y: 1 };
const initialEnemyPos = getRandomPosition();

  const [playerPos, setPlayerPos] = useState(initialPlayerPos);
  const [enemyPos, setEnemyPos] = useState(initialEnemyPos);
  const [gameStart, setGameStart] = useState(false);

  function getRandomPosition() {
    let x, y;
    do {
      x = Math.floor(Math.random() * maze[0].length);
      y = Math.floor(Math.random() * maze.length);
    } while (maze[y][x] !== 0); // Keep generating random positions until an empty space is found

    return { x, y };
  }

  const handleKeyPress = (event) => {
    const { key } = event;
    const { x: playerX, y: playerY } = playerPos;
    let newPlayerPos = { x: playerX, y: playerY };
    let newEnemyPos = { ...enemyPos };

    switch (key) {
      case 'ArrowUp':
        newPlayerPos = { x: playerX - 1, y: playerY };
        break;
      case 'ArrowDown':
        newPlayerPos = { x: playerX + 1, y: playerY };
        break;
      case 'ArrowLeft':
        newPlayerPos = { x: playerX, y: playerY - 1 };
        break;
      case 'ArrowRight':
        newPlayerPos = { x: playerX, y: playerY + 1 };
        break;
      default:
        return;
    }

    if (maze[newPlayerPos.y][newPlayerPos.x] !== 1) {
      setPlayerPos(newPlayerPos);
      newEnemyPos = moveEnemyTowardsPlayer(newPlayerPos, newEnemyPos);
      setEnemyPos(newEnemyPos);
    }

    if (maze[newPlayerPos.y][newPlayerPos.x] === 2) {
      alert('Congratulations! You escaped!');
      setGameStart(false);
      // Additional actions upon winning the game
    }
    if (newPlayerPos.x === newEnemyPos.x && newPlayerPos.y === newEnemyPos.y) {
      alert('Game over!');
      setGameStart(false);
    }
  };

  
  const moveEnemyTowardsPlayer = (playerPos, enemyPos) => {
    const { x: playerX, y: playerY } = playerPos;
    const { x: enemyX, y: enemyY } = enemyPos;

    const diffX = playerX - enemyX;
    const diffY = playerY - enemyY;

    let newEnemyPos = { ...enemyPos };

    if (Math.abs(diffX) > Math.abs(diffY)) {
      newEnemyPos.x += Math.sign(diffX);
    } else {
      newEnemyPos.y += Math.sign(diffY);
    }

    if (maze[newEnemyPos.y][newEnemyPos.x] !== 1) {
      return newEnemyPos;
    }

    return enemyPos;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newEnemyPos = moveEnemyTowardsPlayer(playerPos, enemyPos);
      setEnemyPos(newEnemyPos);
    }, 500); // Adjust the interval to control the enemy movement speed

    return () => clearInterval(interval);
  }, [playerPos, enemyPos, gameStart]);


  const StartingGame = () => {
    setPlayerPos(initialPlayerPos);
    setEnemyPos(initialEnemyPos);
    setGameStart(true);
  };

  const resetGame = () => {
    setPlayerPos(initialPlayerPos);
    setEnemyPos(getRandomPosition());
    setGameStart(false);
  };

  return (
    <div tabIndex="0" onKeyDown={handleKeyPress} className={styles.container}>
      {!gameStart && (
        <button onClick={StartingGame}>Start Game</button>
      )}
      {gameStart && (
        <>
          <button onClick={resetGame}>Restart</button>
          {maze.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`${styles.cell} ${
                    cell === 1 ? styles.wall : ''
                  } ${playerPos.x === columnIndex && playerPos.y === rowIndex ? styles.player : ''} ${
                    enemyPos.x === columnIndex && enemyPos.y === rowIndex ? styles.enemy : ''
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Maze;