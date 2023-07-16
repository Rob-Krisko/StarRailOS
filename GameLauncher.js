import React, { useContext } from 'react';
import { TaskbarContext } from './TaskbarContext';
import CounterGame from './CounterGame';
import styled from 'styled-components';
import silverIcon from '../assets/silver_icon.png';

const GameLauncher = () => {
  const { openApp } = useContext(TaskbarContext);
  const games = [{ name: 'Counter Game', icon: silverIcon }]; // Add your game names here with icons

  const GameButton = styled.button`
    background-color: transparent;
    border: none;
    text-align: center;
    margin: 10px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  `;

  const GameIcon = styled.img`
    width: 100px;
    height: 100px;
  `;

  // update the switch statement with games
  const launchGame = (gameName) => {
    let gameComponent;
    switch(gameName) {
      case 'Counter Game':
        gameComponent = <CounterGame />;
        break;
      default:
        gameComponent = <div>Game not found.</div>;
    }
    openApp(gameName, gameComponent);
  }

  return (
    <div style={{backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "10px", borderRadius: "5px", color: "white"}}>
      <h1>Game Launcher</h1>
      {games.map(game => 
        <GameButton key={game.name} onClick={() => launchGame(game.name)}>
          <GameIcon src={game.icon} alt={game.name} />
          <br/>
          {game.name}
        </GameButton>
      )}
    </div>
  );
}

export default GameLauncher;
