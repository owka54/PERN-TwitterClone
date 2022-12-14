import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Root({isAuthenticated, setAuth}) {

  const [posts, setPosts] = useState([]);

  const getPosts = async (req, res) => {
    const response = await axios.get('http://localhost:5000/posts');

    setPosts(response.data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuth(false);
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
      </header>

      <div className="posts">
        {console.log(posts)}
        {posts.slice(0).reverse().map((post, idx) => {
          return (
            <div className="post" key={idx}>
              <h3>{post.username}</h3>
              <p>{post.data}</p>
            </div>
          )
        })}

      </div>
    </div>
  )
}

