import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [posts, setPosts] = useState([]);

  const getPosts = async (req, res) => {
    const response = await axios.get('http://localhost:5000/posts');

    setPosts(response.data);
  }


  useEffect(() => {
    getPosts();
  }, []);


  return (
    <div className="App">
      <header>
        <h1>TwitterClone</h1>
        <ul id="links">
          <li><a href="">My posts</a></li>
          <li><a href="">Login</a></li>
        </ul>
      </header>

      <div id="posts">
        <div className="post">
          <h3>Username</h3>
          <p>i ate pasta todayy</p>
        </div>
        <div className="post">
          <h3>Username</h3>
          <p>i ate pasta todayy</p>
        </div>
        {console.log(posts)}
        {posts.map((post, idx) => {
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

export default App
