// Game.js
import React from 'react';

const Game = ({ gameName }) => {
  return (
    <div>
      <h1>{gameName}</h1>
      <p>This is a placeholder for the {gameName} game.</p>
    </div>
  );
}

export default Game;
