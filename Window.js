import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const StyledWindow = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #000;
  z-index: ${props => props.zIndex};
  width: ${props => props.state === 'maximized' ? '100vw' : '300px'};
  height: ${props => props.state === 'maximized' ? 'calc(100vh - 30px)' : '200px'};
  top: ${props => props.state === 'maximized' ? '0' : 'unset'};
  display: ${props => props.state === 'minimized' ? 'none' : 'block'};
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
  padding: 2px 5px;
`;

const WindowButton = styled.button`
  background: none;
  border: none;
  color: #fff;
`;

function Window({ children, title, minimize, maximize, close, zIndex, onClick, state }) {
  return (
    <Draggable disabled={state === 'maximized'}>
      <StyledWindow zIndex={zIndex} state={state} onClick={onClick}>
        <TitleBar>
          <span>{title}</span>
          <div>
            <WindowButton onClick={(event) => { event.stopPropagation(); minimize(); }}>-</WindowButton>
            <WindowButton onClick={(event) => { event.stopPropagation(); maximize(); }}>[]</WindowButton>
            <WindowButton onClick={(event) => { event.stopPropagation(); close(); }}>x</WindowButton>
          </div>
        </TitleBar>
        {children}
      </StyledWindow>
    </Draggable>
  );
}

export default Window;
