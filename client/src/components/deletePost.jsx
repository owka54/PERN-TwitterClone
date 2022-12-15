import Button from 'react-bootstrap/Button';
import axios from "axios";

export default function DeletePost({post}) {
    console.log(post);

    const deletePost = async (e) => {
        console.log(post.id)
        try {
            const response = await axios({
                method: 'DELETE',
                url: `http://localhost:5000/posts/${post.id}`,
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