const express = require('express');
const router = express.Router();
const Solo = require('../models/Solo');
const Duet = require('../models/Duet');
const Participant = require('../models/Participant');

router.get('/solos', async(req, res) => {
    try{
        const solos = await Solo.find();
        res.status(200).send(solos);
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
});

router.get('/duets', async(req, res) => {
    try{
        const duets = await Duet.find();
        res.status(200).send(duets);
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
});


router.patch('/:mobileno', async (req, res) => {
    console.log("request received");
    const solo = new Solo(req.body.solosong);
    let duets;
    try{
        await solo.save();
        duets = await Duet.create(req.body.duetsong);
    }catch(err){
        console.log(err);
    }
    const update = {
        $set: { soloSong: solo},
        $push: {duetSong: {$each: duets}}
    }
    try{
        const ret = await Participant.findOneAndUpdate({mobileno: Number(req.params.mobileno)}, update, {new: true});
        res.status(200).send(ret);
    }catch(err){
        res.status(400).json({
            message: err
        });
    }
});

module.exports = router;