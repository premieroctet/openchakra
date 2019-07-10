const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const multer = require ('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'static/profile/idCard/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname  )
  }
});
const upload = multer({ storage: storage });

const Shop = require('../../models/Shop');
const validateShopInput = require('../../validation/shop');
router.get('/test',(req, res) => res.json({msg: 'Shop Works!'}) );

// @Route POST /myAlfred/api/shop/add
// Create a shop
// @Access private
router.post('/add', passport.authenticate('jwt',{session: false}),(req,res) => {
    const {isValid, errors} = validateShopInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Shop.findOne({alfred: req.user.id})
        .then(shop => {

            if(shop !== null) {
                console.log('Existe déjà');
            } else {
                const shopFields = {};
                shopFields.alfred = req.user.id;
                shopFields.booking_request = req.body.booking_request;
                shopFields.my_alfred_conditions = req.body.my_alfred_conditions;
                shopFields.profile_picture = req.body.profile_picture;
                shopFields.identity_card = req.body.identity_card;
                shopFields.recommandations = req.body.recommandations;
                shopFields.welcome_message = req.body.welcome_message;
                shopFields.flexible_cancel = req.body.flexible_cancel;
                shopFields.moderate_cancel = req.body.moderate_cancel;
                shopFields.strict_cancel = req.body.strict_cancel;
                shopFields.verified_phone = req.body.verified_phone;
                shopFields.is_particular = req.body.is_particular;
                shopFields.is_professional = req.body.is_professional;
                if(req.body.self_employed) shopFields.self_employed = req.body.self_employed;
                if(req.body.individual_company) shopFields.individual_company = req.body.individual_company;

                shopFields.company = {};
                if (req.body.name) shopFields.company.name = req.body.name;
                if (req.body.creation_date) shopFields.company.creation_date = req.body.creation_date;
                if (req.body.siret) shopFields.company.siret = req.body.siret;
                if (req.body.naf_ape) shopFields.company.naf_ape = req.body.naf_ape;




                shopFields.services = req.body.arrayService;
                shopFields.picture = "static/shopBanner/sky-690293_1920.jpg";

                const newShop = new Shop(shopFields);

                newShop.save().then(shop => res.json(shop)).catch(err => console.log(err));




            }
        })
});


// @Route GET /myAlfred/api/shop/all
// View all shop
router.get('/all',(req,res)=> {

    Shop.find()
        .populate('alfred')
        .populate('services')
        .populate({path:'services',populate:{path: 'service',select:'label'}})
        .then(shop => {
            if(typeof shop !== 'undefined' && shop.length > 0){
                res.json(shop);
            } else {
                return res.status(400).json({msg: 'No shop found'});
            }



        })
        .catch(err => res.status(404).json({ shop: 'No shop found' }));


});

// @Route GET /myAlfred/api/shop/:id
// View one shop
router.get('/all/:id',(req,res)=> {

    Shop.findById(req.params.id)
        .populate('alfred')
        .populate({path:'services.label',populate:{path: 'service',select:'label'}})
        .then(shop => {
            if(Object.keys(shop).length === 0 && shop.constructor === Object){
                return res.status(400).json({msg: 'No shop found'});
            }
            res.json(shop);

        })
        .catch(err => res.status(404).json({ shop: 'No shop found' }));


});

// @Route GET /myAlfred/api/shop/alfred/:alfred_id
// Get a shop with alfred id
router.get('/alfred/:id_alfred',(req,res)=> {

    Shop.findOne({alfred: req.params.id_alfred})
        .populate('alfred')
        .populate({path:'services.label',populate:{path: 'service',select:['label','picture']}})
        .then(shop => {
            if(Object.keys(shop).length === 0 && shop.constructor === Object){
                return res.status(400).json({msg: 'No shop found'});
            }
            res.json(shop);

        })
        .catch(err => res.status(404).json({ shop: 'No shop found' }));


});

// @Route GET /myAlfred/api/shop/currentAlfred
// Get a shop with current alfred id
// @Access private
router.get('/currentAlfred',passport.authenticate('jwt',{session:false}),(req,res)=> {

    Shop.findOne({alfred: req.user.id})
        .populate('alfred')
        .populate({path:'services.label',populate:{path: 'service',select:['label','picture']}})
        .then(shop => {
            if(Object.keys(shop).length === 0 && shop.constructor === Object){
                return res.status(400).json({msg: 'No shop found'});
            }
            res.json(shop);

        })
        .catch(err => res.status(404).json({ shop: 'No shop found' }));


});

// @Route DELETE /myAlfred/api/shop/:id
// Delete one shop
// @Access private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {
    Shop.findById(req.params.id)
        .then(shop => {
            shop.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({shopnotfound: 'No shop found'}));
});


// @Route PUT /myAlfred/api/shop/editBanner
// Edit picture banner for a shop
// @Access private
router.put('/editBanner',passport.authenticate('jwt',{session:false}),(req,res) => {
    Shop.findOneAndUpdate({alfred: req.user.id},{picture: req.body.picture}, {new: true})
        .then(shop => {
            res.json(shop)
        })
        .catch(err => {
            console.log(err)
        })
});

// @Route PUT /myAlfred/api/shop/editWelcomeMessage
// Edit welcome message for a shop
// @Access private
router.put('/editWelcomeMessage',passport.authenticate('jwt',{session:false}),(req,res) => {
    Shop.findOneAndUpdate({alfred: req.user.id},{welcome_message: req.body.welcome_message}, {new: true})
        .then(shop => {
            res.json(shop)
        })
        .catch(err => {
            console.log(err)
        })
});

// @Route PUT /myAlfred/api/shop/editParameters
// Edit booking parameters for a shop
// @Access private
router.put('/editParameters',passport.authenticate('jwt',{session:false}),(req,res) => {
    Shop.findOneAndUpdate({alfred: req.user.id},{
        booking_request: req.body.booking_request, my_alfred_conditions: req.body.my_alfred_conditions,
        profile_picture: req.body.profile_picture, identity_card: req.body.identity_card,
        recommandations: req.body.recommandations,
        flexible_cancel: req.body.flexible_cancel, moderate_cancel: req.body.moderate_cancel,
        strict_cancel: req.body.strict_cancel
    }, {new: true})
        .then(shop => {
            res.json(shop)
        })
        .catch(err => {
            console.log(err)
        })
});

// @Route PUT /myAlfred/api/shop/editStatus
// Edit personal status for a shop
// @Access private
router.put('/editStatus',passport.authenticate('jwt',{session:false}),(req,res) => {
    Shop.findOneAndUpdate({alfred: req.user.id},{
        is_particular: req.body.is_particular, is_professional: req.body.is_professional,
        self_employed: req.body.self_employed, individual_company: req.body.individual_company,
        "company.name":req.body.name, "company.creation_date": req.body.creation_date,
        "company.siret": req.body.siret, "company.naf_ape": req.body.naf_ape,
        "company.vat_number": req.body.vat_number
    }, {new: true})
        .then(shop => {
            res.json(shop)
        })
        .catch(err => {
            console.log(err)
        })
});


module.exports = router;
