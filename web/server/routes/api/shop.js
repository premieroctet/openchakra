const ServiceUser = require('../../models/ServiceUser')
const Shop = require('../../models/Shop')
const User = require('../../models/User')
const {logEvent} =require('../../utils/events')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const CronJob = require('cron').CronJob
const {sendShopDeleted, sendShopOnline} = require('../../utils/mailing')
const {createMangoProvider} = require('../../utils/mangopay')
const {is_production, is_validation}=require('../../../config/config')
const validateShopInput = require('../../validation/shop')

// FIX import or require
const ALF_CONDS = { // my alfred condiitons
  BASIC: '0',
  PICTURE: '1',
  ID_CARD: '2',
  RECOMMEND: '3',
}

const CANCEL_MODE = {
  FLEXIBLE: '0',
  MODERATE: '1',
  STRICT: '2',
}

// @Route POST /myAlfred/api/shop/add
// Create a shop
// @Access private
// FIX : inclure les disponibilites
router.post('/add', passport.authenticate('jwt', {session: false}), async(req, res) => {

  const {isValid, errors} = validateShopInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  Shop.findOne({alfred: req.user.id})
    .then(shop => {
      let newShop=false
      if (!shop) {
        shop = {}
        shop.alfred = req.user.id
        newShop=true
      }

      shop.booking_request = req.body.booking_request
      shop.no_booking_request = !shop.booking_request
      shop.my_alfred_conditions = req.body.my_alfred_conditions == ALF_CONDS.BASIC
      shop.profile_picture = req.body.my_alfred_conditions == ALF_CONDS.PICTURE
      shop.identity_card = req.body.my_alfred_conditions == ALF_CONDS.ID_CARD
      shop.recommandations = req.body.my_alfred_conditions == ALF_CONDS.RECOMMEND
      shop.welcome_message = req.body.welcome_message
      shop.flexible_cancel = req.body.cancel_mode == CANCEL_MODE.FLEXIBLE
      shop.moderate_cancel = req.body.cancel_mode == CANCEL_MODE.MODERATE
      shop.strict_cancel = req.body.cancel_mode == CANCEL_MODE.STRICT
      shop.verified_phone = req.body.verified_phone
      shop.is_particular = req.body.is_particular
      shop.is_professional = !shop.is_particular
      shop.cesu = req.body.cesu
      shop.cis = req.body.cis

      // FIX: save company
      shop.company = null
      if (req.body.company) {
        shop.company = req.body.company
      }

      shop.picture = 'static/shopBanner/sky-690293_1920.jpg'

      const promise=newShop?Shop.create(shop):shop.save()

      promise
        .then(shop => {
          User.findOneAndUpdate({_id: req.user.id}, {is_alfred: true}, {new: true})
            .then(alfred => {
              if (!alfred.mangopay_provider_id) {
                if (alfred.age<18 || alfred.age>120) {
                  console.log(`Create Mango provider skipped, ${alfred.email} age ${alfred.age}`)
                }
                else {
                  createMangoProvider(alfred, shop)
                }
              }
              if (newShop) {
                sendShopOnline(alfred, req)
              }
              if (newShop) {
                logEvent(req, 'Boutique', 'Création', `Boutique de ${alfred.full_name} créée`)
              }
              res.json(shop)
            })
            .catch(err => {
              console.error(err)
              res.status(404).json(err)
            })
        })
        .catch(err => {
          console.error(err)
          res.status(404).json(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(404).json(err)
    })
})


// @Route GET /myAlfred/api/shop/all
// View all shop
router.get('/all', (req, res) => {
  Shop.find()
    .sort({creation_date: -1})
    .populate('alfred', '-id_card')
    .populate('services')
    .populate({
      path: 'services',
      populate: {
        path: 'service',
        select: 'label',
      },
    })
    .then(shop => {
      if (typeof shop !== 'undefined' && shop.length > 0) {
        res.json(shop)
      }
      else {
        return res.status(400).json({
          msg: 'No shop found',
        })
      }
    })
    .catch(() => res.status(404).json({
      shop: 'No shop found',
    }))
})

// @Route GET /myAlfred/api/shop/allStatus
// View all shop status (pro/particular)
router.get('/allStatus', (req, res) => {
  Shop.find({}, 'is_particular is_professional')
    .populate({path: 'alfred', select: '_id'})
    .then(shops => {
      res.json(shops)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({shop: 'No shop found'})
    })
})

// @Route GET /myAlfred/api/shop/:id
// View one shop
router.get('/all/:id', (req, res) => {

  Shop.findById(req.params.id)
    .populate('alfred', '-id_card')
    .populate({path: 'services.label', populate: {path: 'service', select: 'label'}})
    .populate('alfred')
    .populate({
      path: 'services.label',
      populate: {
        path: 'service',
        select: 'label',
      },
    })
    .then(shop => {
      if (Object.keys(shop).length === 0 && shop.constructor === Object) {
        return res.status(400).json({
          msg: 'No shop found',
        })
      }
      res.json(shop)

    })
    .catch(() => res.status(404).json({
      shop: 'No shop found',
    }))


})

// @Route GET /myAlfred/api/shop/alfred/:alfred_id
// Get a shop with alfred id
router.get('/alfred/:id_alfred', (req, res) => {

  Shop.findOne({
    alfred: req.params.id_alfred,
  })
    .populate('services')
    .populate('alfred', '-id_card')
    .populate({path: 'services', populate: {path: 'service', select: ['label', 'picture']}})
    .populate('alfred')
    .populate({
      path: 'services',
      populate: {
        path: 'service',
        select: ['label', 'picture'],
      },
    })
    .populate({
      path: 'services',
      populate: {
        path: 'service',
        populate: {
          path: 'category',
          select: ['label', 'picture'],
        },
      },
    })
    .then(shop => {
      if (Object.keys(shop).length === 0 && shop.constructor === Object) {
        return res.status(400).json({
          msg: 'No shop found',
        })
      }
      res.json(shop)

    })
    .catch(() => res.status(404).json({
      shop: 'No shop found',
    }))


})

// @Route GET /myAlfred/api/shop/currentAlfred
// Get a shop with current alfred id
// @Access private
router.get('/currentAlfred', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {

  Shop.findOne({alfred: req.user.id})
    .populate('alfred')
    .populate({
      path: 'services.label',
      populate: {
        path: 'service',
        select: ['label', 'picture'],
      },
    })
    .then(shop => {
      if (Object.keys(shop).length === 0 && shop.constructor === Object) {
        return res.status(400).json({
          msg: 'No shop found',
        })
      }
      res.json(shop)

    })
    .catch(() => res.status(404).json({
      shop: 'No shop found',
    }))


})

// @Route DELETE /myAlfred/api/shop/current/delete
// Delete one shop
// @Access private
// TODO : supperimer serviceUsers et prestations personnalisées
router.delete('/current/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  Shop.findOne({alfred: req.user.id})
    .populate('alfred', 'firstname name')
    .then(shop => {
      shop.remove().then(() => {
        logEvent(req, 'Boutique', 'Suppression', `Boutique de ${shop.alfred.full_name} supprimée`)
        sendShopDeleted(shop.alfred)
        res.json({success: true})
      })
    })
    .catch(() => res.status(404).json({
      shopnotfound: 'No shop found',
    }))
})

// @Route DELETE /myAlfred/api/shop/:id
// Delete one shop
// @Access private
router.delete('/:id', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  Shop.findById(req.params.id)
    .then(shop => {
      shop.remove().then(() => res.json({
        success: true,
      }))
    })
    .catch(() => res.status(404).json({
      shopnotfound: 'No shop found',
    }))
})


// @Route PUT /myAlfred/api/shop/editBanner
// Edit picture banner for a shop
// @Access private
router.put('/editBanner', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  Shop.findOneAndUpdate({
    alfred: req.user.id,
  }, {
    picture: req.body.picture,
  }, {
    new: true,
  })
    .then(shop => {
      res.json(shop)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route PUT /myAlfred/api/shop/editWelcomeMessage
// Edit welcome message for a shop
// @Access private
router.put('/editWelcomeMessage', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  Shop.findOneAndUpdate({
    alfred: req.user.id,
  }, {
    welcome_message: req.body.welcome_message,
  }, {
    new: true,
  })
    .then(shop => {
      res.json(shop)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route PUT /myAlfred/api/shop/editParameters
// Edit booking parameters for a shop
// @Access private
router.put('/editParameters', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  Shop.findOneAndUpdate({
    alfred: req.user.id,
  }, {
    booking_request: req.body.booking_request,
    no_booking_request: req.body.no_booking_request,
    my_alfred_conditions: req.body.my_alfred_conditions,
    profile_picture: req.body.profile_picture,
    identity_card: req.body.identity_card,
    recommandations: req.body.recommandations,
    flexible_cancel: req.body.flexible_cancel,
    moderate_cancel: req.body.moderate_cancel,
    strict_cancel: req.body.strict_cancel,
    welcome_message: req.body.welcome_message,
  }, {
    new: true,
  })
    .then(shop => {
      res.json(shop)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route PUT /myAlfred/api/shop/status
// Edit personal status for a shop
// @Access private
router.put('/status', passport.authenticate('jwt', {session: false}), (req, res) => {
  Shop.findOneAndUpdate({alfred: req.user.id}, {
    is_particular: req.body.is_particular,
    is_professional: req.body.is_professional,
    company: req.body.is_particular ? null : req.body.company,
    cesu: req.body.cesu,
    cis: req.body.cis,
    insurances: req.body.insurances,
  }, {new: true})
    .then(shop => {
      ServiceUser.updateMany({user: req.user.id},
        {status: req.body.is_professional ? 'Pro': 'Particulier'},
      )
        .then(() => res.json(shop))
        .catch(err => {
          console.error(err)
          res.status(500).json(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})


// Create mango provider account for all alfred with shops
if (is_production() || is_validation()) {
  new CronJob('0 */15 * * * *', () => {
    console.log('Alfred who need mango account')
    User.find({is_alfred: true, mangopay_provider_id: null, active: true})
      .then(alfreds => {
        alfreds.forEach(alfred => {
          Shop.findOne({alfred: alfred})
            .then(shop => {
              console.log(`Found alfred ${alfred.name} and shop ${shop._id}`)
              if (alfred.age<18 || alfred.age>120) {
                console.log(`Create Mango provider skipped, ${alfred.email} age ${alfred.age}`)
              }
              else {
                createMangoProvider(alfred, shop)
              }
            })
            .catch(err => {
              console.error(`Mangopay provider creation error ${alfred._id}:${err}`)
            })
        })
      })
  }, null, true, 'Europe/Paris')
}

module.exports = router
