const mongoose = require('mongoose');

const soloSchema = new mongoose.Schema({
    songname: String,
    artist: String
});

module.exports = Solo = mongoose.model('Solo', soloSchema);