const pool = require("../db");
const router = require("express").Router();
const bcrypt = require("bcrypt");


router.post('/register', async (req, res) => {
    try {
        const {username, email, password } = req.body;

        // check if user already exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length != 0) {
            return res.send('Email already registered. Log in now');
        }

        // check if username already used
        const response = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (response.rows.length != 0) {
            return res.send('Username already in use, pick another');
        }

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // add user to database
        const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        res.send('User registered');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if user doesn't exist
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).send('Username or password is incorrect');
        }

        // check if input password matches database password

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).send('Username or password is incorrect');
        }

        res.send('login successful');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})


module.exports = router;
