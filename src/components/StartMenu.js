import React from 'react';
import styled from 'styled-components';

const StyledMenu = styled.div`
  position: absolute;
  bottom: 30px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #000;
  z-index: 9999;
`;

const MenuItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #000;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

const LogoutButton = styled.button`
  // style the logout button as you need
`;

function StartMenu({ apps, onLogout, toggleStartMenu }) {
  const handleClick = (app) => {
    app.open();
    toggleStartMenu();
  };

  return (
    <StyledMenu>
      {apps.map((app, index) => (
        <MenuItem key={index} onClick={() => handleClick(app)}>
          {app.name}
        </MenuItem>
      ))}
      <LogoutButton onClick={onLogout}>Log out</LogoutButton>
    </StyledMenu>
  );
}

export default StartMenu;
