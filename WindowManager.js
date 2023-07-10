import React from 'react';
import { useSelector } from 'react-redux';
import Window from './Window';

function WindowManager() {
  const windows = useSelector(state => state.windows);

  return (
    <div>
      {windows.map(win => <Window key={win.id} id={win.id} />)}
    </div>
  );
}

export default WindowManager;
