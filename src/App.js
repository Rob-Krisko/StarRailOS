import React, { useState } from 'react';
import Login from './components/Login';
import Desktop from './components/Desktop';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [editorVisible, setEditorVisible] = useState(false); // Add this line

  const handleLogin = (username, password) => {
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    user 
      ? <Desktop onLogout={handleLogout} onEditorVisible={setEditorVisible} editorVisible={editorVisible}/> 
      : <Login onLogin={handleLogin} />
  );
}

export default App;
