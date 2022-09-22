// DEPENDENCIES
const express = require('express');
const router = express.Router();

// MODELS
const { Playlists } = require('../models');

// ROUTES

// playlist show route
router.get('/', async (req, res) => {
    res.send('hello');
})


module.exports = router;