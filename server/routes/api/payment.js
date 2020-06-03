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
const request = require('request');
const {mangoApi}=require('../../../utils/mangopay');
const {maskIban}=require('../../../utils/text');
const {getHost}=require('../../../utils/mailing')
var parse = require('url-parse');
const { inspect } = require('util');

moment.locale('fr');

const {computeUrl} = require('../../../config/config');

router.get('/test',(req, res) => res.json({msg: 'Payment Works!'}) );


// GET /myAlfred/api/payment/mangopay_hook
// Create credit card
// @access public
router.get('/mangopay_hook', (req,res)=>{
  var query=parse(req.originalUrl, true).query;
  console.log(`Got params:${JSON.stringify(query)}`);
  res.json();
});

// POST /myAlfred/api/payment/createCard
// Create credit card
// @access private
router.post('/createCard',passport.authenticate('jwt',{session:false}),(req,res)=> {
    User.findById(req.user.id)
        .then(user => {
            let id_mangopay = user.id_mangopay;
            mangoApi.CardRegistrations.create({
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
                        mangoApi.CardRegistrations.update(cardRegistrationData)
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
            mangoApi.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    mangoApi.PayIns.create({
                        AuthorId: id_mangopay,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: amount
                        },
                        Fees: {
                            Currency: "EUR",
                            Amount: fees
                        },
                        ReturnURL: computeUrl(req)+'/paymentSuccess',
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
            mangoApi.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    mangoApi.PayIns.create({
                        AuthorId: id_mangopay,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: amount
                        },
                        Fees: {
                            Currency: "EUR",
                            Amount: fees
                        },
                        ReturnURL: computeUrl(req)+'/paymentSuccessCreate',
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
            mangoApi.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    mangoApi.PayIns.create({
                        AuthorId: id_mangopay,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: amount
                        },
                        Fees: {
                            Currency: "EUR",
                            Amount: fees
                        },
                        ReturnURL: computeUrl(req)+'/paymentDirectSuccess',
                        CardType: "CB_VISA_MASTERCARD",
                        PaymentType: "CARD",
                        ExecutionType: "DIRECT",
                        CreditedWalletId: wallet_id,
                        CardId: id_card,
                        SecureModeReturnURL: computeUrl(req)+'/paymentDirectSuccess'
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
            mangoApi.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    mangoApi.PayIns.create({
                        AuthorId: id_mangopay,
                        DebitedFunds: {
                            Currency: 'EUR',
                            Amount: amount
                        },
                        Fees: {
                            Currency: "EUR",
                            Amount: fees
                        },
                        ReturnURL: computeUrl(req)+'/paymentSuccessCreate',
                        CardType: "CB_VISA_MASTERCARD",
                        PaymentType: "CARD",
                        ExecutionType: "DIRECT",
                        CreditedWalletId: wallet_id,
                        CardId: id_card,
                        SecureModeReturnURL: computeUrl(req)+'/paymentSuccessCreate'
                    })
                    .then(data => {
                      res.json(data)
                    })
                    .catch(err => res.status(404).json({error:err}))
                })
                .catch(err => res.status(404).json({error:err}))
        })
        .catch(err => res.status(404).json({error:err}))

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
            mangoApi.Users.getWallets(id_mangopay)
                .then(wallets => {
                    const wallet_id = wallets[0].Id;
                    mangoApi.Transfers.create({
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
            const id_mangopay_provider = user.mangopay_provider_id;
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

            mangoApi.Users.createBankAccount(id_mangopay,account)
                .then(newAccount => {
                  console.log(`Mango bank account:${JSON.stringify(newAccount)}`)
                  res.json({msg: "Compte créé"})
                })
                .catch (err => {
                  console.error(`${JSON.stringify(err)}`)
                  errors={}
                  if (err.errors.BIC) errors['bic']='Le code BIC est incorrect'
                  if (err.errors.IBAN) errors['iban']='Le code IBAN est incorrect'
                  console.error(`Error:${errors}`)
                  res.status(404).json({errors : errors})
                })


      })
      .catch (err => {
        console.error(`Error:${err}`)
        res.status(404).json({errors : "Utilisateur non reconnu"})
      })
});


// GET /myAlfred/api/payment/cards
// View all credit cards for a user
// @access private
router.get('/cards',passport.authenticate('jwt',{session:false}),(req,res)=> {
    User.findById(req.user.id)
        .then(user => {
            mangoApi.Users.getCards(user.id_mangopay).then(cards => res.json(cards))
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
            mangoApi.Users.getCards(user.id_mangopay)
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
            mangoApi.Users.getBankAccounts(id_mangopay)
                .then(accounts => {
                    accounts.forEach(a => {
                        if(a.Active){
                            a.IBAN = maskIban(a.IBAN)
                            allAccount.push(a)
                        }
                    });
                    res.json(allAccount);
                })
        })
        .catch ( err => {
          console.error(JSON.stringify(err))
          res.json([])
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
            mangoApi.Users.getTransactions(id_mangopay,null,options)
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
            mangoApi.Users.deactivateBankAccount(id_mangopay,id_account).then(
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
    mangoApi.Cards.update({Id:id_card,Active:false}).then().catch()
});

// GET /myAlfred/api/payment/siret/{no_siret_or_siren}
// Get document for siret orsiren
// @access public
router.get('/siret/:siret_siren',(req,res)=> {

    var siren=req.params.siret_siren.substring(0, 9)
    console.log(`siren:${siren}`)
    siren=`${siren.substring(0,3)} ${siren.substring(3,6)} ${siren.substring(6,9)}`
    data={
       "form.siren": siren,
       "form.critere": "S",
       "form.nic": '',
       "form.departement": '',
       "form.departement_actif": '',
     }
    console.log(JSON.stringify(data))

    const transport = axios.create({withCredentials: true})
    transport.get("https://avis-situation-sirene.insee.fr/")
      .catch (err => {
        console.error(err)
        res.status(404).json(err)
        return
      })
      .then( resp => {
          transport.post('https://avis-situation-sirene.insee.fr/IdentificationListeSiret.action', data)
            .catch (err => {
              res.status(404).json(err)
              return
            })
            .then(resp => {
              console.log(inspect(resp))
              res.write(resp.data)
            })
      })
});


module.exports = router;
