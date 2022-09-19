const express = require('express');

const app = express();


require("dotenv").config();

const {PORT, CLIENT_ID, CLIENT_SECRET} = process.env;
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = 'http://localhost:4000';



// test route
app.get('/', (req, res) => {
    res.send('hello world');
})







// SERVER
app.listen(PORT, () => {
    console.log('listening on port 4000...')
})