import React, { useState } from 'react';
import styled from 'styled-components';

const CounterGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Orbitron', sans-serif;
  color: #0FF;
  background: #000;
  padding: 2em;
  border-radius: 5px;
`;

const Count = styled.p`
  font-size: 3em;
`;

const Button = styled.button`
  margin-top: 1em;
  padding: 1em 2em;
  background: none;
  color: #0FF;
  border: 2px solid #0FF;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0FF;
    color: #000;
  }
`;

function CounterGame() {
  const [count, setCount] = useState(0);

  return (
    <CounterGameContainer>
      <h2>Counter Game</h2>
      <Count>{count}</Count>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <Button onClick={() => setCount(0)}>Reset</Button>
    </CounterGameContainer>
  );
}

export default CounterGame;
