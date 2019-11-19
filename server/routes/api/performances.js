const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');

const Booking = require('../../models/Booking');
const User = require('../../models/User');

moment.locale('fr');

router.get('/test',(req, res) => res.json({msg: 'Performances Works!'}) );


// @Route GET /myAlfred/performances/incomes/:year
// Get booking per year
// @Access private
router.get('/incomes/:year',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const year = req.params.year;
    const bookings = [];
    const january = [];
    const february = [];
    const march = [];
    const april = [];
    const may = [];
    const june = [];
    const july = [];
    const august = [];
    const september = [];
    const october = [];
    const november = [];
    const december = [];
    Booking.find({alfred: req.user.id,status:'Terminée'})
        .then(booking => {

                booking.forEach(b => {
                    const date = b.date_prestation.slice(6,10);
                    if(date === year){
                        const month = b.date_prestation.slice(3,5);
                        switch (month) {
                            case '01' : january.push(b);break;
                            case '02' : february.push(b);break;
                            case '03' : march.push(b);break;
                            case '04' : april.push(b);break;
                            case '05' : may.push(b);break;
                            case '06' : june.push(b);break;
                            case '07' : july.push(b);break;
                            case '08' : august.push(b);break;
                            case '09' : september.push(b);break;
                            case '10' : october.push(b);break;
                            case '11' : november.push(b);break;
                            case '12' : december.push(b);break;
                        }
                    }
                        bookings.push(january,february,march,april,may,june,july,august,september,october,november,december)
                });
                res.json(bookings)

        })
        .catch(err => res.status(404).json({ booking: 'No booking found' }));



});


// @Route GET /myAlfred/performances/incomes/totalComing/:yeay
// Get coming income per year
// @Access private
router.get('/incomes/totalComing/:year',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const year = req.params.year;
    let total = 0;
    Booking.find({alfred: req.user.id,status:'Confirmée'})
        .then(booking => {

            booking.forEach(b => {
                const date = b.date_prestation.slice(6,10);
                if(date === year){
                    total += b.amount
                }

            });
            res.json(total)

        })
        .catch(err => res.status(404).json({ booking: 'No booking found' }));
});












module.exports = router;
