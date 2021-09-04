const mongoose = require('mongoose');

const soloSchema = new mongoose.Schema({
    songName: String,
    artistName: String
});

module.exports = Solo = mongoose.model('Solo', soloSchema);