import React, { useState } from 'react';
import Login from './login';
import SignUp from './SignUp';


function LoginRegisterToggle() {
  const [isLogin, setIsLogin] = useState('login');

  function togglePage(formName) {
    setIsLogin(formName);
    console.log("clickeed")
  }

  return (
    <div>
      {isLogin === 'login' && <Login onFormSwitch={togglePage}></Login>}
      {isLogin === 'signup' && <SignUp onFormSwitch={togglePage}></SignUp>}
    </div>
  );
}

export default LoginRegisterToggle;