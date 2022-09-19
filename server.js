const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();
app.use(cors())
app.use(bodyParser.json())


require("dotenv").config();

const {PORT, CLIENT_ID, CLIENT_SECRET} = process.env;
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = 'http://localhost:4000';


spotifyApi.refreshAccessToken().then(
  (data) => {
    console.log(data)

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }).catch(() => {
    res.sendStatus(400)
  })
})

// test login with user auth

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirect_uri,
    clientId: client_id,
    clientSecret: client_secret,
  })
  
  app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      redirectUri: redirect_uri,
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken
    })
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
  .catch(() => {
    res.sendStatus(400)
  })
 })





// SERVER
app.listen(PORT, () => {
    console.log('listening on port 4000...')
})
