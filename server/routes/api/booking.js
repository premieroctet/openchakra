const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');

const Booking = require('../../models/Booking');
const User = require('../../models/User');


router.get('/test',(req, res) => res.json({msg: 'Booking Works!'}) );

// @Route POST /myAlfred/booking/add
// Add a booking
// @Access private
router.post('/add',passport.authenticate('jwt',{session: false}), (req,res,) => {
    const idUser = req.user.id;
    const idAlfred = mongoose.Types.ObjectId(req.body.alfred);

    let reference;
    Promise.all([User.findById(idUser),User.findById(idAlfred)])
        .then(([user,alfred]) => {
            let name= user.name;
            let firstLetterNameUser = name.charAt(0).toUpperCase();
            let firstname = user.firstname;
            let firstLetterFirstnameUser = firstname.charAt(0).toUpperCase();

            let nameAlfred = alfred.name;
            let firstLetterNameAlfred = nameAlfred.charAt(0).toUpperCase();
            let firstnameAlfred = alfred.firstname;
            let firstLetterFirstnameAlfred = firstnameAlfred.charAt(0).toUpperCase();

            const letter = firstLetterNameUser + firstLetterFirstnameUser + firstLetterNameAlfred + firstLetterFirstnameAlfred;
            const day = new Date().getDate();
            const month = new Date().getMonth();
            const year = new Date().getFullYear();

            const random = crypto.randomBytes(Math.ceil(5/2)).toString('hex').slice(0,5);

            reference = letter + '_' + day+month+year + '_' + random;

            const bookingFields = {};
            bookingFields.amount = req.body.amount;
            bookingFields.alfred = mongoose.Types.ObjectId(req.body.alfred);
            bookingFields.user = req.user.id;
            bookingFields.prestation = mongoose.Types.ObjectId(req.body.prestation);

            bookingFields.date_prestation = {};
            bookingFields.date_prestation.beginning = req.body.beginning;
            bookingFields.date_prestation.end = req.body.end;
            bookingFields.reference = reference;


            const newBooking = new Booking(bookingFields);

            newBooking.save().then(booking=> res.json(booking)).catch(err => console.log(err));

        });

});

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

// @Route GET /myAlfred/booking/user
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

// @Route GET /myAlfred/booking/:id
// View one booking
// @Access private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Booking.findById(req.params.id)
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

// pattern reference
// premiere lettre nom user +  premiere lettre prenom user + premiere lettre nom alfred +  premiere lettre prenom alfred + date + 5 random
// LJBG_2242019_a5fr1




module.exports = router;
