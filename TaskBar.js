import React from 'react';
import { useSelector } from 'react-redux';
import TaskBarItem from './TaskBarItem';

function TaskBar() {
  const windows = useSelector(state => state.windows);

  return (
    <div>
      {windows.map(win => <TaskBarItem key={win.id} id={win.id} />)}
    </div>
  );
}

export default TaskBar;
