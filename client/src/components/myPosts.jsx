import { useState, useEffect } from "react";
import axios from "axios";
import EditPost from "./editPost";
import Button from 'react-bootstrap/Button';
import DeletePost from "./deletePost";


export default function MyPosts({isAuthenticated, setAuth}) {

    const [posts, setPosts] = useState([]);


    const getPosts = async (req, res) => {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:5000/posts/${username}`);

        setPosts(response.data);
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setAuth(false);
      }

    useEffect(() => {
        getPosts();
  }, []);

    return (
        
        <>
            <header>
                <h1>My Posts</h1>
                <ul className="links">
                    <li>{isAuthenticated ? <a href='new-post'>New post</a> : null}</li>
                    <li><a href="/">All posts</a></li>
                    <li>{!isAuthenticated ? <a href="login">Login</a> : <button onClick={e => logout(e)}>Logout</button>} </li>
                </ul>
                <div className='hamburger' onClick={() => {
                    document.querySelector('.hamburger').classList.toggle('active');
                    document.querySelector('.links').classList.toggle('active');
                    }}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
            </header>
            <div className="posts">
            {posts.slice(0).reverse().map((post, idx) => {
            return (
                <div className="post" key={idx}>
                    <h3>{post.username}</h3>
                    <p>{post.data}</p>
                    <div className="buttons">
                        <DeletePost post={post} />
                        <EditPost post={post} />
                    </div>
                    
                </div>
            )
            })}

      </div>
        </>
    );
}