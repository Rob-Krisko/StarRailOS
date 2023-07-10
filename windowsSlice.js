import { createSlice } from '@reduxjs/toolkit';

const windowsSlice = createSlice({
  name: 'windows',
  initialState: [
    { id: 1, title: 'Window 1', isFocused: true, isMinimized: false, isMaximized: true }
  ],
  reducers: {
    openWindow: (state, action) => {
      // logic for opening a new window
    },
    closeWindow: (state, action) => {
      // logic for closing a window
      return state.filter(win => win.id !== action.payload);
    },
    minimizeWindow: (state, action) => {
      // logic for minimizing a window
      const window = state.find(win => win.id === action.payload);
      if (window) window.isMinimized = true;
    },
    restoreWindow: (state, action) => {
      // logic for restoring a minimized window
      const window = state.find(win => win.id === action.payload);
      if (window) window.isMinimized = false;
    },
    maximizeWindow: (state, action) => {
      // logic for maximizing or resizing a window
      const window = state.find(win => win.id === action.payload.id);
      if (window) window.isMaximized = action.payload.isMaximized;
    },
    focusWindow: (state, action) => {
      // logic for focusing a window
      state.forEach(win => {
        win.isFocused = win.id === action.payload;
      });
    },
  },
});

export const { openWindow, closeWindow, minimizeWindow, restoreWindow, maximizeWindow, focusWindow } = windowsSlice.actions;

export default windowsSlice.reducer;
