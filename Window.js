import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rnd } from 'react-rnd';
import { closeWindow, minimizeWindow, maximizeWindow, focusWindow } from './windowsSlice';

function Window({ id }) {
  const dispatch = useDispatch();
  const window = useSelector(state => state.windows.find(win => win.id === id));
  const [isMaximized, setIsMaximized] = useState(true); // assuming initial state as maximized

  const handleClose = () => {
    dispatch(closeWindow(id));
  }

  const handleMinimize = () => {
    dispatch(minimizeWindow(id));
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    dispatch(maximizeWindow({ id, isMaximized: !isMaximized }));
  }

  return (
    <Rnd 
      style={{ border: '1px solid #ddd', backgroundColor: '#f0f0f0' }}
      default={{
        x: 0,
        y: 0,
        width: isMaximized ? window.innerWidth : window.innerWidth / 2,
        height: isMaximized ? window.innerHeight : window.innerHeight / 2
      }}
      onDragStart={() => dispatch(focusWindow(id))}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#ddd' }}>
        <h1 style={{ margin: 0 }}>{window.title}</h1>
        <div>
          <button onClick={handleMinimize}>-</button>
          <button onClick={handleMaximize}>{isMaximized ? 'Resize' : 'Maximize'}</button>
          <button onClick={handleClose}>X</button>
        </div>
      </div>
      <div>
        {/* Window content goes here */}
      </div>
    </Rnd>
  );
}

export default Window;
