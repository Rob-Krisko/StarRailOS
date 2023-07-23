import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { generate, solve } from 'sudoku-umd';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: radial-gradient(circle at 50% 50%, #000000, #000b1e, #020024, #020024, #020024, #191932, #453a64, #453a64, #453a64, #453a64, #453a64, #817c9c);
`;


const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 1px solid #bbb;
  border-width: 1px 0 0 1px;
  margin-right: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.button`
  width: 35px;
  height: 35px;
  border: 1px solid #bbb;
  border-width: ${props => 
    `${props.row % 3 === 0 ? 1 : 0}px 
     ${props.col % 3 === 2 ? 1 : 0}px 
     ${props.row % 3 === 2 ? 1 : 0}px 
     ${props.col % 3 === 0 ? 1 : 0}px`
  };
  text-align: center;
  line-height: 35px;
  background: ${props => props.isOriginal ? '#ccc' : (props.isValid ? 'rgba(255, 255, 255, 0.8)' : '#f88')};
  color: #000;
  font-family: 'Orbitron', sans-serif;
`;

const InputField = styled.input`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: 30px;
  height: 30px;
  text-align: center;
  color: #000;
  font-family: 'Orbitron', sans-serif;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 20px;
  border-radius: 5px;
`;

const Timer = styled.div`
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 10px;
`;


const Sudoku = () => {
  const savedGame = JSON.parse(localStorage.getItem('sudoku'));
  const [game, setGame] = useState(savedGame?.game || []);
  const [validatedGame, setValidatedGame] = useState(game);
  const [originalGame, setOriginalGame] = useState("");
  const [elapsedTime, setElapsedTime] = useState(savedGame?.elapsedTime || 0);
  const [past, setPast] = useState(savedGame?.past || []);
  const [future, setFuture] = useState(savedGame?.future || []);
  const [inputPos, setInputPos] = useState({ top: 0, left: 0, row: -1, col: -1 });
  const [difficulty, setDifficulty] = useState(savedGame?.difficulty || 'easy');

  useEffect(() => {
    if (game.length === 0) {
      startNewGame();
    }
    const timer = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    saveGame();
  }, [game, past, future, elapsedTime]);

  useEffect(() => {
    setValidatedGame(game);
  }, [game]);

  const startNewGame = () => {
    let newGame = generate(difficulty);
    setOriginalGame(newGame);
    setGame(formatGame(newGame));
    setPast([]);
    setFuture([]);
    setElapsedTime(0); 
  }

  const formatGame = (gameString) => {
    let game = [];
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        let cell = {
          value: gameString[i * 9 + j] !== '.' ? parseInt(gameString[i * 9 + j]) : '',
          isOriginal: gameString[i * 9 + j] !== '.',
          isValid: true,
        };
        row.push(cell);
      }
      game.push(row);
    }
    return game;
  }

  const handleCellClick = (row, col, e) => {
    if (!validatedGame[row][col].isOriginal) {
      setInputPos({
        top: e.target.offsetTop,
        left: e.target.offsetLeft,
        row,
        col,
      });
    }
  }

  const handleInputChange = (e) => {
    if (e.target.value >= 0 && e.target.value <= 9) {
      setPast([...past, game]);
      setFuture([]);
      setGame((game) => {
        const newGame = _.cloneDeep(game);
        newGame[inputPos.row][inputPos.col].value = e.target.value;
        return newGame;
      });
    }
  }

  const handleInputBlur = () => {
    setInputPos({ top: 0, left: 0, row: -1, col: -1 });
  }

  const validateGrid = () => {
    console.log("Validate Grid called");
    const gameCopy = _.cloneDeep(game);
    gameCopy.forEach((row, rowIndex) => 
      row.forEach((cell, cellIndex) => {
        if (!cell.isOriginal && cell.value) {
          const rowValues = gameCopy[rowIndex].filter((c, i) => i !== cellIndex).map(c => c.value);
          const colValues = gameCopy.map((r, i) => i !== rowIndex && r[cellIndex].value);
          const squareValues = getSquareValues(rowIndex, cellIndex, gameCopy);
          const value = parseInt(cell.value, 10);
          if (value !== "" && 
            (rowValues.includes(value) ||
            colValues.includes(value) ||
            squareValues.includes(value))) {
              cell.isValid = false;
              console.log(`Invalid move at row ${rowIndex}, col ${cellIndex}`);
          } else {
              cell.isValid = true;
          }
        }
      })
    );
    setGame(gameCopy);
};

  
  
  

  const getSquareValues = (row, col, game) => {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    let values = [];
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        values.push(game[i][j].value);
      }
    }
    return values;
  }

  const checkSolution = () => {
    const currentGameString = validatedGame.flat().map(cell => cell.value || '.').join('');
    const isSolved = currentGameString.split('.').length === 1; // Check if there's no '.' in the string
    if (isSolved) {
      alert("Congratulations, you've solved the Sudoku!");
    } else {
      alert("The game is not yet solved. Keep trying!");
    }
  };

  const undo = () => {
    if (past.length !== 0) {
      setFuture([game, ...future]);
      setGame(past[past.length - 1]);
      setPast(past.slice(0, past.length - 1));
    }
  }

  const redo = () => {
    if (future.length !== 0) {
      setPast([...past, game]);
      setGame(future[0]);
      setFuture(future.slice(1));
    }
  }

  const giveHint = () => {
    const currentGameString = validatedGame.flat().map(cell => cell.value || '.').join('');
    const solution = solve(currentGameString);
    if (!solution) {
      alert("Cannot generate a hint. The current board may not be solvable.");
      return;
    }
    const unsolvedCells = [];
    validatedGame.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell.value === '' || cell.value === 0) {
          unsolvedCells.push({ row: rowIndex, col: colIndex });
        }
      })
    );
    if (unsolvedCells.length !== 0) {
      const randomCell = unsolvedCells[Math.floor(Math.random() * unsolvedCells.length)];
      const solutionValue = solution[randomCell.row * 9 + randomCell.col];
      setGame(validatedGame => {
        const gameCopy = _.cloneDeep(validatedGame);
        gameCopy[randomCell.row][randomCell.col].value = solutionValue;
        return gameCopy;
      });
    }
  }

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const saveGame = () => {
    const gameToSave = { game, past, future, elapsedTime, difficulty };
    localStorage.setItem('sudoku', JSON.stringify(gameToSave));
  }

  return (
    <Container>
      <Grid>
        {validatedGame.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell 
                key={cellIndex} 
                isOriginal={cell.isOriginal}
                isValid={cell.isValid}
                onClick={(e) => handleCellClick(rowIndex, cellIndex, e)}
                row={rowIndex}
                col={cellIndex}
              >
                {cell.value || ''}
              </Cell>
            ))}
          </Row>
        ))}
        {(inputPos.row !== -1) && (
          <InputField
            top={inputPos.top}
            left={inputPos.left}
            value={validatedGame[inputPos.row][inputPos.col].value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            autoFocus
          />
        )}
      </Grid>
      <ButtonsContainer>
        <Timer>Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Timer>
        <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="very-hard">Very Hard</option>
        </select>
        <button onClick={startNewGame}>New Game</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={validateGrid}>Check validity</button>
        <button onClick={checkSolution}>Check solution</button>
        <button onClick={giveHint}>Give hint</button>
      </ButtonsContainer>
    </Container>
  )
}

export default Sudoku;
