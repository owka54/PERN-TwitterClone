import axios from "axios";
import { useState } from "react";

export default function Register({setAuth}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {

            const body = { username, email, password };

            const response = await axios({
                method: 'POST',
                url: 'https://twitter-clone-25th.onrender.com/user/register',
                data: body
            });

            window.location = 'login';

            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div id='register'>
            <h1>Register</h1>

            <form className='form' onSubmit={onFormSubmit}>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/><br />
                <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/><br />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/><br />
                <button>Submit</button>
            </form><br />
            <a href="login">Login</a>
        </div>
        
    );
}