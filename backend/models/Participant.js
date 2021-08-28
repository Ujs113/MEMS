const mongoose = require('mongoose');

const participantSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    gender: String,
    mobileno: Number
});

module.exports = mongoose.model('Participant', participantSchema);