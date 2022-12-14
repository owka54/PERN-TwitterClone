import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import UserPosts from './userPosts';
import DeletePost from './deletePost';

export default function Root({isAuthenticated, setAuth, isAdmin, setAdmin}) {

  const [posts, setPosts] = useState([]);

  const getPosts = async (req, res) => {
    const response = await axios.get('https://twitter-clone-25th.onrender.com/posts');

    setPosts(response.data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  console.log(isAdmin);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuth(false);
    setAdmin(false);
  }

  const showUserPosts = (e) => {
    e.preventDefault();
    const user = e.target.innerText;
    console.log(user);
    window.location = `/${user}`;
  }
  

  return (
    <div className="App">
      <header>
        <h1>TwitterClone</h1>
        <ul className="links">
            <li>{isAuthenticated ? <a href='new-post'>New post</a> : null}</li>
            <li><a href="my-posts">My posts</a></li>
            <li>{!isAuthenticated ? <a href="login">Login</a> : <button onClick={e => logout(e)}>Logout</button>} </li>
        </ul>
        <div className='hamburger' onClick={() => {
          document.querySelector('.hamburger').classList.toggle('active');
          document.querySelector('.links').classList.toggle('active');
          document.querySelector('body').classList.toggle('lockScroll');
        }}>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>
      </header>

      <div className="posts">
        {console.log(isAdmin)}
        {posts.slice(0).reverse().map((post, idx) => {
          return (
            <div className="post" key={idx}>
              <h3><button className='userbtn' onClick={e => showUserPosts(e)}>{post.username}</button></h3>
              <p>{post.data}</p>
              <div className='buttons'>
                {isAdmin === true ? <DeletePost post={post} /> : null}
              </div>
              
            </div>
          )
        })}

      </div>
    </div>
  )
}

