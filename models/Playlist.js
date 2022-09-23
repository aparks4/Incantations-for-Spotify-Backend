const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    incantation: String,
    playlistId: String
},{timestamps:true});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist