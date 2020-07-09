const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Calendar = require('../../models/Calendar');

router.get('/test',(req, res) => res.json({msg: 'Calendar Works!'}) );

//@Route POST /myAlfred/api/calendar/add
// Add a calendar
// @Access private
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res) => {

    Calendar.findOne({user: req.user.id}).then(calendar => {
       if(calendar) {
           const newEvent = {
               title : req.body.title,
               start : req.body.start,
               end : req.body.end,
               allDay :req.body.allDay
           };

           calendar.events.unshift(newEvent);
           calendar.save().then(event => res.json(event)).catch(err => console.error(err));
       } else {
           const eventField = {};
           eventField.user = req.user.id;
           const events = {


               title : req.body.title,
               start : req.body.start,
               end : req.body.end,
               allDay :req.body.allDay
           };
           eventField.events = [];
           eventField.events.unshift(events);
           const newEvent = new Calendar(eventField);

           newEvent.save().then(event => res.json(event)).catch(err => console.error(err));
       }
    });
});


// @Route GET /myAlfred/api/calendar/all
// View all calendar
router.get('/all',(req,res)=> {

    Calendar.find()
        .populate('user')
        .then(event => {
            if(typeof event !== 'undefined' && event.length > 0){
                res.json(event);
            } else {
                return res.status(400).json({msg: 'No event found'});
            }

        })
        .catch(err => res.status(404).json({ event: 'No events found' }));
});

// @Route GET /myAlfred/api/calendar/:id
// View one calendar
router.get('/:id',(req,res)=> {

    Calendar.findById(req.params.id)
        .populate('user')
        .then(event => {
            if(Object.keys(event).length === 0 && event.constructor === Object){
                return res.status(400).json({msg: 'No event found'});
            } else {
                res.json(event);
            }

        })
        .catch(err => res.status(404).json({ event: 'No event found' }));
});

// @Route DELETE /myAlfred/api/calendar/:id
// Delete one calendar
// @Access private
router.delete('/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Calendar.findById(req.params.id)
        .then(event => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            event.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ eventnotfound: 'No event found' }));
});

// @Route DELETE /myAlfred/api/calendar/event/:id
// Delete event from calendar
// @Access private
router.delete('/event/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        Calendar.findOne({ user: req.user.id })
            .then(calendar => {
                const removeIndex = calendar.events
                    .map(item => item.id)
                    .indexOf(req.params.id);

                calendar.events.splice(removeIndex, 1);


                calendar.save().then(event => res.json(event));
            })
            .catch(err => res.status(404).json(err));
    }
);


module.exports = router;
