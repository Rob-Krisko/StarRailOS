import { createContext } from 'react';

export const TaskbarContext = createContext({
  openApps: [],
  restoreApp: () => {},
  closeApp: () => {},
  minimizeApp: () => {},
  maximizeApp: () => {},
  openApp: () => {}, // Add this line
});
