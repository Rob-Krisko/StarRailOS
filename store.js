import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    windows: [
      { id: 1, title: 'Window 1' }
    ]
  };
  

// Slice
const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    openWindow: (state, action) => {
      state.windows.push({
        id: action.payload.id,
        component: action.payload.component,
        props: action.payload.props,
        minimized: false,
        maximized: false,
        position: { x: 0, y: 0 }
      });
    },
    closeWindow: (state, action) => {
      state.windows = state.windows.filter(window => window.id !== action.payload.id);
    },
    minimizeWindow: (state, action) => {
      const window = state.windows.find(window => window.id === action.payload.id);
      if (window) window.minimized = true;
    },
    maximizeWindow: (state, action) => {
      const window = state.windows.find(window => window.id === action.payload.id);
      if (window) window.maximized = !window.maximized;
    },
    setPosition: (state, action) => {
      const window = state.windows.find(window => window.id === action.payload.id);
      if (window) {
        window.position.x = action.payload.x;
        window.position.y = action.payload.y;
      }
    }
  }
});

// Actions
export const { openWindow, closeWindow, minimizeWindow, maximizeWindow, setPosition } = windowsSlice.actions;

// Store
const store = configureStore({
  reducer: windowsSlice.reducer
});

export default store;
