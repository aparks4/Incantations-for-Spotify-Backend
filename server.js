const express = require('express');

const app = express();
const querystring = require('querystring');

require("dotenv").config();

const {PORT, CLIENT_ID, CLIENT_SECRET} = process.env;
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = 'http://localhost:4000';


// test route
app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});



// SERVER
app.listen(PORT, () => {
    console.log('listening on port 4000...')
})