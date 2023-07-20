import React, { useState } from 'react';

function CounterGame() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter Game</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default CounterGame;
