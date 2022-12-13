const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => console.log('server listening on port 5000'));

app.use('/posts', require("./routes/posts"));

app.use('/user', require("./routes/users"));