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
                url: 'http://localhost:5000/user/register',
                data: body
            });

            window.location = 'login';

            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1>Register</h1>

            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button>Submit</button>
            </form>
            <a href="login">Login</a>
        </>
        
    );
}