import { Fragment, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

export default function EditPost({post}) {
    console.log(post.id)

    const [data, setData] = useState(post.data);

    // edit post function
    const updatePost = async (e) => {
        e.preventDefault();
        try {
            console.log(data);

            const body = {
                data
            }

            const response = await axios({
                method: 'PUT',
                url: `http://localhost:5000/posts/${post.id}`,
                data: body
            });
            window.location = '/my-posts';
        } catch (err) {
            console.error(err.message);
        }
    }

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <Fragment>
            <Button variant='primary' onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Edit Post
                </Modal.Header>

                <Modal.Body>
                    <textarea value={data} autoFocus onChange={(e) => setData(e.target.value)}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={e => updatePost(e)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
        
    )
}