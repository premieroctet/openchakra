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
// @access private
router.post('/payIn',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const amount = parseInt(req.body.amount)*100;
    const fees = parseInt(req.body.fees)*100;
    User.findById(req.user.id)
        .then(user => {
            const id_mangopay = user.id_mangopay;
            api.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    api.PayIns.create({
                        AuthorId: id_mangopay,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: amount
                        },
                        Fees: {
                            Currency: "EUR",
                            Amount: fees
                        },
                        ReturnURL: 'http://localhost:3122/paymentSuccess',
                        CardType: "CB_VISA_MASTERCARD",
                        PaymentType: "CARD",
                        ExecutionType: "WEB",
                        Culture: "FR",
                        CreditedWalletId: wallet_id
                    })
                        .then(data => {
                            res.json(data)
                        })
                })
        });
});

// POST /myAlfred/api/payment/payInDirect
// @access private
router.post('/payInDirect',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const amount = parseInt(req.body.amount)*100;
    const fees = parseInt(req.body.fees)*100;
    const id_card = req.body.id_card;
    User.findById(req.user.id)
        .then(user => {
            const id_mangopay = user.id_mangopay;
            api.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    api.PayIns.create({
                        AuthorId: id_mangopay,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: amount
                        },
                        Fees: {
                            Currency: "EUR",
                            Amount: fees
                        },
                        ReturnURL: 'http://localhost:3122/paymentSuccess',
                        CardType: "CB_VISA_MASTERCARD",
                        PaymentType: "CARD",
                        ExecutionType: "DIRECT",
                        CreditedWalletId: wallet_id,
                        CardId: id_card,
                        SecureModeReturnURL: 'http://localhost:3122/paymentSuccess'
                    })
                        .then(data => {
                            res.json(data)
                        })
                })
        })

});

// POST /myAlfred/api/payment/transfer
// @access private
router.post('/transfer',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const amount = parseInt(req.body.amount)*100;
    const fees = parseInt(req.body.fees)*100;
    const wallet_credited = req.body.wallet_credited;
    User.findById(req.user.id)
        .then(user => {
            const id_mangopay = user.id_mangopay;
            api.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    api.Transfers.create({
                        AuthorId: id_mangopay,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: amount
                        },
                        Fees: {
                            Currency: "EUR",
                            Amount: fees
                        },
                        DebitedWalletId: wallet_id,
                        CreditedWalletId: wallet_credited,

                    })
                        .then(data => {
                            res.json(data)
                        })
                })
        })
});

// POST /myAlfred/api/payment/bankAccount
// @access private
router.post('/bankAccount',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const iban = req.body.iban;

    User.findById(req.user.id)
        .then(user => {
            const id_mangopay = user.id_mangopay;
            const billing_address = user.billing_address;
            const address = billing_address.address;
            const city = billing_address.city;
            const zip_code = billing_address.zip_code;

            const account = {
                OwnerAddress: {
                    AddressLine1: address,
                    City: city,
                    PostalCode: zip_code,
                    Country: "FR"
                },
                OwnerName: user.firstname + " "+ user.name,

                IBAN: iban,
                Type: "IBAN"
            };

            api.Users.createBankAccount(id_mangopay,account)
                .then(newAccount => {
                    user.id_account_mangopay = newAccount.Id;
                    user.save().then().catch();
                    res.json({msg: "Compte créé"})
                })


        })
});


// GET /myAlfred/api/payment/cards
// View all credit cards for a user
// @access private
router.get('/cards',passport.authenticate('jwt',{session:false}),(req,res)=> {
    User.findById(req.user.id)
        .then(user => {
            api.Users.getCards(user.id_mangopay).then(cards => res.json(cards))
        })
        .catch(err => console.log(err))

});

// GET /myAlfred/api/payment/cardsActive
// View all active credit cards for a user
// @access private
router.get('/cardsActive',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const allCards = [];
    User.findById(req.user.id)
        .then(user => {
            api.Users.getCards(user.id_mangopay)
                .then(cards => {
                    cards.forEach(c => {
                        if(c.Active){
                            allCards.push(c);
                        }
                    })

                    res.json(allCards);
                })
        })
        .catch(err => console.log(err))

});

// PUT /myAlfred/api/payment/cards
// Deactivate a card
// @access private
router.put('/cards',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const id_card = req.body.id_card;
    api.Cards.update({Id:id_card,Active:false}).then().catch()
});













module.exports = router;
