const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');
const axios = require('axios');

const Booking = require('../../models/Booking');
const User = require('../../models/User');
const CronJob = require('cron').CronJob;
const mangopay = require('mangopay2-nodejs-sdk');

moment.locale('fr');

const api = new mangopay({
    clientId: 'test-myalfred-haus',
    clientApiKey: 'Zcx9oZKnBBL31AEugBNrn13n6URvrSqtXCykH3ejBdDSmOYPU1',

});

router.get('/test',(req, res) => res.json({msg: 'Booking Works!'}) );

// @Route GET /myAlfred/api/booking/alfredBooking
router.get('/alfredBooking', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userId = mongoose.Types.ObjectId(req.user.id);
    Booking.find({ alfred: userId })
        .sort([["date", -1]])
        .populate('user',['name','firstname','picture'])
        .populate('chatroom')
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
        .sort([["date", -1]])
        .populate('alfred','-id_card')
        .populate({
            path: 'chatroom',
            populate: { path: 'emitter' }
        })
        .populate({
            path: 'chatroom',
            populate: { path: 'recipient' }
        })
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

router.get('/endConfirmedBookings', passport.authenticate('jwt', { session : false }), ( req, res ) => {
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
                status: 'Confirmée'
            }
        ]
    })
    .then(booking => {
        booking.forEach(b => {
            const date = moment(b.end_date, 'YYYY-MM-DD').toDate();
            const hourNow = new Date().getHours();

            const hourBooking = parseInt(b.end_time.slice(0,2));
            if (moment().isAfter(date)) {

                if (hourNow >= hourBooking) {

                    Booking.findByIdAndUpdate(b._id, { status: 'Terminée' }, { new: true })
                        .then(newB => {
                            res.json(newB);
                        })
                }
            }
        })
    })   
})

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const random = crypto.randomBytes(Math.ceil(5/2)).toString('hex').slice(0,5);

    const bookingFields = {};
    bookingFields.reference = req.body.reference + '_' + random;
    bookingFields.service = req.body.service;
    if (req.body.option) bookingFields.option = req.body.option;
    bookingFields.address = req.body.address; 
    bookingFields.equipments = req.body.equipments;
    bookingFields.amount = req.body.amount;
    bookingFields.alfred = mongoose.Types.ObjectId(req.body.alfred);
    bookingFields.user = mongoose.Types.ObjectId(req.body.user);
    bookingFields.chatroom = mongoose.Types.ObjectId(req.body.chatroom);
    bookingFields.date_prestation = req.body.date_prestation;
    bookingFields.time_prestation = moment('1970-01-01 '+req.body.time_prestation);
    bookingFields.prestations = req.body.prestations;
    bookingFields.fees = req.body.fees;
    bookingFields.status = req.body.status;
    bookingFields.serviceUserId = req.body.serviceUserId;

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
    Booking.find({alfred: req.params.id,status:'Terminée'},{},{sort:{'date': -1}}).limit(3)
        .populate('alfred','-id_card')
        .populate('user','-id_card')
        .populate('prestation')
        .populate({path:'prestation',populate:{path: 'service'}})
        .then(booking => {
            if(booking){
                res.json(booking);
            } else {
                return res.status(400).json({msg: 'No booking found'});
            }



        })
        .catch(err => console.log(err));

});

// GET /myAlfred/api/booking/getPaid
// Get all booking paid for an alfred
// @access private
router.get('/getPaid',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Booking.find({alfred: req.user.id, paid:true})
        .populate('user','-id_card')
        .then(booking => {
            res.json(booking)
        })
        .catch(err => console.log(err))
});

// GET /myAlfred/api/booking/getPaidSoon
// Get all booking paid soon for an alfred
// @access private
router.get('/getPaidSoon',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Booking.find({alfred: req.user.id, paid:false, status: 'Confirmée'})
        .populate('user','-id_card')
        .then(booking => {
            res.json(booking)
        })
        .catch(err => console.log(err))
});

// GET /myAlfred/api/booking/account/paid
// Get all booking paid  for a user
// @access private
router.get('/account/paid',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Booking.find({user: req.user.id, paid:true})
        .populate('alfred','-id_card')
        .then(booking => {
            res.json(booking)
        })
        .catch(err => console.log(err))
});

// GET /myAlfred/api/booking/account/paidSoon
// Get all booking paid soon for a user
// @access private
router.get('/account/paidSoon',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Booking.find({user: req.user.id, paid:false,status: 'Confirmée'})
        .populate('alfred','-id_card')
        .then(booking => {
            res.json(booking)
        })
        .catch(err => console.log(err))
});

// @Route GET /myAlfred/booking/:id
// View one booking
// @Access private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Booking.findById(req.params.id)
        .populate('alfred','-id_card')
        .populate('user','-id_card')
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
    const obj = { status: req.body.status };
    if (req.body.end_date) obj.end_date = req.body.end_date;
    if (req.body.end_time) obj.end_time = req.body.end_time;

    Booking.findByIdAndUpdate(req.params.id, obj, { new: true })
        .populate('alfred')
        .populate('user')
        .populate('prestation')
        .populate('equipments')
        .then(booking => {
            if (!booking) return res.status(404).json({msg: 'no booking found'});
            if (booking) return res.json(booking);
        })
        .catch(err => console.log(err))
});

function getAccount(id){
    const allAccount = [];
    api.Users.getBankAccounts(id)
                .then(accounts => {
                    accounts.forEach(a => {
                        if(a.Active){
                            allAccount.push(a)
                        }
                    });
                    return allAccount;
                })

}

/*new CronJob('0 0 5 * * *', function() {
    const date = moment(new Date(), 'DD-MM-YYYY').startOf('day');
    Booking.find({status: 'Confirmée',paid:false})
        .populate('user')
        .populate('alfred')
        .then(booking => {
            booking.forEach(b => {
                const end_date = moment(b.end_date, 'DD-MM-YYYY').add(1, 'days').startOf('day');
                if(moment(date).isSameOrAfter(end_date)){
                   b.status = 'Terminée';
                   b.save().then().catch();
                   const amount = b.amount;
                   const id_mangopay_user = b.user.id_mangopay;
                   const id_mangopay_alfred = b.alfred.id_mangopay;


                    api.Users.getWallets(id_mangopay_user)
                        .then(wallets => {
                            const wallet_id = wallets[0].Id;
                            api.Users.getWallets(id_mangopay_alfred)
                                .then(wallet_alfred => {
                                    const id_wallet_alfred = wallet_alfred[0].Id;
                                    api.Transfers.create({
                                        AuthorId: id_mangopay_user,
                                        DebitedFunds: {
                                            Currency: 'EUR',
                                            Amount: amount
                                        },
                                        Fees: {
                                            Currency: "EUR",
                                            Amount: 0
                                        },
                                        DebitedWalletId: wallet_id,
                                        CreditedWalletId: id_wallet_alfred,

                                    })
                                        .then(()=>{
                                                const accountAlfred = getAccount(id_mangopay_alfred);
                                                api.PayOuts.create({
                                                    AuthorId: id_wallet_alfred,
                                                    DebitedFunds: {
                                                        Currency: "EUR",
                                                        Amount: amount
                                                    },
                                                    Fees: {
                                                        Currency: "EUR",
                                                        Amount: 0
                                                    },
                                                    BankAccountId: accountAlfred[0].Id,
                                                    DebitedWalletId: id_wallet_alfred,
                                                    BankWireRef: "My Alfred"

                                                })
                                                    .then(()=> {
                                                        b.paid = true;
                                                        b.date_payment = moment()
                                                        b.save().then().catch();
                                                    })
                                        }

                                        )
                                })

                        })

                }
            })
        })

}, null, true, 'Europe/Paris');*/

new CronJob('0 0 5 * * *', function() {
    const date = moment(new Date(), 'DD-MM-YYYY').startOf('day');
    Booking.find({status: 'Confirmée',paid:false})
        .populate('user')
        .populate('alfred')
        .then(booking => {
            booking.forEach(b => {
                const end_date = moment(b.end_date, 'DD-MM-YYYY').add(1, 'days').startOf('day');
                if (moment(date).isSameOrAfter(end_date)) {

                    b.status = 'Terminée';
                    b.paid = true;
                    b.date_payment = moment();
                    b.save().then().catch();
                }
            })
        })


}, null, true, 'Europe/Paris');

new CronJob('0 0 6 * * *', function() {
    const currentDate = moment(new Date(), 'DD-MM-YYYY').startOf('day');
    Booking.find({status: 'En attente de confirmation'})
        .populate('user')
        .populate('alfred')
        .then(booking => {
            booking.forEach(b => {
                const date = moment(b.date).add(2,'days');
                const newDate = moment(date, 'DD-MM-YYYY').startOf('day');
                if(moment(currentDate).isSameOrAfter(newDate)){
                    b.status = 'Expirée';
                    b.save().then().catch();
                }
            })
        })

}, null, true, 'Europe/Paris');


// pattern reference
// premiere lettre nom user +  premiere lettre prenom user + premiere lettre nom alfred +  premiere lettre prenom alfred + date + 5 random
// LJBG_2242019_a5fr1




module.exports = router;
