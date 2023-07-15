import React, { useState } from 'react';
import Login from './components/Login';
import Desktop from './components/Desktop';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

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
      ? <Desktop onLogout={handleLogout} /> 
      : <Login onLogin={handleLogin} />
  );
}

export default App;
