const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    isOrganized: Boolean,
    partInfoCollected: Boolean,
    songInfoCollected: Boolean,
});

module.exports = Event = mongoose.model('Event', eventSchema);