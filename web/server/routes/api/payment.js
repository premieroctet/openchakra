const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')
const moment = require('moment')
const {mangoApi, install_hooks, createCard} = require('../../utils/mangopay')
const {maskIban} = require('../../../utils/text')
const parse = require('url-parse')
const {inspect} = require('util')
moment.locale('fr')
const {isB2BAdmin, isB2BManager, isB2BEmployee, isModeCompany}=require('../../utils/serverContext')
const {computeUrl} = require('../../../config/config')
const {MICROSERVICE_MODE, CARETAKER_MODE}=require('../../../utils/consts')

router.get('/test', (req, res) => res.json({msg: 'Payment Works!'}))

/* eslint-disable no-multi-str */
HOOK_TYPES = 'PAYIN_NORMAL_CREATED PAYIN_NORMAL_SUCCEEDED PAYIN_NORMAL_FAILED \
PAYOUT_NORMAL_CREATED PAYOUT_NORMAL_SUCCEEDED PAYOUT_NORMAL_FAILED \
TRANSFER_NORMAL_CREATED TRANSFER_NORMAL_SUCCEEDED TRANSFER_NORMAL_FAILED \
PAYIN_REFUND_CREATED PAYIN_REFUND_SUCCEEDED PAYIN_REFUND_FAILED \
PAYOUT_REFUND_CREATED PAYOUT_REFUND_SUCCEEDED PAYOUT_REFUND_FAILED \
TRANSFER_REFUND_CREATED TRANSFER_REFUND_SUCCEEDED TRANSFER_REFUND_FAILED'.split(' ')
/* eslint-enable no-multi-str */

install_hooks(HOOK_TYPES, '/myAlfred/api/payment/hook')

// TODO Gérer les get/post/put des comptes (account) pour le b2b
/**
MANGOPAY 3DS schema : https://support.mangopay.com/s/article/How-does-3DS-work-with-the-API?language=fr
*/
// GET /myAlfred/api/payment/hook
// Create credit card
// @access public
router.get('/hook', (req, res) => {
  let query = parse(req.originalUrl, true).query
  console.log(`Got params:${JSON.stringify(query)}`)
  res.json()
})

// POST /myAlfred/api/payment/createCard
// Create credit card
// @access private b2b admin
router.post('/createCard', passport.authenticate('jwt', {session: false}), (req, res) => {
  const b2b = isB2BAdmin(req)
  if (b2b) {
    console.log(`Creating card for company ${req.user.company}`)
  }
  else {
    console.log(`Creating card for user ${req.user.id}`)
  }

  const promise = b2b ? req.context.getModel('Company').findById(req.user.company) : req.context.getModel('User').findById(req.user.id)
  promise
    .then(entity => {
      let id_mangopay = entity.id_mangopay
      const {card_number, expiration_date, csv} = req.body
      createCard(id_mangopay, card_number, expiration_date, csv)
        .then(newCard => {
          console.log(`Created card ${newCard.Id}`)
          res.json(newCard)
        })
        .catch(err => {
          console.error(`Error creating card:${err}`)
          res.status(404).json({error: err})
        })
    })
    .catch(error => {
      console.error(error)
      res.status(404).json({error: error})
    })
})

// POST /myAlfred/api/payment/payIn
// @access private
router.post('/payIn', passport.authenticate('jwt', {session: false}), (req, res) => {
  const amount = req.body.amount * 100
  const fees = req.body.fees * 100
  const returnUrl= `/paymentSuccess?booking_id=${req.body.booking_id}`

  const promise=isModeCompany(req) ? req.context.getModel('Company').findById(req.user.company) : req.context.getModel('User').findById(req.user.id)

  promise
    .then(entity => {
      const id_mangopay = entity.id_mangopay
      mangoApi.Users.getWallets(id_mangopay)
        .then(wallets => {
          const wallet_id = wallets[0].Id
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
              req.context.getModel('Booking').findByIdAndUpdate(req.body.booking_id, {mangopay_payin_id: payin.Id})
                .then(() => console.log('booking update ok'))
                .catch(err => console.error(`booking update error:${err}`))
              console.log(`Created Payin ${JSON.stringify(payin)}`)
              res.json(payin)
            })
        })
    })
    .catch(error => {
      console.error(error)
      return res.status(404).json({error: err})
    })
})

// POST /myAlfred/api/payment/avocotePayIn
// @access private
router.post('/avocotePayIn', (req, res) => {
  const bookingId= req.body.bookingId
  const returnUrl= `/paymentSuccess?booking_id=${bookingId}`

  req.context.getModel('booking').findById(bookingId)
    .populate('user')
    .then(booking => {
      const amount = booking.amount*100
      const fees = 0
      const id_mangopay = booking.user.id_mangopay
      mangoApi.Users.getWallets(id_mangopay)
        .then(wallets => {
          const wallet_id = wallets[0].Id
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
            Tag: `Booking ${booking.reference}`,
          })
            .then(payin => {
              req.context.getModel('Booking').findByIdAndUpdate(req.body.booking_id, {mangopay_payin_id: payin.Id})
                .then(() => console.log('booking update ok'))
                .catch(err => console.error(`booking update error:${err}`))
              console.log(`Created Payin ${JSON.stringify(payin)}`)
              res.json(payin)
            })
        })
    })
    .catch(error => {
      console.error(error)
      return res.status(404).json({error: error})
    })
})

// POST /myAlfred/api/payment/refund
// Set recurrency for card_id
// @access private
router.post('/refund', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  const payInId=req.body.payInId
  console.log(`Refunding transaction ${payInId}`)

  req.context.getModel('Company').findById(req.user.company)
    .then(entity => {
      const id_mangopay = entity.id_mangopay
      mangoApi.PayIns.createRefund(payInId, {AuthorId: id_mangopay})
        .then(refund => {
          console.log(`refund ok : ${JSON.stringify(refund)}`)
          res.json(refund)
        })
        .catch(err => {
          console.error(err)
          res.status(400).json(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// POST /myAlfred/api/payment/payInDirect
// @access private
router.post('/payInDirect', passport.authenticate('jwt', {session: false}), (req, res) => {
  const amount = req.body.amount * 100
  const fees = req.body.fees * 100
  const id_card = req.body.id_card
  const promise=isModeCompany(req) ? req.context.getModel('Company').findById(req.user.company) : req.context.getModel('User').findById(req.user.id)

  promise
    .then(entity => {
      const id_mangopay = entity.id_mangopay
      mangoApi.Users.getWallets(id_mangopay)
        .then(wallets => {
          const wallet_id = wallets[0].Id
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
            Culture: 'FR',
            SecureModeReturnURL: `${computeUrl(req)}/paymentSuccess?booking_id=${req.body.booking_id}`,
          })
            .then(payin => {
              console.log(`Created Payin ${JSON.stringify(payin)}`)
              req.context.getModel('Booking').findByIdAndUpdate(req.body.booking_id, {mangopay_payin_id: payin.Id})
                .then(() => console.log('booking update ok'))
                .catch(err => console.error(`booking update error:${err}`))
              return res.json(payin)
            })
            .catch(err => {
              console.error(err)
              return res.status(400).json(err)
            })
        })
    })
})

// POST /myAlfred/api/payment/bankAccount
// @access private
router.post('/bankAccount', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {iban, bic} = req.body

  const promise=isModeCompany(req) ? req.context.getModel('Company').findById(req.user.company) : req.context.getModel('User').findById(req.user.id)
  promise
    .then(entity => {
      const id_mangopay = entity.id_mangopay
      const billing_address = entity.billing_address
      const address = billing_address.address
      const city = billing_address.city
      const zip_code = billing_address.zip_code

      const account = {
        OwnerAddress: {
          AddressLine1: address,
          City: city,
          PostalCode: zip_code,
          Country: 'FR',
        },
        OwnerName: entity.full_name,

        IBAN: iban,
        BIC: bic,
        Type: 'IBAN',
      }

      mangoApi.Users.createBankAccount(id_mangopay, account)
        .then(newAccount => {
          console.log(`Mango bank account:${JSON.stringify(newAccount)}`)
          res.json({msg: 'Compte créé'})
        })
        .catch(err => {
          console.error(`${JSON.stringify(err)}`)
          errors = {}
          if (err.errors.BIC) {
            errors.bic='Le code BIC est incorrect'
          }
          if (err.errors.IBAN) {
            errors.iban='Le code IBAN est incorrect'
          }
          console.error(`Error:${errors}`)
          res.status(404).json({errors: errors})
        })
    })
    .catch(err => {
      console.error(`Error:${err}`)
      res.status(404).json({errors: 'Utilisateur non reconnu'})
    })
})

const get_cards = req => {
  return new Promise((resolve, reject) => {
    const promise=isModeCompany(req) ? req.context.getModel('Company').findById(req.user.company) : req.context.getModel('User').findById(req.user.id)
    promise
      .then(entity => {
        mangoApi.Users.getCards(entity.id_mangopay, {parameters: {per_page: 100}})
          .then(cards => {
            const active_cards = cards.filter(c => c.Active)
            resolve(active_cards)
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

// GET /myAlfred/api/payment/cards
// View all credit cards for a user
// @access private
router.get('/cards', passport.authenticate('jwt', {session: false}), (req, res) => {
  get_cards(req)
    .then(cards => {
      res.json(cards)
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// GET /myAlfred/api/payment/cards
// View all credit cards for a user
// @access private
router.get('/activeCards', passport.authenticate('jwt', {session: false}), (req, res) => {
  get_cards(req)
    .then(result => {
      let cards=result
      // B2B manager or employee : retain only cards allowed for group
      const group_mode=isB2BManager(req) ? MICROSERVICE_MODE : isB2BEmployee(req) ? CARETAKER_MODE : null
      if (group_mode) {
        req.context.getModel('Group').findOne({members: req.user.id, type: group_mode}, 'cards')
          .then(group => {
            cards = cards.filter(c => group.cards.includes(c.Id))
          })
      }
      res.json(cards)
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// GET /myAlfred/api/payment/activeAccount
// View bank account for a user
// @access private
router.get('/activeAccount', passport.authenticate('jwt', {session: false}), (req, res) => {
  const allAccount = []
  const promise = isB2BAdmin(req) ? req.context.getModel('Company').findById(req.user.company) : req.context.getModel('User').findById(req.user.id)
  promise
    .then(entity => {
      const id_mangopay = entity.id_mangopay
      req.context.getModel('Users').getBankAccounts(id_mangopay)
        .then(accounts => {
          accounts.forEach(a => {
            if (a.Active) {
              a.IBAN = maskIban(a.IBAN)
              allAccount.push(a)
            }
          })
          res.json(allAccount)
        })
    })
    .catch(err => {
      console.error(JSON.stringify(err))
      res.json([])
    })
})

// GET /myAlfred/api/payment/transactions
// View transaction for a user
// @access private
router.get('/payin/:payin_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  mangoApi.PayIns.get(req.params.payin_id)
    .then(payin => {
      console.log(`Got payin:${JSON.stringify(payin)}`)
      res.json(payin)
    })
    .catch(err => {
      console.error(err)
      res.json({})
    })
})

// PUT /myAlfred/api/payment/account
// Deactivate an account
// @access private
router.delete('/account/:account_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const account_id = req.params.account_id
  const promise = isB2BAdmin(req) ? req.context.getModel('Company').findById(req.user.company) : req.context.getModel('User').findById(req.user.id)
  promise
    .then(entity => {
      const id_mangopay = entity.id_mangopay
      mangoApi.Users.deactivateBankAccount(id_mangopay, account_id)
        .then(account => {
          res.json(account)
        })
        .catch(err => {
          console.error(err)
          res.status(400).json(err)
        })
    })
})

// PUT /myAlfred/api/payment/cards
// Deactivate a card
// @access private
router.put('/cards', passport.authenticate('jwt', {session: false}), (req, res) => {
  const id_card = req.body.id_card
  mangoApi.Cards.update({Id: id_card, Active: false})
    .then(() => {
      return res.json(id_card)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).json(err)
    })
})

// GET /myAlfred/api/payment/siret/{no_siret_or_siren}
// Get document for siret orsiren
// @access public
router.get('/siret/:siret_siren', (req, res) => {

  let siren = req.params.siret_siren.substring(0, 9)
  console.log(`siren:${siren}`)
  siren = `${siren.substring(0, 3)} ${siren.substring(3, 6)} ${siren.substring(6, 9)}`
  data = {
    'form.siren': siren,
    'form.critere': 'S',
    'form.nic': '',
    'form.departement': '',
    'form.departement_actif': '',
  }

  const transport = axios.create({withCredentials: true})
  transport.get('https://avis-situation-sirene.insee.fr/')
    .catch(err => {
      console.error(err)
      return res.status(404).json(err)
    })
    .then(() => {
      transport.post('https://avis-situation-sirene.insee.fr/IdentificationListeSiret.action', data)
        .catch(err => {
          return res.status(404).json(err)
        })
        .then(resp => {
          console.log(inspect(resp))
          res.write(resp.data)
        })
    })
})


module.exports = router
