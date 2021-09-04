const mongoose = require('mongoose');

const duetSchema = new mongoose.Schema({
    songName: String,
    artistName: String,
    type: String,
    prefPart: String
});

module.exports = Duet = mongoose.model('Duet', duetSchema);