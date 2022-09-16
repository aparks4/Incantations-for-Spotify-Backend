const express = require('express');


const app = express();

require("dotenv").config();

const {PORT} = process.env;

// test route
app.get('/', (req, res) => {
    res.send('hello world');
})


// SERVER
app.listen(PORT, () => {
    console.log('listening on port 4000...')
})