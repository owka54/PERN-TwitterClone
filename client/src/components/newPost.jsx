import axios from "axios";
import { useState } from "react";

export default function NewPost() {

    const [data, setData] = useState('');

    const onFormSubmit = async (e) => {

        const newPost = JSON.stringify(data);
        console.log(newPost)
        const username = localStorage.getItem('username');
        console.log(username);

        const body = {
            username,
            data
        }

        console.log(body)

        
        e.preventDefault();
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/posts/new',
                data: body
            })
            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1>New post</h1>

            <form onSubmit={onFormSubmit}>
                <input type="text" placeholder="enter text here" value={data} onChange={e => setData((e).target.value)}/>
                <button>Post</button>
            </form>
        </>
    );
}