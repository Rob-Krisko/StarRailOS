import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from './osBG.jpg';
import { v4 as uuidv4 } from 'uuid';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from './Window';
import Calculator from './Calculator';
import WeatherWidget from './WeatherWidget';

const StyledDesktop = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

function Desktop() {
  const [apps, setApps] = useState([
    { name: 'Calculator', component: <Calculator /> },
    { name: 'App 1', component: <div>App 1</div> },
    { name: 'App 2', component: <div>App 2</div> },
  ]);

  const [openApps, setOpenApps] = useState([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentZIndex, setCurrentZIndex] = useState(0);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const openApp = (name, component) => {
    setOpenApps([...openApps, { id: uuidv4(), name, component, state: 'normal', zIndex: currentZIndex + 1 }]);
    setCurrentZIndex(currentZIndex + 1);
  };

  const minimizeApp = (id) => {
    setOpenApps(openApps.map((app) => app.id === id ? { ...app, state: 'minimized' } : app));
  };

  const maximizeApp = (id) => {
    setOpenApps(openApps.map((app) => app.id === id ? { ...app, state: app.state === 'maximized' ? 'normal' : 'maximized' } : app));
  };

  const closeApp = (id) => {
    setOpenApps(openApps.filter((app) => app.id !== id));
  };

  const bringToFront = (id) => {
    setCurrentZIndex(currentZIndex + 1);
    setOpenApps(openApps.map((app) => app.id === id ? { ...app, zIndex: currentZIndex + 1 } : app));
  };

  const restoreApp = (id) => {
    setOpenApps(openApps.map((app) => app.id === id ? { ...app, state: 'normal' } : app));
    setCurrentZIndex(currentZIndex + 1);
  };

  return (
    <StyledDesktop>
      <WeatherWidget />
      {openApps.map((app, index) => (
        <Window 
          key={app.id}
          title={app.name}
          zIndex={app.zIndex}
          onClick={() => bringToFront(app.id)}
          minimize={() => minimizeApp(app.id)}
          maximize={() => maximizeApp(app.id)}
          close={() => closeApp(app.id)}
          state={app.state}
        >
          {app.component}
        </Window>
      ))}
      <Taskbar toggleStartMenu={toggleStartMenu} openApps={openApps} restoreApp={restoreApp} />
      {isStartMenuOpen && <StartMenu apps={apps.map(app => ({ ...app, open: () => openApp(app.name, app.component) }))} />}
    </StyledDesktop>
  );
}

export default Desktop;
