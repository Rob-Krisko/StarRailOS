import React from 'react';
import { Provider } from 'react-redux';
import TaskBar from './TaskBar';
import WindowManager from './WindowManager';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <WindowManager />
        <TaskBar />
      </div>
    </Provider>
  );
}

export default App;
