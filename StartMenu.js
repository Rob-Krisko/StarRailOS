import React from 'react';
import styled from 'styled-components';
import dummyIcon from '../assets/dummy.png';

const StyledMenu = styled.div`
  position: absolute;
  bottom: 30px;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 3px solid #800020; // Wine red border
  z-index: 9999;
  color: #fff; 
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #800020; // Wine red border
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); 
  }
`;

const LogoutButton = styled.button`
  padding: 10px;
  background: none;
  border: none;
  color: #fff; 
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); 
  }
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
          <img src={dummyIcon} alt="app-icon" width={30} height={30} />
          {app.name}
        </MenuItem>
      ))}
      <LogoutButton onClick={onLogout}>Log out</LogoutButton>
    </StyledMenu>
  );
}

export default StartMenu;
