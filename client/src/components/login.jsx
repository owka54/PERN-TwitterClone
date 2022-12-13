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
                setAuth(true);
            } else {
                setAuth(false);
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button>Submit</button>
            </form>
        </>
        
    );
}