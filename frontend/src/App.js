import React, { useState, useEffect } from 'react';
import './App.css';
import FORM from './component/FORM';
import Login from './component/Login';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div>
      {isLogged ? <FORM setIsLogged={setIsLogged} /> : <Login setIsLogged={setIsLogged} />}
    </div>
  );
};

export default App;
