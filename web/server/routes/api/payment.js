const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Company = require('../../models/Company');
const Booking = require('../../models/Booking');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const request = require('request');
const {mangoApi, install_hooks, createCard} = require('../../utils/mangopay');
const {maskIban} = require('../../../utils/text');
var parse = require('url-parse');
const {inspect} = require('util');
const {MANGOPAY_ERRORS}=require('../../../utils/mangopay_messages')
moment.locale('fr');
const {is_b2b_admin}=require('../../utils/context')
const {computeUrl} = require('../../../config/config');

router.get('/test', (req, res) => res.json({msg: 'Payment Works!'}));

HOOK_TYPES=
"PAYIN_NORMAL_CREATED PAYIN_NORMAL_SUCCEEDED PAYIN_NORMAL_FAILED \
PAYOUT_NORMAL_CREATED PAYOUT_NORMAL_SUCCEEDED PAYOUT_NORMAL_FAILED \
TRANSFER_NORMAL_CREATED TRANSFER_NORMAL_SUCCEEDED TRANSFER_NORMAL_FAILED \
PAYIN_REFUND_CREATED PAYIN_REFUND_SUCCEEDED PAYIN_REFUND_FAILED \
PAYOUT_REFUND_CREATED PAYOUT_REFUND_SUCCEEDED PAYOUT_REFUND_FAILED \
TRANSFER_REFUND_CREATED TRANSFER_REFUND_SUCCEEDED TRANSFER_REFUND_FAILED".split(' ')

install_hooks(HOOK_TYPES, '/myAlfred/api/payment/hook')

/**
MANGOPAY 3DS schema : https://support.mangopay.com/s/article/How-does-3DS-work-with-the-API?language=fr
*/
// GET /myAlfred/api/payment/hook
// Create credit card
// @access public
router.get('/hook', (req, res) => {
  var query = parse(req.originalUrl, true).query;
  console.log(`Got params:${JSON.stringify(query)}`);
  res.json();
});

// POST /myAlfred/api/payment/createCard
// Create credit card
// @access private
router.post('/createCard', passport.authenticate('jwt', {session: false}), (req, res) => {
  const b2b = is_b2b_admin(req)
  if (b2b) {
    console.log(`Creating card for company ${req.user.company}`)
  }
  else {
    console.log(`Creating card for user ${req.user.id}`)
  }

  const promise = b2b ? Company.findById(req.user.company) : User.findById(req.user.id)
  promise
    .then(user => {
      let id_mangopay = user.id_mangopay;
      const {card_number, expiration_date, csv} = req.body
      createCard(id_mangopay, card_number, expiration_date, csv)
        .then( newCard => {
          res.json(newCard)
        })
        .catch( err => {
          console.error(err)
          res.status(404).json({error: err})
        })
    })
    .catch(error => {
      console.error(error);
      res.status(404).json({error: error});
  });
});

// POST /myAlfred/api/payment/payIn
// @access private
router.post('/payIn', passport.authenticate('jwt', {session: false}), (req, res) => {
  const amount = req.body.amount * 100;
  const fees = req.body.fees * 100;
  const returnUrl= `/paymentSuccess?booking_id=${req.body.booking_id}`
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
              Amount: amount,
            },
            Fees: {
              Currency: 'EUR',
              Amount: fees,
            },
            ReturnURL: `${computeUrl(req)}${returnUrl}`,
            CardType: 'CB_VISA_MASTERCARD',
            PaymentType: 'CARD',
            ExecutionType: 'WEB',
            Culture: 'FR',
            CreditedWalletId: wallet_id,
            SecureModeReturnURL: `${computeUrl(req)}${returnUrl}`,
          })
            .then(payin => {
              Booking.findByIdAndUpdate(req.body.booking_id, {mangopay_payin_id: payin.Id})
                .then( () => console.log('booking update ok'))
                .catch( err => console.error(`booking update error:${err}`))
              console.log(`Created Payin ${JSON.stringify(payin)}`)
              res.json(payin);
            });
        });
    })
    .catch(error => {
      console.error(error);
      res.status(404).json({error: err});
    });
});

// POST /myAlfred/api/payment/payInDirect
// @access private
router.post('/payInDirect', passport.authenticate('jwt', {session: false}), (req, res) => {
  const amount = req.body.amount * 100;
  const fees = req.body.fees * 100;
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
              Amount: amount,
            },
            Fees: {
              Currency: 'EUR',
              Amount: fees,
            },
            ReturnURL: `${computeUrl(req)}/paymentSuccess?booking_id=${req.body.booking_id}`,
            CardType: 'CB_VISA_MASTERCARD',
            PaymentType: 'CARD',
            ExecutionType: 'DIRECT',
            CreditedWalletId: wallet_id,
            CardId: id_card,
            SecureModeReturnURL: `${computeUrl(req)}/paymentSuccess?booking_id=${req.body.booking_id}`,
          })
            .then(payin => {
              console.log(`Created Payin ${JSON.stringify(payin)}`)
              Booking.findByIdAndUpdate(req.body.booking_id, {mangopay_payin_id: payin.Id})
                .then( () => console.log('booking update ok'))
                .catch( err => console.error(`booking update error:${err}`))
              res.json(payin);
            });
        });
    });

});

// POST /myAlfred/api/payment/transfer
// @access private
router.post('/transfer', passport.authenticate('jwt', {session: false}), (req, res) => {
  const amount = parseFloat(req.body.amount) * 100;
  const fees = parseFloat(req.body.fees) * 100;
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
              Amount: amount,
            },
            Fees: {
              Currency: 'EUR',
              Amount: fees,
            },
            DebitedWalletId: wallet_id,
            CreditedWalletId: wallet_credited,

          })
            .then(data => {
              res.json(data);
            });
        });
    });
});

// POST /myAlfred/api/payment/bankAccount
// @access private
router.post('/bankAccount', passport.authenticate('jwt', {session: false}), (req, res) => {
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
          Country: 'FR',
        },
        OwnerName: user.firstname + ' ' + user.name,

        IBAN: iban,
        BIC: bic,
        Type: 'IBAN',
      };

      mangoApi.Users.createBankAccount(id_mangopay, account)
        .then(newAccount => {
          console.log(`Mango bank account:${JSON.stringify(newAccount)}`);
          res.json({msg: 'Compte créé'});
        })
        .catch(err => {
          console.error(`${JSON.stringify(err)}`);
          errors = {};
          if (err.errors.BIC) {
            errors['bic'] = 'Le code BIC est incorrect';
          }
          if (err.errors.IBAN) {
            errors['iban'] = 'Le code IBAN est incorrect';
          }
          console.error(`Error:${errors}`);
          res.status(404).json({errors: errors});
        });


    })
    .catch(err => {
      console.error(`Error:${err}`);
      res.status(404).json({errors: 'Utilisateur non reconnu'});
    });
});


// GET /myAlfred/api/payment/cards
// View all credit cards for a user
// @access private
router.get('/cards', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (is_b2b_admin(req)) {
    console.log("C'est un admin B2B")
  }
  const promise=is_b2b_admin(req) ? Company.findById(req.user.company) : User.findById(req.user.id)
  promise
    .then(entity => {
      mangoApi.Users.getCards(entity.id_mangopay, {parameters: { per_page: 100}}).then(cards => res.json(cards));
    })
    .catch(err => console.error(err));

});

// GET /myAlfred/api/payment/cardsActive
// View all active credit cards for a user
// @access private
router.get('/cardsActive', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (is_b2b_admin(req)) {
    console.log("C'est un admin B2B")
  }
  const promise=is_b2b_admin(req) ? Company.findById(req.user.company) : User.findById(req.user.id)

  const allCards = [];
  promise
    .then(entity => {
      mangoApi.Users.getCards(entity.id_mangopay)
        .then(cards => {
          cards.forEach(c => {
            if (c.Active) {
              allCards.push(c);
            }
          });
          res.json(allCards);
        });
    })
    .catch(err => console.error(err));

});

// GET /myAlfred/api/payment/activeAccount
// View bank account for a user
// @access private
router.get('/activeAccount', passport.authenticate('jwt', {session: false}), (req, res) => {
  const allAccount = [];
  User.findById(req.user.id)
    .then(user => {
      const id_mangopay = user.id_mangopay;
      mangoApi.Users.getBankAccounts(id_mangopay)
        .then(accounts => {
          accounts.forEach(a => {
            if (a.Active) {
              a.IBAN = maskIban(a.IBAN);
              allAccount.push(a);
            }
          });
          res.json(allAccount);
        });
    })
    .catch(err => {
      console.error(JSON.stringify(err));
      res.json([]);
    });
});

// GET /myAlfred/api/payment/transactions
// View transaction for a user
// @access private
router.get('/payin/:payin_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    mangoApi.PayIns.get(req.params.payin_id)
      .then(payin => {
        console.log(`Got payin:${JSON.stringify(payin)}`)
        res.json(payin);
      })
      .catch(err => {
        console.error(err)
        res.json({})
      })
});

// PUT /myAlfred/api/payment/account
// Deactivate an account
// @access private
router.put('/account', passport.authenticate('jwt', {session: false}), (req, res) => {
  const id_account = req.body.id_account;
  User.findById(req.user.id)
    .then(user => {
      const id_mangopay = user.id_mangopay;
      mangoApi.Users.deactivateBankAccount(id_mangopay, id_account).then(
        account => {
          res.status(200).json(account);
        },
      ).catch(err => console.error(err));
    });

});

// PUT /myAlfred/api/payment/cards
// Deactivate a card
// @access private
router.put('/cards', passport.authenticate('jwt', {session: false}), (req, res) => {
  const id_card = req.body.id_card;
  mangoApi.Cards.update({Id: id_card, Active: false}).then().catch();
});

// GET /myAlfred/api/payment/siret/{no_siret_or_siren}
// Get document for siret orsiren
// @access public
router.get('/siret/:siret_siren', (req, res) => {

  var siren = req.params.siret_siren.substring(0, 9);
  console.log(`siren:${siren}`);
  siren = `${siren.substring(0, 3)} ${siren.substring(3, 6)} ${siren.substring(6, 9)}`;
  data = {
    'form.siren': siren,
    'form.critere': 'S',
    'form.nic': '',
    'form.departement': '',
    'form.departement_actif': '',
  };
  console.log(JSON.stringify(data));

  const transport = axios.create({withCredentials: true});
  transport.get('https://avis-situation-sirene.insee.fr/')
    .catch(err => {
      console.error(err);
      res.status(404).json(err);
      return;
    })
    .then(resp => {
      transport.post('https://avis-situation-sirene.insee.fr/IdentificationListeSiret.action', data)
        .catch(err => {
          res.status(404).json(err);
          return;
        })
        .then(resp => {
          console.log(inspect(resp));
          res.write(resp.data);
        })
    })
});


module.exports = router;
