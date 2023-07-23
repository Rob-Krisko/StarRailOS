import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';

const ClockWrapper = styled.div`
  font-size: 3em;
  color: #0FF;
  text-align: center;
  padding: 2em;
  border-radius: 5px;
  background: #000; 
  font-family: 'Orbitron', sans-serif;
  min-width: 400px;
`;


const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ClockWrapper>
      {format(time, 'hh:mm:ss a')}
    </ClockWrapper>
  );
};

export default Clock;
