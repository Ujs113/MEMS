const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');

router.post('/', async (req, res) => {
    const participant = new Participant({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        mobileno: req.body.mobileno,
        duetSize: req.body.duetSize
    });

    try{
        const savedPart = await participant.save();
        res.status(200).send(savedPart);
    }catch(err){
        res.status(400).json({
            message: err
        });
    }
})

router.patch('/', async (req, res) => {
    const update = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        mobileno: req.body.mobileno,
        duetSize: req.body.duetSize
    }
    try{
        const participant = await Participant.findOneAndUpdate({_id: req.body._id}, update, {new: true});
        res.status(200).send(participant);
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err
        })
    }
    

})

router.get('/', async(req, res) => {
    try{
        const participants = await Participant.find();
        res.status(200).send(participants);
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
})

router.get('/populated', async(req, res) => {
    try{
        const participants = await Participant.find().populate('soloSong').populate('duetSong');
        res.status(200).send(participants);
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
})

router.get('/:mobileno', async(req, res) => {
    var query = Participant.find({mobileno: Number(req.params.mobileno)});
    query.getFilter();
    query.exec().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send(err);
    })
})


module.exports = router;