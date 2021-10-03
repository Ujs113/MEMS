const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req,res) => {
    console.log('request received');
    const status = await Event.find();
    res.status(200).send(status);
});

router.post('/', async (req, res) => {
    const event = new Event({
        isOrganized: req.body.isOrganized,
        partInfoCollected: req.body.partInfoCollected,
        songInfoCollected: req.body.songInfoCollected
    });
    try{
        const savedEvent = await event.save();
        res.status(200).send(savedEvent);
    }catch(err){
        res.status(400).json({
            message: err
        });
    }
})

module.exports = router;