const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');

const Availability = require('../../models/Availability');
moment.locale('fr');
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

router.get('/userAvailabilities', (req, res) => {
    Availability.find()
        .then(availabilities => {
            res.json(availabilities);
        })
        .catch(err => {
            console.log(err);
        })
})

// @Route GET /myAlfred/api/availability/userAvailabilities/:id
// Get all availability for one user
router.get('/userAvailabilities/:id',(req,res)=> {
    Availability.find({user: req.params.id})
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

// @Route POST /myAlfred/api/availability/filterDate
// Return availability between 2 dates
router.post('/filterDate',(req,res)=>{
    const allAvailability = [];
    const dateBegin = req.body.begin;
    const dateEnd = req.body.end;
    const beginDay = req.body.beginDay;
    const endDay = req.body.endDay;
    let newBeginDay;
    let newEndDay;
    switch (beginDay) {
        case 'lundi': newBeginDay = beginDay.replace(beginDay,'monday');break;
        case 'mardi': newBeginDay = beginDay.replace(beginDay,'tuesday');break;
        case 'mercredi': newBeginDay = beginDay.replace(beginDay,'wednesday');break;
        case 'jeudi': newBeginDay = beginDay.replace(beginDay,'thursday');break;
        case 'vendredi': newBeginDay = beginDay.replace(beginDay,'friday');break;
        case 'samedi': newBeginDay = beginDay.replace(beginDay,'saturday');break;
        case 'dimanche': newBeginDay = beginDay.replace(beginDay,'sunday');break;
    }
    switch (endDay) {
        case 'lundi': newEndDay = endDay.replace(endDay,'monday');break;
        case 'mardi': newEndDay = endDay.replace(endDay,'tuesday');break;
        case 'mercredi': newEndDay = endDay.replace(endDay,'wednesday');break;
        case 'jeudi': newEndDay = endDay.replace(endDay,'thursday');break;
        case 'vendredi': newEndDay = endDay.replace(endDay,'friday');break;
        case 'samedi': newEndDay = endDay.replace(endDay,'saturday');break;
        case 'dimanche': newEndDay = endDay.replace(endDay,'sunday');break;
    }
   Availability.find()
       .then(availability => {
           availability.forEach(e => {
               if(!e.period.active && (e[newBeginDay].event.length || e[newEndDay].event.length)){
                   allAvailability.push(e)
               } else {
                   let begin = moment(e.period.month_begin).subtract(1,'days');
                   let end = moment(e.period.month_end).add(1,'days');
                   const betweenBegin = moment(dateBegin).isBetween(begin,end);
                   const betweenEnd = moment(dateEnd).isBetween(begin,end);
                   if(betweenBegin && betweenEnd && (e[newBeginDay].event.length || e[newEndDay].event.length)){
                       allAvailability.push(e);
                   }
               }
           });
           res.json(allAvailability)
       })
       .catch(err => console.log(err));
});

// @Route POST /myAlfred/api/availability/home/date
// Return availability for a date
router.post('/home/date',(req,res)=>{
    const allAvailability = [];
    const dateBegin = req.body.begin;
    const beginDay = req.body.beginDay;
    let newBeginDay;
    switch (beginDay) {
        case 'lundi': newBeginDay = beginDay.replace(beginDay,'monday');break;
        case 'mardi': newBeginDay = beginDay.replace(beginDay,'tuesday');break;
        case 'mercredi': newBeginDay = beginDay.replace(beginDay,'wednesday');break;
        case 'jeudi': newBeginDay = beginDay.replace(beginDay,'thursday');break;
        case 'vendredi': newBeginDay = beginDay.replace(beginDay,'friday');break;
        case 'samedi': newBeginDay = beginDay.replace(beginDay,'saturday');break;
        case 'dimanche': newBeginDay = beginDay.replace(beginDay,'sunday');break;
    }
    Availability.find()
        .then(availability => {
            availability.forEach(e => {
                if(!e.period.active && e[newBeginDay].event.length ){
                    allAvailability.push(e)
                } else {
                    let begin = e.period.month_begin;
                    let end = e.period.month_end;
                    const betweenBegin = moment(dateBegin).isBetween(begin,end);
                    if(betweenBegin  && e[newBeginDay].event.length){
                        allAvailability.push(e);
                    }
                }
            });
            res.json(allAvailability)
        })
        .catch(err => console.log(err));
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

    Availability.deleteMany({user: req.user.id})
        .then(() => {
            res.json({success: true});
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
