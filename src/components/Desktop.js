import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import backgroundImage from './compromise.jpg';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from './Window';
import CalendarApp from './CalendarApp';
import Calculator from './Calculator';
import TaskManager from './TaskManager';
import TaskInput from './TaskInput';
import ToDoApp from './ToDoApp';
import TextEditor from './TextEditor';
import FileExplorer from './FileExplorer';
import GameLauncher from './GameLauncher';
import MusicPlayer from './MusicPlayer';
import WeatherWidget from './WeatherWidget';
import ClockApp from './ClockApp';
import Clock from './Clock';
import Alarm from './Alarm';
import { TaskbarContext } from './TaskbarContext';

const StyledDesktop = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

function appsReducer(state, action) {
  switch (action.type) {
    case 'OPEN_APP':
      return [
        ...state,
        { id: uuidv4(), name: action.name, component: action.component, state: 'normal', zIndex: state.length + 1 }
      ];
    case 'CLOSE_APP':
      return state.filter((app) => app.id !== action.id);
    case 'MINIMIZE_APP':
      return state.map((app) => app.id === action.id ? { ...app, state: 'minimized' } : app);
    case 'MAXIMIZE_APP':
      return state.map((app) => app.id === action.id ? { ...app, state: app.state === 'maximized' ? 'normal' : 'maximized' } : app);
    case 'RESTORE_APP':
      return state.map((app) => app.id === action.id ? { ...app, state: 'normal' } : app);
    default:
      throw new Error();
  }
}

function Desktop({ onLogout, onEditorVisible, editorVisible }) {
  const [apps, setApps] = useState([
    { name: 'Calculator', component: <Calculator /> },
    { name: 'Task Manager', component: <TaskManager /> },
    { name: 'To Do List', component: <ToDoApp /> },
    { name: 'Text Editor', component: <TextEditor /> },
    { name: 'File Explorer', component: <FileExplorer onEditorVisible={onEditorVisible} /> },
    { name: 'Game Launcher', component: <GameLauncher /> },
    { name: 'Music Player', component: <MusicPlayer /> },
    { name: 'Clock', component: <ClockApp /> },
  ]);

  const [openApps, dispatch] = useReducer(appsReducer, []);
  const [currentZIndex, setCurrentZIndex] = useState(0);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const openApp = (name, component) => {
    dispatch({ type: 'OPEN_APP', name, component });
  };

  const closeApp = (id) => {
    dispatch({ type: 'CLOSE_APP', id });
  };

  const minimizeApp = (id) => {
    dispatch({ type: 'MINIMIZE_APP', id });
  };

  const maximizeApp = (id) => {
    dispatch({ type: 'MAXIMIZE_APP', id });
  };

  const bringToFront = (id) => {
    setCurrentZIndex(currentZIndex + 1);
    openApps.forEach((app) => {
      if (app.id === id) {
        app.zIndex = currentZIndex + 1;
      }
    });
  };

  const restoreApp = (id) => {
    dispatch({ type: 'RESTORE_APP', id });
  };

  return (
    <TaskbarContext.Provider 
      value={{
        openApps, 
        restoreApp, 
        closeApp,
        minimizeApp, 
        maximizeApp,
        openApp
      }}
    >
      <StyledDesktop>
        {openApps.map((app, index) => (
          <Window 
            key={app.id}
            title={app.name}
            zIndex={app.zIndex}
            onClick={() => bringToFront(app.id)}
            id={app.id}
            state={app.state}
            openApp={openApp}
          >
            {app.component}
          </Window>
        ))}
        {editorVisible && 
          <Window
            title="Text Editor"
            onClick={() => bringToFront("Text Editor")}
            id={uuidv4()}
            state={'normal'}
            openApp={openApp}
          >
            <TextEditor onEditorVisible={onEditorVisible} />
          </Window>
        }
        <Taskbar toggleStartMenu={toggleStartMenu} toggleCalendar={toggleCalendar} />
        {isStartMenuOpen && <StartMenu onLogout={onLogout} toggleStartMenu={toggleStartMenu} apps={apps.map(app => ({ ...app, open: () => openApp(app.name, app.component) }))} />}
        {isCalendarOpen && <CalendarApp />} {/* Here we're using your new CalendarApp component */}
        <WeatherWidget />
      </StyledDesktop>
    </TaskbarContext.Provider>
  );
}

export default Desktop;