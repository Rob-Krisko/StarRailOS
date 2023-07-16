import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskbarContext } from './TaskbarContext';
import TicTacToe from './TicTacToe';
import CounterGame from './CounterGame';
import bronyaIcon from '../assets/bronya_icon.png';
import silverIcon from '../assets/silver_icon.png';

const GameLauncherContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-around;
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #fff; // Make the text white

  &:hover {
    transform: scale(1.05);
  }
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
    // ...
    // add more games in the same fashion as above. make sure to save icon in the assets directory and import at the top as well
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
