const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');



const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




require("dotenv").config();

const {CLIENT_ID, CLIENT_SECRET} = process.env;
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
// const redirect_uri = 'https://632d4dba13263e422f1d773d--prismatic-kangaroo-4608c3.netlify.app/';
const redirect_uri = 'http://localhost:3000';
const { Playlist } = require("./models");

app.get('/', (req, res) => {
  res.send('wOoOoOooOoOoOo');
})

app.get('/login', (req, res) => {
  res.send('login page:-)')
})


app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirect_uri,
    clientId: client_id,
    clientSecret: client_secret,
  })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(err => {
        res.sendStatus(400)
    })
})

app.get('/refresh', (req, res) => {
  res.send('refresh page:-)')
})  

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      redirectUri: redirect_uri,
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken
    })

    spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(() => {
      res.sendStatus(400)
    })
  })


app.post('/', async (req, res) => {
  try {
      res.json(await Playlist.create(req.body));
  } catch (error) { 
      res.status(400).json(error);
  }
});





app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000...')
})
