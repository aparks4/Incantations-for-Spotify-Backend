const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');
const playlistController = require('./controllers/playlists-controller');


const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/playlists', playlistController);


require("dotenv").config();

const {PORT, CLIENT_ID, CLIENT_SECRET} = process.env;
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000';
const { Playlist } = require("./models/Playlist");


// test login with user auth

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






// SERVER
app.listen(PORT, () => {
    console.log('listening on port 4000...')
})
