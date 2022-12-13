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

module.exports = router;