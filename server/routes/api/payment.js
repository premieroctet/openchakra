const express = require('express');
const fs = require('fs');
const path = require('path');
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
    clientId: 'testmyalfredv2',
    clientApiKey: 'cSNrzHm5YRaQxTdZVqWxWAnyYDphvg2hzBVdgTiAOLmgxvF2oN',
});

const {config} = require('../../../config/config');
const url = config.apiUrl;


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
    const amount = req.body.amount*100;
    const fees = req.body.fees*100;
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
                        ReturnURL: url+'paymentSuccess',
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

// POST /myAlfred/api/payment/payInCreate
// @access private
router.post('/payInCreate',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const amount = req.body.amount*100;
    const fees = req.body.fees*100;
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
                        ReturnURL: url+'paymentSuccessCreate',
                        CardType: "CB_VISA_MASTERCARD",
                        PaymentType: "CARD",
                        ExecutionType: "WEB",
                        Culture: "FR",
                        CreditedWalletId: wallet_id
                    })
                        .then(data => {
                            console.log(data);
                            res.json(data)
                        })
                })
        });
});

// POST /myAlfred/api/payment/payInDirect
// @access private
router.post('/payInDirect',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const amount = req.body.amount*100;
    const fees = req.body.fees*100;
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
                        ReturnURL: url+'paymentDirectSuccess',
                        CardType: "CB_VISA_MASTERCARD",
                        PaymentType: "CARD",
                        ExecutionType: "DIRECT",
                        CreditedWalletId: wallet_id,
                        CardId: id_card,
                        SecureModeReturnURL: url+'paymentDirectSuccess'
                    })
                        .then(data => {
                            res.json(data)
                        })
                })
        })

});

// POST /myAlfred/api/payment/payInDirectCreate
// @access private
router.post('/payInDirectCreate',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const amount = req.body.amount*100;
    const fees = req.body.fees*100;
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
                        ReturnURL: url+'paymentSuccessCreate',
                        CardType: "CB_VISA_MASTERCARD",
                        PaymentType: "CARD",
                        ExecutionType: "DIRECT",
                        CreditedWalletId: wallet_id,
                        CardId: id_card,
                        SecureModeReturnURL: url+'paymentSuccessCreate'
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
    const amount = parseFloat(req.body.amount)*100;
    const fees = parseFloat(req.body.fees)*100;
    const wallet_credited = 72050324;
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
    const bic = req.body.bic;

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
                BIC: bic,
                Type: "IBAN"
            };

            api.Users.createBankAccount(id_mangopay,account)
                .then(newAccount => {
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

// GET /myAlfred/api/payment/activeAccount
// View bank account for a user
// @access private
router.get('/activeAccount',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const allAccount = [];
    User.findById(req.user.id)
        .then(user => {
            const id_mangopay = user.id_mangopay;
            api.Users.getBankAccounts(id_mangopay)
                .then(accounts => {
                    accounts.forEach(a => {
                        if(a.Active){
                            allAccount.push(a)
                        }
                    });
                    res.json(allAccount);
                })
        })
});

// GET /myAlfred/api/payment/transactions
// View transaction for a user
// @access private
router.get('/transactions',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const allTransactions = [];
    User.findById(req.user.id)
        .then(user => {
            const id_mangopay = user.id_mangopay;
            let options = {
                parameters: {
                    page: 1,
                    per_page: 100
                }
            };
            api.Users.getTransactions(id_mangopay,null,options)
                .then(transactions => {
                    const reverse = _.reverse(transactions);
                    res.json(reverse[0])
                })
        })
});

// PUT /myAlfred/api/payment/account
// Deactivate an account
// @access private
router.put('/account',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const id_account = req.body.id_account;
    User.findById(req.user.id)
        .then(user => {
            const id_mangopay = user.id_mangopay;
            api.Users.deactivateBankAccount(id_mangopay,id_account).then(
                account=> {
                    res.status(200).json(account)
                }
            ).catch(err => console.log(err));
        })

});

// PUT /myAlfred/api/payment/cards
// Deactivate a card
// @access private
router.put('/cards',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const id_card = req.body.id_card;
    api.Cards.update({Id:id_card,Active:false}).then().catch()
});

// POST / myAlfred/api/payment/createKycDocument
// Create a KYC document
// @access private
router.post('/createKycDocument', passport.authenticate('jwt', { session: false }), ( req, res ) => {
    User.findById(req.user.id)
        .then(user => {
            const objStatus = { 
                Type: 'IDENTITY_PROOF',
            }
            const id = user.id_mangopay;

            api.Users.createKycDocument(id, objStatus)
                .then(result => {
                    const documentId = result.Id;
                    let id_recto = path.resolve(user.id_card.recto);
                    let id_verso = null;

                    const base64Recto = fs.readFileSync(id_recto, 'base64');
                    const KycPageRecto = new api.models.KycPage({
                        "File": base64Recto
                    });

                    if (typeof user.id_card.verso !== 'undefined') id_verso = '../../../' + user.id_card.verso;

                    api.Users.createKycPage(id, documentId, KycPageRecto)
                        .then(resultRecto => {
                            if (id_verso !== null) {
                                const base64Verso = fs.readFileSync(path.resolve(id_verso), 'base64');
                                const KycPageVerso = new api.models.KycPage({
                                    "File": base64Verso
                                });

                                api.Users.createKycPageFromFile(id, documentId, KycPageVerso)
                                    .then(resultVerso => {
                                        res.json([resultRecto, resultVerso]);
                                    })
                                    .catch(err => res.json(err))
                            }

                            const updateObj = {
                                Id: documentId,
                                Status: "VALIDATION_ASKED"
                            };

                            api.Users.updateKycDocument(id, updateObj)
                                .then(updKyc => {
                                    res.json(updKyc);
                                })
                        })
                        .catch(err => res.json(err))
                    
                })
        })
        .catch(err => res.json(err))
})

module.exports = router;
