import React, { useContext } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { TaskbarContext } from './TaskbarContext';
import windowBackground from '../space.jpg'; 

const StyledWindow = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #000;
  z-index: ${props => props.zIndex};
  width: ${props => props.state === 'maximized' ? '100vw' : 'fit-content'};
  height: ${props => props.state === 'maximized' ? 'calc(100vh - 30px)' : 'fit-content'};
  top: ${props => props.state === 'maximized' ? '0' : 'unset'};
  left: ${props => props.state === 'maximized' ? '0' : 'unset'};
  display: ${props => props.state === 'minimized' ? 'none' : 'flex'};
  flex-direction: column;
  min-width: 350px;
  min-height: 200px;
  max-width: 100vw;
  max-height: calc(100vh - 30px);
  overflow: hidden;
  background-image: url(${windowBackground});
  background-size: cover;
  background-position: center;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
  padding: 2px 5px;
  cursor: move; // Add this line to provide visual feedback to users that this area is draggable
`;

const WindowButton = styled.button`
  background: none;
  border: none;
  color: #fff;
`;

function Window({ children, title, id, zIndex, onClick, state, openApp }) {
  const { minimizeApp, maximizeApp, closeApp } = useContext(TaskbarContext);

  return (
    <Draggable handle=".handle" disabled={state === 'maximized'} position={state === 'maximized' ? {x: 0, y: 0} : null}>
      <StyledWindow zIndex={zIndex} state={state} onClick={onClick}>
        <TitleBar className="handle">
          <span>{title}</span>
          <div>
            <WindowButton onClick={(event) => { event.stopPropagation(); console.log('Minimizing:', id); minimizeApp(id); }}>-</WindowButton>
            <WindowButton onClick={(event) => { event.stopPropagation(); console.log('Maximizing:', id); maximizeApp(id); }}>[]</WindowButton>
            <WindowButton onClick={(event) => { event.stopPropagation(); console.log('Closing:', id); closeApp(id); }}>x</WindowButton>
          </div>
        </TitleBar>
        {children}
      </StyledWindow>
    </Draggable>
  );
}

export default Window;
