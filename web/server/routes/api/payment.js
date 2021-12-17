const {checkPaid} = require('../../utils/booking')
const Group = require('../../models/Group')
const Booking = require('../../models/Booking')
const Company = require('../../models/Company')
const User = require('../../models/User')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const moment = require('moment')
const {mangoApi, install_hooks, createCard} = require('../../utils/mangopay')
const {maskIban} = require('../../../utils/text')
moment.locale('fr')
const {isB2BAdmin, isB2BManager, isB2BEmployee, isModeCompany}=require('../../utils/serverContext')
const {computeUrl} = require('../../../config/config')
const {MICROSERVICE_MODE, CARETAKER_MODE}=require('../../../utils/consts')

// TODO: PROBLEME : Le pay in id d'une résa client avcocotés n'est pas sauvegardé

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
  let query = req.query
  const id=query.RessourceId
  const event=query.EventType
  console.log(`Mangopay hook ${event}:${id}`)
  const status=event.split('_').pop()
  if (!id || !event) {
    console.error(`Payment hook invalid id/event: id:${id}, event:${event}`)
    return res.json()
  }
  if (event.startsWith('TRANSFER_NORMAL_') || event.startsWith('PAYOUT_NORMAL_')) {
    Booking.findOne({$or: [
      {mangopay_transfer_id: id}, {mangopay_payout_id: id},
      {'customer_fees.transfer_id': id}, {'customer_fees.payout_id': id},
      {'provider_fees.transfer_id': id}, {'provider_fees.payout_id': id},
    ]})
      .then(book => {
        if (!book) {
          return console.error(`Event ${event}:${id}`)
        }
        if (book.mangopay_transfer_id==id) {
          console.log(`Hook set booking ${book._id} transfer status to ${status}`)
          book.mangopay_transfer_status=status
        }
        if (book.mangopay_payout_id==id) {
          console.log(`Hook set booking ${book._id} payout status to ${status}`)
          book.mangopay_payout_status=status
        }
        [...book.customer_fees, ...book.provider_fees].forEach(f => {
          if (f.transfer_id==id) {
            console.log(`Hook set booking ${book._id} fee ${f._id} transfer status to ${status}`)
            f.transfer_status=status
          }
          if (f.payout_id==id) {
            console.log(`Hook set booking ${book._id} fee ${f._id} payout status to ${status}`)
            f.payout_status=status
          }
        })
        checkPaid(book)
        book.save()
          .then(() => {
            console.error(`Booking ${book._id} handled by hook`)
          })
          .catch(err => {
            console.error(`Booking ${book._id} save error:${err}`)
          })
      })
  }
  res.json()
})

// POST /myAlfred/api/payment/cards
// Create credit card
// @access private b2b admin
router.post('/cards', passport.authenticate('jwt', {session: false}), (req, res) => {
  const b2b = isB2BAdmin(req)
  if (b2b) {
    console.log(`Creating card for company ${req.user.company}`)
  }
  else {
    console.log(`Creating card for user ${req.user.id}`)
  }

  const promise = b2b ? Company.findById(req.user.company) : User.findById(req.user.id)
  promise
    .then(entity => {
      let id_mangopay = entity.id_mangopay
      const {card_number, expiration_date, csv} = req.body
      return createCard(id_mangopay, card_number, expiration_date, csv)
    })
    .then(newCard => {
      console.log(`Created card ${newCard.Id}`)
      res.json(newCard)
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
  const returnUrl= `/paymentSuccess?booking_id=${req.body.booking_id}`

  const promise=isModeCompany(req) ? Company.findById(req.user.company) : User.findById(req.user.id)

  let mangopay_id=0
  promise
    .then(entity => {
      console.log(entity)
      mangopay_id=entity.id_mangopay
      return mangoApi.Users.getWallets(entity.id_mangopay)
    })
    .then(wallets => {
      console.log(`Wallets:${wallets}`)
      const wallet_id = wallets[0].Id
      return mangoApi.PayIns.create({
        AuthorId: mangopay_id,
        DebitedFunds: {Currency: 'EUR', Amount: amount},
        Fees: {Currency: 'EUR', Amount: 0},
        ReturnURL: `${computeUrl(req)}${returnUrl}`,
        CardType: 'CB_VISA_MASTERCARD',
        PaymentType: 'CARD',
        ExecutionType: 'WEB',
        Culture: 'FR',
        CreditedWalletId: wallet_id,
        SecureModeReturnURL: `${computeUrl(req)}${returnUrl}`,
      })
    })
    .then(payin => {
      Booking.findByIdAndUpdate(req.body.booking_id,
        {mangopay_payin_id: payin.Id, mangopay_payin_status: payin.Status})
        .then(() => console.log('booking update ok'))
        .catch(err => console.error(`booking update error:${err}`))
      res.json(payin)
    })
    .catch(error => {
      console.error(error)
      return res.status(404).json({error: error})
    })
})

// POST /myAlfred/api/payment/avocotePayIn
// @access private
router.post('/avocotesPayIn', (req, res) => {
  const bookingId= req.body.bookingId
  const returnUrl= `/paymentSuccess?booking_id=${bookingId}`

  Booking.findById(bookingId)
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
              console.log(`Avocote PayIn created:${payin}`)
              Booking.findByIdAndUpdate(bookingId, {mangopay_payin_id: payin.Id})
                .then(() => console.log('booking update ok'))
                .catch(err => console.error(`booking update error:${err}`))
              res.json(payin)
            })
            .catch(error => {
              console.error(`Error at Avocotes payin:${error}`)
              return res.status(404).json({error: error})
            })
        })
        .catch(error => {
          console.error(`Error at Avocotes payIn get Wallets:${error}`)
          return res.status(404).json({error: error})
        })
    })
    .catch(error => {
      console.error(`Error at Avocotes payIn get booking:${error}`)
      return res.status(404).json({error: error})
    })
})

// POST /myAlfred/api/payment/refund
// Set recurrency for card_id
// @access private
router.post('/refund', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  const payInId=req.body.payInId
  console.log(`Refunding transaction ${payInId}`)

  Company.findById(req.user.company)
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
  const id_card = req.body.id_card
  const browserInfo = req.body.browserInfo
  browserInfo.AcceptHeader=req.headers.accept
  const ipAddress=req.connection.remoteAddress

  const promise=isModeCompany(req) ? Company.findById(req.user.company) : User.findById(req.user.id)
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
              Amount: 0,
            },
            ReturnURL: `${computeUrl(req)}/paymentSuccess?booking_id=${req.body.booking_id}`,
            CardType: 'CB_VISA_MASTERCARD',
            PaymentType: 'CARD',
            ExecutionType: 'DIRECT',
            CreditedWalletId: wallet_id,
            CardId: id_card,
            Culture: 'FR',
            SecureModeReturnURL: `${computeUrl(req)}/paymentSuccess?booking_id=${req.body.booking_id}`,
            BrowserInfo: browserInfo,
            IpAddress: ipAddress,
          })
            .then(payin => {
              console.log(`Created Payin ${JSON.stringify(payin)}`)
              console.log(`Sttaus ${JSON.stringify(payin.Sttaus)}`)
              Booking.findByIdAndUpdate(req.body.booking_id,
                {mangopay_payin_id: payin.Id, mangopay_payin_status: payin.Status})
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

// POST /myAlfred/api/payment/bakn-accounts
// Adds a bank account
// @access private
router.post('/bank-accounts', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {iban, bic} = req.body

  const promise=isModeCompany(req) ? Company.findById(req.user.company) : User.findById(req.user.id)
  promise
    .then(entity => {
      const mangopay_id = entity.mangopay_provider_id

      if (!mangopay_id) {
        res.status(400).json('Pas de compte mangopay')
      }

      const account = {
        OwnerAddress: {
          AddressLine1: entity.billing_address.address,
          City: entity.billing_address.city,
          PostalCode: entity.billing_address.zip_code,
          Country: 'FR',
        },
        OwnerName: entity.full_name,
        IBAN: iban,
        BIC: bic,
        Type: 'IBAN',
      }

      mangoApi.Users.createBankAccount(mangopay_id, account)
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
          res.status(422).json({errors: errors})
        })
    })
    .catch(err => {
      console.error(`Error:${err}`)
      res.status(404).json({errors: 'Utilisateur non reconnu'})
    })
})

const get_cards = req => {
  return new Promise((resolve, reject) => {
    const promise=isModeCompany(req) ? Company.findById(req.user.company) : User.findById(req.user.id)
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
router.get('/active-cards', passport.authenticate('jwt', {session: false}), (req, res) => {
  get_cards(req)
    .then(result => {
      let cards=result
      // B2B manager or employee : retain only cards allowed for group
      const group_mode=isB2BManager(req) ? MICROSERVICE_MODE : isB2BEmployee(req) ? CARETAKER_MODE : null
      if (group_mode) {
        Group.findOne({members: req.user.id, type: group_mode}, 'cards')
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
router.get('/bank-accounts', passport.authenticate('jwt', {session: false}), (req, res) => {
  const allAccount = []
  const promise = isB2BAdmin(req) ? Company.findById(req.user.company) : User.findById(req.user.id)
  promise
    .then(entity => {
      const id_mangopay = entity.mangopay_provider_id
      mangoApi.Users.getBankAccounts(id_mangopay, {parameters: {per_page: 100}})
        .then(accounts => {
          console.log(accounts.map(a => a.Id))
          accounts.forEach(a => {
            if (a.Active) {
              a.IBAN = maskIban(a.IBAN)
              allAccount.push(a)
            }
          })
          res.json(allAccount)
        })
        .catch(err => {
          console.error(err)
          res.json(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.json(err)
    })
})

// GET /myAlfred/api/payment/transactions
// View transaction for a user
// @access private
router.get('/payin/:payin_id', (req, res) => {
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
router.delete('/bank-accounts/:bank_account_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const account_id = req.params.bank_account_id
  const promise = isB2BAdmin(req) ? Company.findById(req.user.company) : User.findById(req.user.id)
  promise
    .then(entity => {
      const mangopay_id = entity.mangopay_provider_id
      mangoApi.Users.deactivateBankAccount(mangopay_id, account_id)
        .then(() => res.json())
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

// DELETE /myAlfred/api/payment/cards
// Deactivate a card
// @access private
router.delete('/cards/:card_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('Deleting card', req.params.card_id)
  mangoApi.Cards.update({Id: req.params.card_id, Active: false})
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(400).json(err)
    })
})

module.exports = router
