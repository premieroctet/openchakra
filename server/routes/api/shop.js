const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Shop = require('../../models/Shop');
const validateShopInput = require('../../validation/shop');
router.get('/test',(req, res) => res.json({msg: 'Shop Works!'}) );

// @Route POST /myAlfred/api/shop/add
// Create a shop
// @Access private
router.post('/add',passport.authenticate('jwt',{session: false}),(req,res) => {
    const {isValid, errors} = validateShopInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Shop.find({alfred: req.user.id})
        .then(shop => {
            if(typeof shop !== 'undefined' && shop.length > 0) {
                if(req.body.service && req.body.description) {
                    const newService = {
                        label: mongoose.Types.ObjectId(req.body.service),
                        description: req.body.description
                    };
                    shop.services.unshift(newService);
                    shop.save().then(services => res.json(services)).catch(err => console.log(err));

                }else {

                    return res.status(400).json({msg: 'This shop already exist'});
                }
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
                shopFields.id_recto = req.body.id_recto;
                shopFields.id_verso = req.body.id_verso;
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
                if (req.body.vat_number) shopFields.company.vat_number = req.body.vat_number;

                const newService = {
                    label: mongoose.Types.ObjectId(req.body.service),
                    description: req.body.description
                };

                shopFields.services = [];
                shopFields.services.unshift(newService);
                shopFields.picture = req.body.picture;

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
        .populate({path:'services.label',populate:{path: 'service',select:'label'}})
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
router.get('/:id',(req,res)=> {

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

// @Route PUT /myAlfred/api/shop/:id
// Update a shop
// @Access private
router.put('/:id',passport.authenticate('jwt',{session:false}), (req,res) => {
    if(req.body.self_employed || req.body.individual_company) {
        Shop.findByIdAndUpdate(req.params.id, {
            booking_request: req.body.booking_request, my_alfred_conditions: req.body.my_alfred_conditions,
            profile_picture: req.body.profile_picture, identity_card: req.body.identity_card,
            recommandations: req.body.recommandations, welcome_message: req.body.welcome_message,
            flexible_cancel: req.body.flexible_cancel, moderate_cancel: req.body.moderate_cancel,
            strict_cancel: req.body.strict_cancel, id_recto: req.body.id_recto,
            id_verso: req.body.id_verso, verified_phone: req.body.verified_phone,
            is_particular: req.body.is_particular, is_professional: req.body.is_professional,
            self_employed: req.body.self_employed, individual_company: req.body.individual_company,
            "company.name":req.body.name, "company.creation_date": req.body.creation_date,
            "company.siret": req.body.siret, "company.naf_ape": req.body.naf_ape,
            "company.vat_number": req.body.vat_number},{new:true})
            .then(shop => {
                res.json(shop)
            })
            .catch(err => res.status(404).json({shopnotfound: 'No shop found'}))
    } else {
        Shop.findByIdAndUpdate(req.params.id, {
            booking_request: req.body.booking_request, my_alfred_conditions: req.body.my_alfred_conditions,
            profile_picture: req.body.profile_picture, identity_card: req.body.identity_card,
            recommandations: req.body.recommandations, welcome_message: req.body.welcome_message,
            flexible_cancel: req.body.flexible_cancel, moderate_cancel: req.body.moderate_cancel,
            strict_cancel: req.body.strict_cancel, id_recto: req.body.id_recto,
            id_verso: req.body.id_verso, verified_phone: req.body.verified_phone,
            is_particular: req.body.is_particular, is_professional: req.body.is_professional},{new:true})
            .then(shop => {
                res.json(shop)
            })
            .catch(err => res.status(404).json({shopnotfound: 'No shop found'}))
    }

});


module.exports = router;
