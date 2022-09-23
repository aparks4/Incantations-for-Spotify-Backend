// DEPENDENCIES
const express = require('express');
const router = express.Router();
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');

// MODELS
const { Playlists } = require('../models');

// MIDDLEWARE
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

require("dotenv").config();

const {PORT, CLIENT_ID, CLIENT_SECRET} = process.env;
const client_id = CLIENT_ID;
const client_secret = CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/playlists';

// ROUTES

// playlist show route
router.get('/', (req, res) => {
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

module.exports = router;