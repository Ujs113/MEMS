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

router.patch('/:id', async (req, res) => {
    
})

router.patch('/:mobileno', async (req, res) => {
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
        $push: { duetSong: {$each: duets}},
        $inc: { duetSize: -duets.length}
    }
    const dec = {
        $inc: { duetSize: -1}
    }
    try{
        const ret = await Participant.findOneAndUpdate({mobileno: Number(req.params.mobileno)}, update, {new: true});
        for(let i = 0; i < duets.length; i++){
            const ret2 = await Participant.findOneAndUpdate({mobileno: Number(duets[i].preference)}, dec, {new: true});
            console.log(ret2);
        }
        res.status(200).send(ret);
    }catch(err){
        res.status(400).json({
            message: err
        });
    }
});

module.exports = router;