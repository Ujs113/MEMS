const mongoose = require('mongoose');

const duetSchema = mongoose.Schema({
    songName: String,
    artistName: String,
    type: String,
    prefPart: String
});

module.exports = mongoose.model('Duet', duetSchema);