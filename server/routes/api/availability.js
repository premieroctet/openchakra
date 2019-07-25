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
    fields.monday.event = req.body.monday_event;
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
        .then(availability => {
            res.json(availability);
        })
        .catch(err => {
            console.log(err);
        })


});


module.exports = router;
