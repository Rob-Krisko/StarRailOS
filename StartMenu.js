import React from 'react';
import styled from 'styled-components';

const StyledStartMenu = styled.div`
  position: absolute;
  bottom: 30px; // height of taskbar
  width: 200px;
  background-color: #fff;
  border: 1px solid #000;
`;

const AppItem = styled.div`
  padding: 5px;
  border-bottom: 1px solid #000; // separator line between items
  cursor: pointer; // make it look clickable

  &:hover {
    background-color: #0078D7; // change background on hover
    color: #fff; // change text color on hover
  }
`;

function StartMenu({ apps }) {
  return (
    <StyledStartMenu>
      {apps.map(app => (
        <AppItem className="app" onClick={app.open}>
          {app.name}
        </AppItem>
      ))}
    </StyledStartMenu>
  );
}

export default StartMenu;
