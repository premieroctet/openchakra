const express = require('express');
const router = express.Router();
const passport = require('passport');

const Availability = require('../../models/Availability');

router.get('/test',(req, res) => res.json({msg: 'Availability Works!'}) );


// @Route POST /myAlfred/api/availability/add
// add an availability for one user
// access private
router.post('/add',passport.authenticate('jwt',{session: false}),(req,res)=> {

    const fields = {};
    fields.user = req.user.id;
    fields.monday = {};
    fields.tuesday = {};
    fields.wednesday = {};
    fields.thursday = {};
    fields.friday = {};
    fields.saturday = {};
    fields.sunday = {};
    fields.monday.event = req.body.monday_event;
    fields.tuesday.event = req.body.tuesday_event;
    fields.wednesday.event = req.body.wednesday_event;
    fields.thursday.event = req.body.thursday_event;
    fields.friday.event = req.body.friday_event;
    fields.saturday.event = req.body.saturday_event;
    fields.sunday.event = req.body.sunday_event;
    fields.period = {};
    fields.period.active = req.body.active;
    fields.period.month_begin = req.body.month_begin;
    fields.period.month_end = req.body.month_end;

    const newAvailability = new Availability(fields);
    newAvailability.save().then(availability => res.json(availability)).catch(err => console.log(err));


});

// @Route GET /myAlfred/api/availability/all
// Get all availability
router.get('/all',(req,res)=> {

    Availability.find()
        .populate('services')
        .then(availability => {
            res.json(availability);
        })
        .catch(err => {
            console.log(err);
        })


});

// @Route GET /myAlfred/api/availability/currentAlfred
// Get all availability for one service
router.get('/currentAlfred',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Availability.find({user: req.user.id})
        .then(availability => {
            res.json(availability);
        })
        .catch(err => {
            console.log(err);
        })


});

// @Route GET /myAlfred/api/availability/:id
// Get one availability
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Availability.findById(req.params.id)
        //.populate({path:'monday.event.services',populate:{path: 'value'}})
        //.populate({path:'tuesday.event.services',populate:{path: 'value'}})
        .then(availability => {
            res.json(availability);
        })
        .catch(err => {
            console.log(err);
        })


});

// @Route PUT /myAlfred/api/availability/:id
// edit an availability
// access private
router.put('/:id',passport.authenticate('jwt',{session: false}),(req,res)=> {

    Availability.findById(req.params.id)
        .then(fields => {
            fields.monday.event = req.body.monday_event;
            fields.tuesday.event = req.body.tuesday_event;
            fields.wednesday.event = req.body.wednesday_event;
            fields.thursday.event = req.body.thursday_event;
            fields.friday.event = req.body.friday_event;
            fields.saturday.event = req.body.saturday_event;
            fields.sunday.event = req.body.sunday_event;
            fields.period = {};
            fields.period.active = req.body.active;
            fields.period.month_begin = req.body.month_begin;
            fields.period.month_end = req.body.month_end;

            fields.save().then(availability => res.json(availability)).catch(err => console.log(err));
        })
        .catch(err => console.log(err));

});


// @Route DELETE /myAlfred/api/availability/currentAlfred
// Delete all availability for one user
router.delete('/currentAlfred',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Availability.find({user: req.user.id})
        .then(availability => {
            availability.remove().then(() => res.json({success: true}));
        })
        .catch(err => {
            console.log(err);
        })


});

// @Route DELETE /myAlfred/api/availability/:id
// Delete one availability
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Availability.findById(req.params.id)
        .then(availability => {
            availability.remove().then(() => res.json({msg: 'Ok'})).catch(error => console.log(error))
        })
        .catch(err => {
            console.log(err);
        })


});


module.exports = router;
