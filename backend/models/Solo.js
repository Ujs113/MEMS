const mongoose = require('mongoose');

const soloSchema = mongoose.Schema({
    songName: String,
    artistName: String
});

module.exports = mongoose.model('Solo', soloSchema);