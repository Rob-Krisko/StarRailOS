import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { focusWindow, restoreWindow } from './windowsSlice';

function TaskBarItem({ id }) {
  const dispatch = useDispatch();
  const window = useSelector(state => state.windows.find(win => win.id === id));

  const handleClick = () => {
    if (window.isMinimized) {
      dispatch(restoreWindow(id));
    }
    dispatch(focusWindow(id));
  }

  return (
    <button onClick={handleClick}>
      {window.title}
    </button>
  );
}

export default TaskBarItem;
