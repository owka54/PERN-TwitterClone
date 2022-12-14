import axios from "axios";
import { useState } from "react";

export default function Login({setAuth}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {

            const body = { username, password };

            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/user/login',
                data: body
            });

            const token = response.data.token;

            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                setAuth(true);
                window.location = '/';
            } else {
                setAuth(false);
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div id='login'>
            <h1>Login</h1>

            <form className='form' onSubmit={onFormSubmit}>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/><br />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
                <button>Submit</button>
            </form><br />
            <a href="register">Sign up now</a>
        </div>
        
    );
}