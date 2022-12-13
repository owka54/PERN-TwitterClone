import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    // const onFormSubmit = async () => {

    // }

    return (
        <>
            <h1>Login</h1>

            <form >
                <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <input type="button" value="Submit" />
            </form>
        </>
        
    );
}