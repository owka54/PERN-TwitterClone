import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/login'
import Root from './components/root';
import NewPost from './components/newPost';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const isAuth = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/user/is-verify',
        headers: {token: localStorage.token}
      });
      console.log(response.data);

      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Root isAuthenticated={isAuthenticated} setAuth={setAuth}/>} />
          <Route exact path='login' element={ isAuthenticated === false ? <Login isAuthenticated={isAuthenticated} setAuth={setAuth} /> : <Navigate to='/' />} />
          <Route exact path='new-post' element={ isAuthenticated === false ? <Login /> : <NewPost isAuthenticated={isAuthenticated}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
