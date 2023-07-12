import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from './Window';

const StyledDesktop = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #a8a8a8;
  overflow: hidden;
`;

function Desktop() {
  const [apps, setApps] = useState([
    { name: 'App 1', open: () => openApp('App 1', <div>App 1</div>) },
    { name: 'App 2', open: () => openApp('App 2', <div>App 2</div>) },
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

  const minimizeApp = (index) => {
    setOpenApps(openApps.map((app, i) => i === index ? { ...app, state: 'minimized' } : app));
  };

  const maximizeApp = (index) => {
    setOpenApps(openApps.map((app, i) => i === index ? { ...app, state: app.state === 'maximized' ? 'normal' : 'maximized' } : app));
  };

  const closeApp = (index) => {
    setOpenApps(openApps.filter((app, i) => i !== index));
  };

  const bringToFront = (id) => {
    setCurrentZIndex(currentZIndex + 1);
    setOpenApps(openApps.map((app) => app.id === id ? { ...app, zIndex: currentZIndex } : app));
  };

  return (
    <StyledDesktop>
      {openApps.map((app, index) => (
        <Window 
          key={app.id}
          title={app.name}
          zIndex={app.zIndex}
          onClick={() => bringToFront(app.id)}
          minimize={() => minimizeApp(index)}
          maximize={() => maximizeApp(index)}
          close={() => closeApp(index)}
        >
          {app.component}
        </Window>
      ))}
      <Taskbar toggleStartMenu={toggleStartMenu} openApps={openApps} />
      {isStartMenuOpen && <StartMenu apps={apps} />}
    </StyledDesktop>
  );
}

export default Desktop;
