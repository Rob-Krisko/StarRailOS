import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledTaskbar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background-color: #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
`;

const StartButton = styled.button`
  background: none;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
  padding: 2px 5px;
`;

const AppIcon = styled.div`
  background-color: #ccc;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  
  &:hover {
    background-color: #bbb;
  }
`;

const Clock = styled.div`
  color: #fff;
  border-left: 1px solid #fff;
  padding-left: 10px;
`;

function Taskbar({ toggleStartMenu, openApps }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledTaskbar>
      <StartButton onClick={toggleStartMenu}>Start</StartButton>
      {openApps.map((app, index) => (
        <AppIcon key={index}>{app.name}</AppIcon>
      ))}
      <Clock>{time.toLocaleTimeString()}</Clock>
    </StyledTaskbar>
  );
}

export default Taskbar;
