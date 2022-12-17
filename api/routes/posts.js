const pool = require("../db");
const connection = require("../server");
const router = require("express").Router();

// router.get('/', async (req, res) => {
//     try {
//         // const response = await pool.query('SELECT * FROM posts');

//         // const posts = response.rows;

//         res.send(posts);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//     }
// }
// )
// router.get('/:username', async (req, res) => {
//     try {
//         const { username } = req.params;
//         console.log(username)
//         const response = await pool.query('SELECT * FROM posts WHERE username = $1', [username]);

//         const posts = response.rows;

//         res.send(posts);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//     }
// })

// router.post('/new', async (req, res) => {
//     try {
//         console.log(req.body);
//         const {username, data} = req.body;
//         console.log(username, data);

//         const response = await pool.query('INSERT INTO posts (username, data) VALUES ($1, $2)', [username, data]);

//         res.status(200).send('Posted');
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//     }
// })

// router.put('/:id', async (req, res) => {
//     try {
//         const { data } = req.body;
//         const { id } = req.params;
        
//         const response = await pool.query('UPDATE posts SET data = $1 WHERE id = $2', [data, id]);

//         res.status(200).send('Post edited');
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//     }
// })

// router.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);

//         const response = await pool.query('DELETE FROM posts WHERE id = $1', [id]);

//         res.status(200).send('Post deleted');
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//     }
// })

module.exports = router;