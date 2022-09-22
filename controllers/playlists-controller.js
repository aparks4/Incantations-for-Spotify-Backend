// DEPENDENCIES
const express = require('express');
const router = express.Router();

// MODELS
const { Playlist } = require('../models');

// ROUTES

// PLAYLIST INDEX ROUTE
router.get('/', async (req, res) => {
    res.send('hello');
})

// PLAYLIST CREATE ROUTE
router.post('/', async (req, res) => {
    try {
        res.json(await Playlist.create(req.body));
    } catch (error) { 
        res.status(400).json(error);
    }
});

// PLAYLIST SHOW ROUTE
router.get("/:id", async (req, res) => {
    try {
      res.json(await Playlist.findById(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  });
        


module.exports = router;