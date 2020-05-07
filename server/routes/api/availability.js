const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');
const {availability2eventUI, eventUI2availability} =require('../../../utils/converters');
const Availability = require('../../models/Availability');
moment.locale('fr');
router.get('/test',(req, res) => res.json({msg: 'Availability Works!'}) );


// @Route POST /myAlfred/api/availability/add
// add an availability for current user
// access private
router.post('/add',passport.authenticate('jwt',{session: false}),(req,res)=> {

    const newAvailability = new Availability({user:req.user.id, ...req.body});

    newAvailability.save().then(availability => res.json(availability)).catch(err => console.log(err));
    console.log("After adding availability:"+JSON.stringify(req.body));
});

// @Route GET /myAlfred/api/availability/toEventUI
// Get converted availability to eventUI
// access public
/* TEST ONLY
router.get('/toEventUI/:avail_id',(req,res)=> {
  const availId = req.params.avail_id

  const MODEL={
    "servicesSelected":[["Tous les services",null]],
    "selectedDateEndRecu":"2020-07-25T15:35:00.000Z",
    "recurrDays":new Set([0,1,2]),
    "services":[["Tous les services",null]],
    "selectedDateStart":"2020-05-06T05:00:00.000Z","selectedDateEnd":"2020-05-06T11:30:00.000Z",
    "selectedTimeStart":"07:00", "selectedTimeEnd":"13:30","isExpanded":"panel1"}

  const AVAIL = {
    "monday":{"event":[{"begin":"2020-05-06T05:00:00.000Z","end":"2020-05-06T11:30:00.000Z","services":[],"all_services":true}]},"tuesday":{"event":[{"begin":"2020-05-06T05:00:00.000Z","end":"2020-05-06T11:30:00.000Z","services":[],"all_services":true}]},"wednesday":{"event":[{"begin":"2020-05-06T05:00:00.000Z","end":"2020-05-06T11:30:00.000Z","services":[],"all_services":true}]},"thursday":{"event":[]},"friday":{"event":[]},"saturday":{"event":[]},"sunday":{"event":[]},"period":{"active":true,"month_begin":"2020-05-06T05:00:00.000Z","month_end":"2020-07-25T15:35:00.000Z"}}

  Availability.findById(availId)
    .then (avail => {
      const event = availability2eventUI(avail);
      const avail2 = eventUI2availability(event);
      const event2 = availability2eventUI(avail2);
      res.json({event1:event, event2:event2});
    })
    .catch (err => {
      console.error(err)
      res.json(err)
    })
});
*/

// @Route POST /myAlfred/api/availability/update
// update an availability for one user
// access private
router.post('/update',passport.authenticate('jwt',{session: false}),(req,res)=> {

    const newAvailability = new Availability({user:req.user.id, ...req.body});
    newAvailability.delete()
        .then(availability => {
          availability.save()
            .then (availability => {
              res.json(availability)
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
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
// Get all availabilities for current user
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
    console.log("Filter date received "+JSON.stringify(req.body));
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

// @Route GET /myAlfred/api/availability/all
// Get all availability for one user
router.get('/all',(req,res)=> {
  Availability.find({})
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
