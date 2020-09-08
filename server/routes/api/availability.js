const express = require('express');
const router = express.Router();
const passport = require('passport');
const moment = require('moment');
const {availability2eventUI, eventUI2availability} = require('../../../utils/converters');
const Availability = require('../../models/Availability');
const ServiceUser = require('../../models/ServiceUser');
const {createDefaultAvailability} = require('../../../utils/dateutils');
const mongoose = require('mongoose');
const {isIntervalAvailable} = require('../../../utils/dateutils');
const validateAvailability = require('../../validation/availability');
const emptyPromise = require('../../../utils/promise')
moment.locale('fr');
router.get('/test', (req, res) => res.json({msg: 'Availability Works!'}));

// @Route POST /myAlfred/api/availability/addRecurrent
// add a recurrent availability for current user
// access private
router.post('/addRecurrent',passport.authenticate('jwt',{session: false}),(req,res)=> {

  const { isValid, errors } = validateAvailability(req.body, true);

  if (!isValid) {
      return res.status(400).json(errors);
  }

  const promise = req.body._id ? Availability.findOne({_id : req.body._id}) : emptyPromise(new Availability())
  promise
    .then( avail => {
      avail.user = req.user.id
      avail.period = {
        begin: req.body.startDate,
        end: req.body.endDate,
        days: req.body.days,
      }
      avail.punctuals= null
      avail.available= req.body.available
      avail.timelapses= req.body.timelapses

      avail.save()
        .then(availability => {
          res.json(availability)
        })
        .catch(err => {
          console.error(err)
          res.status(400).json(err)
        });

    })
});

// @Route POST /myAlfred/api/availability/addPunctual
// add a recurrent availability for current user
// access private
router.post('/addPunctual', passport.authenticate('jwt', {session: false}), (req, res) => {

  const { isValid, errors } = validateAvailability(req.body, false);

  if (!isValid) {
      return res.status(400).json(errors);
  }

  const newAvailability = new Availability({
    user:req.user.id,
    period: undefined,
    punctuals: Array(...req.body.punctuals),
    available: req.body.available,
    timelapses: req.body.available ? Array(...req.body.timelapses) : [],
  });

  newAvailability.save()
    .then(availability => {
      res.json(availability)
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
});

// @Route GET /myAlfred/api/availability/toEventUI
// Get converted availability to eventUI
// access public
router.get('/toEventUI', (req, res) => {
  const eventUI = createDefaultAvailability();
  res.json({avail: eventUI});
});

// @Route POST /myAlfred/api/availability/update
// update an availability for one user
// access private
router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

  const newAvailability = new Availability({user: req.user.id, ...req.body});
  newAvailability.delete()
    .then(availability => {
      availability.save()
        .then(availability => {
          res.json(availability);
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});


router.get('/userAvailabilities', (req, res) => {
  Availability.find()
    .then(availabilities => {
      res.json(availabilities);
    })
    .catch(err => {
      console.error(err);
    });
});

// @Route GET /myAlfred/api/availability/userAvailabilities/:id
// Get all availability for one user
router.get('/userAvailabilities/:id', (req, res) => {
  Availability.find({user: req.params.id})
    .then(availability => {
      res.json(availability);
    })
    .catch(err => {
      console.error(err);
    });
});

// @Route POST /myAlfred/api/availability/check
// Checks availabilities fouseravatarr serviceusers between start and end
// Returns available serviceUser ids
router.post('/check', (req, res) => {
  const start = moment(req.body.start * 1000);
  const end = moment(req.body.end * 1000);
  const serviceUserIds = req.body.serviceUsers;

  ServiceUser.find({_id: {$in: serviceUserIds.map(su => mongoose.Types.ObjectId(su))}}, 'user service')
    .then(serviceUsers => {
      Availability.find({user: {$in: serviceUsers.map(su => mongoose.Types.ObjectId(su.user))}})
        .then(availabilities => {

          var filtered = [];
          serviceUsers.forEach(su => {
            if (isIntervalAvailable(start, end, su.service, availabilities.filter(a => a.user.toString() === su.user.toString()))) {
              filtered.push(su._id);
            }
          });
          res.json(filtered);
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

// @Route GET /myAlfred/api/availability/currentAlfred
// Get all availabilities for current user
router.get('/currentAlfred', passport.authenticate('jwt', {session: false}), (req, res) => {
  Availability.find({user: req.user.id})
    .then(availability => {
      res.json(availability);
    })
    .catch(err => {
      console.error(err);
    });
});

// @Route POST /myAlfred/api/availability/home/date
// Return availability for a date
router.post('/home/date', (req, res) => {
  const allAvailability = [];
  const dateBegin = req.body.begin;
  const beginDay = req.body.beginDay;
  let newBeginDay;
  switch (beginDay) {
    case 'lundi':
      newBeginDay = beginDay.replace(beginDay, 'monday');
      break;
    case 'mardi':
      newBeginDay = beginDay.replace(beginDay, 'tuesday');
      break;
    case 'mercredi':
      newBeginDay = beginDay.replace(beginDay, 'wednesday');
      break;
    case 'jeudi':
      newBeginDay = beginDay.replace(beginDay, 'thursday');
      break;
    case 'vendredi':
      newBeginDay = beginDay.replace(beginDay, 'friday');
      break;
    case 'samedi':
      newBeginDay = beginDay.replace(beginDay, 'saturday');
      break;
    case 'dimanche':
      newBeginDay = beginDay.replace(beginDay, 'sunday');
      break;
  }
  Availability.find()
    .then(availability => {
      availability.forEach(e => {
        if (!e.period.active && e[newBeginDay].event.length) {
          allAvailability.push(e);
        } else {
          let begin = e.period.month_begin;
          let end = e.period.month_end;
          const betweenBegin = moment(dateBegin).isBetween(begin, end);
          if (betweenBegin && e[newBeginDay].event.length) {
            allAvailability.push(e);
          }
        }
      });
      res.json(allAvailability);
    })
    .catch(err => console.error(err));
});

// @Route GET /myAlfred/api/availability/all
// Get all availability for one user
router.get('/all', (req, res) => {
  Availability.find({})
    .then(availability => {
      res.json(availability);
    })
    .catch(err => {
      console.error(err);
    });
});

// @Route GET /myAlfred/api/availability/:id
// Get one availability
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Availability.findById(req.params.id)
    //.populate({path:'monday.event.services',populate:{path: 'value'}})
    //.populate({path:'tuesday.event.services',populate:{path: 'value'}})
    .then(availability => {
      res.json(availability);
    })
    .catch(err => {
      console.error(err);
    });


});

// @Route PUT /myAlfred/api/availability/:id
// edit an availability
// access private
router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

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

      fields.save().then(availability => res.json(availability)).catch(err => console.error(err));
    })
    .catch(err => console.error(err));

});


// @Route DELETE /myAlfred/api/availability/currentAlfred
// Delete all availability for one user
router.delete('/currentAlfred', passport.authenticate('jwt', {session: false}), (req, res) => {

  Availability.deleteMany({user: req.user.id})
    .then(() => {
      res.json({success: true});
    })
    .catch(err => {
      console.error(err);
    });


});

// @Route DELETE /myAlfred/api/availability/:id
// Delete one availability
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  Availability.findById(req.params.id)
    .then(availability => {
      availability.remove()
        .then(() => res.json({msg: 'Ok'}))
        .catch(error => {
          res.status(400).json({error: error})
        })
    })
    .catch(err => {
        console.error(err);
    })
});


module.exports = router;
