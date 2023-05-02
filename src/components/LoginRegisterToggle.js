import React, { useState, useEffect } from 'react';
import Login from './login';
import SignUp from './SignUp';
import TableMovie from './TableMovie';

const LoginRegisterToggle = () => {
  const [isLogin, setIsLogin] = useState('login');

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      setIsLogin("TableMovie");
    }
  }, []);

  const togglePage = () => {
    setIsLogin(isLogin === 'login' ? 'signup' : 'login');
  };

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    setIsLogin('movie');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLogin('login');
  };

  return (
    <div>
      {isLogin === 'login' && <Login onFormSwitch={togglePage} onLogin={handleLogin} />}
      {isLogin === 'signup' && <SignUp onFormSwitch={togglePage} onLogin={handleLogin} />}
      {isLogin === 'movie' && <TableMovie onLogout={handleLogout} />}
    </div>
  );
};



export default LoginRegisterToggle;