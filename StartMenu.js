import React from 'react';
import styled from 'styled-components';

const StyledStartMenu = styled.div`
  position: absolute;
  bottom: 30px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #000;
`;

const ListItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #000;
  
  &:hover {
    background-color: #eee;
  }
`;

function StartMenu({ apps }) {
  return (
    <StyledStartMenu>
      {apps.map((app, index) => (
        <ListItem key={index} onClick={app.open}>{app.name}</ListItem>
      ))}
    </StyledStartMenu>
  );
}

export default StartMenu;
