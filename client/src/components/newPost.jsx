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
        <div id='new-post'>
            <h1>New post</h1>

            <form className='form' onSubmit={onFormSubmit}>
                <textarea placeholder="enter text here" required value={data} onChange={e => setData((e).target.value)}/><br /><br />
                <button>Post</button>
            </form>
        </div>
    );
}