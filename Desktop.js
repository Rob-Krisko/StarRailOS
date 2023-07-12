import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import backgroundImage from './osBG.jpg'; // change the path to your actual image
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from './Window';

const StyledDesktop = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover; // this will ensure your image covers the entire element
  background-position: center; // this centers the image
  overflow: hidden;
`;


function Desktop() {
  const [apps, setApps] = useState([
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
    setOpenApps(openApps.map((app) => app.id === id ? { ...app, zIndex: currentZIndex } : app));
  };

  const restoreApp = (id) => {
    setOpenApps(openApps.map((app) => app.id === id ? { ...app, state: 'normal' } : app));
  };

  return (
    <StyledDesktop>
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
