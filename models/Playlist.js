const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name: String,
    tracks: [{artist: String, trackname: String}],
    user: String
},{timestamps:true});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist