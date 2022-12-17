import Button from 'react-bootstrap/Button';
import axios from "axios";

export default function DeletePost({post}) {
    console.log(post);

    const deletePost = async (e) => {
        console.log(post.id)
        try {
            const response = await axios({
                method: 'DELETE',
                url: `https://twitter-clone-25th.onrender.com/posts/${post.id}`,
            })

            window.location = '/my-posts';
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
            <Button variant='warning' onClick={e => deletePost(e)}>Delete</Button>
    )
}