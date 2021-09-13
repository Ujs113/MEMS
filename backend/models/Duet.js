const mongoose = require('mongoose');

const duetSchema = new mongoose.Schema({
    songname: String,
    artist: String,
    type: String,
    preference: Number
});

module.exports = Duet = mongoose.model('Duet', duetSchema);