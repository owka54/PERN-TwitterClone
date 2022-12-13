const pool = require("../db");
const router = require("express").Router();

router.get('/', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM posts');

        const posts = response.rows;

        res.send(posts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

router.post('/new', async (req, res) => {
    try {
        console.log(req.body);
        const {username, data} = req.body;
        console.log(username, data);

        const response = await pool.query('INSERT INTO posts (username, data) VALUES ($1, $2)', [username, data]);

        res.status(200).send('Posted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

module.exports = router;