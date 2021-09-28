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

router.get('/duets/:id', async (req, res) => {
    try{
        console.log(req.params.id);
        let duet = await Duet.findById(req.params.id);
        console.log(duet);
        res.status(200).send(duet);
    }catch(err){
        res.status(400).json({
            message: err
        });
    }
})

router.patch('/duets/:id', async (req, res) => {
    console.log('request received');
    console.log(req.params.id);
    console.log(req.body.name);
    try{
        let duet = await Duet.findByIdAndUpdate(req.params.id,{$set: { preference: req.body.name}}, {new: true});
        let part = await Participant.findOneAndUpdate({mobileno: req.body.name}, {$inc: {duetSize: -1}}, {new: true})
        console.log(duet);
        console.log(part);
        res.status(200).send(duet);
    }catch(err){
        res.status(400).json({
            message: err
        });
    }
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