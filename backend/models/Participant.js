const mongoose = require('mongoose');
const Solo = require('./Solo');
const Duet = require('./Duet');


const participantSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    gender: String,
    mobileno: Number,
    soloSong: {type: mongoose.Schema.Types.ObjectId, ref: 'Solo'},
    duetSong: [{type: mongoose.Schema.Types.ObjectId, ref: 'Duet'}]
});

module.exports = mongoose.model('Participant', participantSchema);