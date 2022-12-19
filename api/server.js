const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator");
const authorization = require("./middleware/authorization");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
app.get('/', (req, res) => {
    connection.query('SELECT * FROM posts', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    });
})
app.get('/posts', (req, res) => {
    connection.query('SELECT * FROM posts', (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    })
})
app.get('/posts/:username', (req, res) => {
    const { username } = req.params;
    console.log(username);
    connection.query(`SELECT * FROM posts WHERE username = "${username}"`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    })
})
app.post('/posts/new', (req, res) => {
    const { username, data } = req.body;
    console.log(username, data);
    connection.query(`INSERT INTO posts (username, data) VALUES ("${username}", "${data}")`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    })
})
app.put('/posts/:id', (req, res) => {
    const { data } = req.body;
    const { id } = req.params;
    connection.query(`UPDATE posts SET data = "${data}" WHERE id = "${id}"`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    })
})
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM posts WHERE id = "${id}"`, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    })
})



app.post('/user/register', async (req, res) => {
    try {
        const {username, email, password } = req.body;

        // check if user already exists with email
        const isEmail = connection.query(`SELECT * FROM users WHERE email = "${email}"`, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            if (rows.length !== 0) {
                return res.send('Email already registered. Log in now')
            }
        });
        // check if username already in use
        const isUser = connection.query(`SELECT * FROM users WHERE username = "${username}"`, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            if (rows.length !== 0) {
                return res.send('Username already in use, pick another')
            }
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // add user to database
        connection.query(`INSERT INTO users (username, email, password) VALUES ("${username}", "${email}", "${hashedPassword}")`, (err, rows, fields) => {
            if (err) throw err; 
            res.send('User registered')
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

app.post('/user/login', async (req, res) => {
    const { username, password } = req.body;

    // check if user doesn't exist
    const user = connection.query(`SELECT * FROM users WHERE username = "${username}"`, async (err, rows, fields) => {
        if (err) throw err;
        if (rows.length === 0) {
            return res.status(401).send('Username or password is incorrect');
        }
        console.log(rows[0].password);
        // check if input password matches database password

        const validPassword = await bcrypt.compare(password, rows[0].password);

        if (!validPassword) {
            return res.status(401).send('Username or password is incorrect');
        }

        const token = jwtGenerator(rows[0].username);

        res.json({ token });
    });
})

app.get('/user/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

app.get('/user/is-admin', async (req, res) => {
    const username = req.body;

    connection.query(`SELECT * FROM admin WHERE username = "${username}"`, (err, rows, fields) => {
        if (rows.length != 0) {
            res.send(true);
        } else {
            res.send(false);
        }
    })
})



// app.use('/posts', require("./routes/posts"));

// connection.end()


app.listen(5000, () => console.log('server listening on port 5000'));


// app.use('/user', require("./routes/users"));
