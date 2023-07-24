import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskbarContext } from './TaskbarContext';
import TicTacToe from './TicTacToe';
import CounterGame from './CounterGame';
import Solitaire from './Solitaire';
import Maze from './Maze';
import Sudoku from './Sudoku';
import SnakeGame from './SnakeGame';
import ConnectFour from './ConnectFour';
import bronyaIcon from '../assets/bronya_icon.png';
import silverIcon from '../assets/silver_icon.png';
import astaIcon from '../assets/asta_icon.png';
import kafkaIcon from '../assets/kafka_icon.png';
import trailIcon from '../assets/tb.png';
import marchIcon from '../assets/march_icon.png';
import himekoIcon from '../assets/himeko_icon.png';

const GameLauncherContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
`;


const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #fff; // Make the text white

  &:hover {
    transform: scale(1.05);
  }

  width: 100%; // Set the width to 100%
  max-width: 300px; // And set a maximum width
`;



const GameIcon = styled.img`
  width: 64px;
  height: 64px;
`;

function GameLauncher() {
  const { openApp } = useContext(TaskbarContext);

  const games = [
    {
      name: "Tic Tac Toe",
      icon: bronyaIcon,
      component: <TicTacToe />
    },
    {
      name: "Counter Game",
      icon: silverIcon,
      component: <CounterGame />
    },
    {
        name: "Solitaire",
        icon: astaIcon,
        component: <Solitaire />
    },
    {
        name: "Maze",
        icon: kafkaIcon,
        component: <Maze />
    },
    {
        name: "Sudoku",
        icon: trailIcon,
        component: <Sudoku />
    },
    {
        name: "Snake Game",
        icon: marchIcon,
        component: <SnakeGame />
    },
    {
        name: "Connect Four",
        icon: himekoIcon,
        component: <ConnectFour />
    },

    // ...
    // add more games as needed
    // ...
  ];

  return (
    <GameLauncherContainer>
      {games.map((game, index) => (
        <GameCard key={index} onClick={() => openApp(game.name, game.component)}>
          <GameIcon src={game.icon} alt={game.name} />
          <p>{game.name}</p>
        </GameCard>
      ))}
    </GameLauncherContainer>
  );
}

export default GameLauncher;