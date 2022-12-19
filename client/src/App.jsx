import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/login'
import Root from './components/root';
import NewPost from './components/newPost';
import MyPosts from './components/myPosts';
import Register from './components/register';
import UserPosts from './components/userPosts';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  const isAuth = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://twitter-clone-25th.onrender.com/user/is-verify',
        headers: {token: localStorage.token}
      });
      console.log(response.data);

      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async (req, res) => {
    const username = localStorage.getItem('username');
    const response = await axios.get(`https://twitter-clone-25th.onrender.com/user/is-admin/${username}`);
    response.data === true ? setIsAdmin(true) : setIsAdmin(false);
  }

  const setAdmin = (boolean) => {
    setIsAdmin(boolean);
  };


  useEffect(() => {
    isAuth();
    checkAdmin();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Root isAuthenticated={isAuthenticated} setAuth={setAuth} isAdmin={isAdmin} setAdmin={setAdmin}/> } />
          <Route exact path='login' element={ isAuthenticated === false ? <Login isAuthenticated={isAuthenticated} setAuth={setAuth} /> : <Navigate to='/' />} />
          <Route exact path='register' element={ isAuthenticated === false ? <Register isAuthenticated={isAuthenticated} setAuth={setAuth}/> : <Navigate to='/'/>}/>
          <Route exact path='new-post' element={ isAuthenticated === false ? <Login isAuthenticated={isAuthenticated} setAuth={setAuth}/> : <NewPost isAuthenticated={isAuthenticated}/>} />
          <Route exact path='my-posts' element={ isAuthenticated === true ? <MyPosts isAuthenticated={isAuthenticated} setAuth={setAuth}/> : <Login isAuthenticated={isAuthenticated} setAuth={setAuth}/>}/>
          <Route path=':username' element={ <UserPosts isAuthenticated={isAuthenticated} setAuth={setAuth}/> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
