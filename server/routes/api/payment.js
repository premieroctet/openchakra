const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/User');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const mangopay = require('mangopay2-nodejs-sdk');
const request = require('request');
moment.locale('fr');

const api = new mangopay({
    clientId: 'test-myalfred-haus',
    clientApiKey: 'Zcx9oZKnBBL31AEugBNrn13n6URvrSqtXCykH3ejBdDSmOYPU1',

});


router.get('/test',(req, res) => res.json({msg: 'Payment Works!'}) );

// POST /myAlfred/api/payment/createUser
// Create a user and a wallet
// @access private
router.post('/createUser',passport.authenticate('jwt',{session:false}),(req,res)=>{
    User.findById(req.user.id)
        .then(user => {
            let firstname = user.firstname;
            let lastname = user.name;
            let birthday = moment(user.birthday).unix();
            let email = user.email;

            api.Users.create({
                PersonType: 'NATURAL',
                FirstName: firstname,
                LastName: lastname,
                Birthday: birthday,
                Nationality: 'FR',
                CountryOfResidence: 'FR',
                Email: email
            })
                .then(newUser=> {
                    user.id_mangopay = newUser.Id;
                    user.save().then().catch();
                    api.Wallets.create({
                        Owners: [newUser.Id],
                        Description: 'new wallet',
                        Currency: 'EUR'
                    })
                        .then(response => {
                            res.json(response)
                        })
                })
        })
        .catch(err => console.log(err))
});

// POST /myAlfred/api/payment/createCard
// Create credit card
// @access private
router.post('/createCard',passport.authenticate('jwt',{session:false}),(req,res)=> {
    User.findById(req.user.id)
        .then(user => {
            let id_mangopay = user.id_mangopay;
            api.CardRegistrations.create({
                UserId: id_mangopay,
                Currency: 'EUR'
            })
                .then(function(cardRegistrationData) {
                    const number = req.body.card_number;
                    const expiration_date = req.body.expiration_date;
                    const csv = req.body.csv;

                    let cardData = {
                        "cardNumber": number,
                        "cardExpirationDate": expiration_date,
                        "cardCvx": csv
                    };
                    let headers = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };
                    let options = {
                        url: cardRegistrationData.CardRegistrationURL,
                        headers: headers,
                        form: {
                            data: cardRegistrationData.PreregistrationData,
                            accessKeyRef: cardRegistrationData.AccessKey,
                            cardNumber: cardData.cardNumber,
                            cardExpirationDate: cardData.cardExpirationDate,
                            cardCvx: cardData.cardCvx
                        }
                    };
                    request.post(options,function (err,data,result) {
                        cardRegistrationData.RegistrationData = result;
                        api.CardRegistrations.update(cardRegistrationData)
                            .then(newCard => {
                                res.json(newCard)
                            });
                    },options)

                })
        })
});

// POST /myAlfred/api/payment/payIn
router.post('/payIn',(req,res)=> {
    api.PayIns.create({
        AuthorId: '71994443',
        DebitedFunds: {
            Currency: 'EUR',
            Amount: 1200
        },
        Fees: {
            Currency: "EUR",
            Amount: 12
        },
        ReturnURL: 'http://localhost:3122/paymentSuccess',
        CardType: "CB_VISA_MASTERCARD",
        PaymentType: "CARD",
        ExecutionType: "WEB",
        Culture: "FR",
        CreditedWalletId: 71994445
    })
        .then(data => {
            res.json(data)
        })
});

router.get('/cards',(req,res)=> {
    api.Users.getCards(71994443).then(cards => res.json(cards))
});













module.exports = router;
