const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');

const Booking = require('../../models/Booking');
const User = require('../../models/User');

moment.locale('fr');

router.get('/test',(req, res) => res.json({msg: 'Booking Works!'}) );

// @Route GET /myAlfred/api/booking/alfredBooking
router.get('/alfredBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userId = mongoose.Types.ObjectId(req.user.id);
    Booking.find({ alfred: userId })
        .populate('user')
        .then(alfred => {
            if (!alfred) {
                res.status(404).json({ msg: 'No booking found' })
            }

            if (alfred) {
                res.json(alfred);
            }
        })
})

router.get('/userBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userId = mongoose.Types.ObjectId(req.user.id);
    Booking.find({ user: userId })
        .populate('alfred')
        .then(alfred => {
            if (!alfred) {
                res.status(404).json({ msg: 'No booking found' })
            }

            if (alfred) {
                res.json(alfred);
            }
        })
})

router.get('/confirmPendingBookings', passport.authenticate('jwt', { session: false }), ( req, res ) => {
    const userId = mongoose.Types.ObjectId(req.user.id);
    Booking.find({ 
        $and: [
            { 
                $or: [ 
                    { 
                        user: userId 
                    }, 
                    { 
                        alfred: userId 
                    } 
                ] 
            },
            {
                status: 'Pré-approuvée'
            }
        ]
    })
    .then(booking => {
        booking.forEach(b => {
            if (!moment(b.date).isBetween(moment(b.date), moment(b.date).add(1, 'd'))) {
                Booking.findByIdAndUpdate(b._id, { status: 'Expirée' }, { new: true })
                    .then(newB => {
                        res.json(newB)
                    })
            }
        })
    })
    .catch(err => console.log(err))
})

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const random = crypto.randomBytes(Math.ceil(5/2)).toString('hex').slice(0,5);
    console.log(req.body);
    const bookingFields = {};
    bookingFields.reference = req.body.reference + '_' + random;
    bookingFields.service = req.body.service;
    bookingFields.address = req.body.address; 
    bookingFields.equipments = req.body.equipments;
    bookingFields.amount = req.body.amount;
    bookingFields.alfred = mongoose.Types.ObjectId(req.body.alfred);
    bookingFields.user = mongoose.Types.ObjectId(req.body.user);
    bookingFields.chatroom = mongoose.Types.ObjectId(req.body.chatroom);
    bookingFields.date_prestation = req.body.date_prestation;
    bookingFields.time_prestation = req.body.time_prestation;
    bookingFields.prestations = req.body.prestations;
    bookingFields.fees = req.body.fees;
    bookingFields.status = req.body.status;

    const newBooking = new Booking(bookingFields);

    newBooking.save().then(booking => res.json(booking)).catch(err => console.log(err));
})

// @Route GET /myAlfred/booking/all
// View all booking
// @Access private
router.get('/all',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Booking.find()
        .populate('alfred')
        .populate('user')
        .populate('prestation')
        .then(booking => {
            if(typeof booking !== 'undefined' && booking.length > 0){
                res.json(booking);
            } else {
                return res.status(400).json({msg: 'No booking found'});
            }
        })
        .catch(err => res.status(404).json({ booking: 'No booking found' }));



});

// @Route GET /myAlfred/booking/myBooking
// View all the booking for the current user
// @Access private
router.get('/myBooking',passport.authenticate('jwt',{session:false}),(req,res) => {
    Booking.find( {$or: [{alfred: req.user.id}, {user: req.user.id}]})
        .populate('alfred')
        .populate('user')
        .populate('prestation')
        .then(booking => {
            if(booking){
                res.json(booking);
            } else {
                return res.status(400).json({msg: 'No booking found'});
            }



        })
        .catch(err => console.log(err));

});

// @Route GET /myAlfred/api/booking/currentAlfred
// View all the booking for the current alfred
// @Access private
router.get('/currentAlfred',passport.authenticate('jwt',{session:false}),(req,res) => {
    Booking.find( {alfred: req.user.id})
        .populate('alfred')
        .populate('user')
        .populate('prestation')
        .then(booking => {
            if(booking){
                res.json(booking);
            } else {
                return res.status(400).json({msg: 'No booking found'});
            }



        })
        .catch(err => console.log(err));

});

// @Route GET /myAlfred/api/booking/last/:id
// View 3 last booking for shop page
router.get('/last/:id',(req,res) => {
    Booking.find({alfred: req.params.id},{},{sort:{'date': -1}}).limit(3)
        .populate('alfred')
        .populate('user')
        .populate('prestation')
        .populate({path:'prestation',populate:{path: 'service',select:'label'}})
        .then(booking => {
            if(booking){
                res.json(booking);
            } else {
                return res.status(400).json({msg: 'No booking found'});
            }



        })
        .catch(err => console.log(err));

});

// @Route GET /myAlfred/booking/:id
// View one booking
// @Access private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Booking.findById(req.params.id)
        .populate('alfred')
        .populate('user')
        .populate('prestation')
        .populate('equipments')
        .then(booking => {

            if(booking){
                res.json(booking);
            } else {
                return res.status(400).json({msg: 'No booking found'});
            }




        })
        .catch(err => console.log(err));


});



// @Route DELETE /myAlfred/booking/:id
// Delete one booking
// @Access private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Booking.findById(req.params.id)
        .then(message => {

            message.remove().then(() => res.json({success: true}));


        })
        .catch(err => res.status(404).json({bookingnotfound: 'No booking found'}));
});

router.put('/modifyBooking/:id', passport.authenticate('jwt', { session: false }), ( req, res ) => {
    Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
        .populate('alfred')
        .populate('user')
        .populate('prestation')
        .populate('equipments')
        .then(booking => {
            if (!booking) return res.status(404).json({msg: 'no booking found'});
            if (booking) return res.json(booking);
        })
        .catch(err => console.log(err))
})

// pattern reference
// premiere lettre nom user +  premiere lettre prenom user + premiere lettre nom alfred +  premiere lettre prenom alfred + date + 5 random
// LJBG_2242019_a5fr1




module.exports = router;
