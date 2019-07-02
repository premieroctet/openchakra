const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const ServiceUser = require('../../models/ServiceUser');
const User = require('../../models/User');

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/profile/diploma/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const upload = multer({ storage: storage });

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/profile/certification/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const upload2 = multer({ storage: storage2 });

router.get('/test',(req, res) => res.json({msg: 'Service user Works!'}) );

// @Route POST /myAlfred/api/serviceUser/add
// Connect an alfred to a service
// @Access private
router.post('/add',passport.authenticate('jwt',{session: false}),(req,res)=>{
    ServiceUser.findOne({user: req.user.id, service: req.body.service})
        .then(service => {
            if(service){
                if(req.body.prestation && req.body.price) {
                    const newPrestation = {
                        prestation: mongoose.Types.ObjectId(req.body.prestation),
                        price: req.body.price
                    };
                    service.prestations.unshift(newPrestation);
                }
                if(req.body.equipment) service.equipments.unshift(mongoose.Types.ObjectId(req.body.equipment));
                service.save().then(services => res.json(services)).catch(err => console.log(err));
            } else {
                if(req.body.diploma) {
                    upload.single('diploma')
                }
                if(req.body.certification) {
                    upload2.single('certification')
                }
                const fields = {};
                fields.user= req.user.id;
                fields.service = mongoose.Types.ObjectId(req.body.service);
                fields.city = req.body.city;
                fields.perimeter = req.body.perimeter;
                fields.minimum_basket = req.body.minimum_basket;
                fields.deadline_before_booking = req.body.deadline_before_booking;
                fields.prestations = req.body.prestations;
                fields.graduated = req.body.graduated;
                if(req.body.diploma) fields.diploma = req.file.path;
                fields.is_certified = req.body.is_certified;
                if(req.body.certification) fields.certification = req.file.path;

                const newPrestation = {
                    prestation: mongoose.Types.ObjectId(req.body.prestation),
                    price: req.body.price
                };

                fields.prestations = [];
                fields.equipments = [];
                fields.prestations.unshift(newPrestation);
                fields.equipments.unshift(mongoose.Types.ObjectId(req.body.equipment));
                const newService = new ServiceUser(fields);
                newService.save().then(service => res.json(service)).catch(err => console.log(err));


            }

        })
});

// @Route PUT /myAlfred/api/serviceUser/edit/:id
// Update a serviceUser
// @Access private
router.put('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    ServiceUser.findById(req.params.id)
        .then(serviceUser => {


            serviceUser.city=req.body.city;
            serviceUser.perimeter= req.body.perimeter;
            serviceUser.minimum_basket= req.body.minimum_basket;
            serviceUser.deadline_before_booking= req.body.deadline_before_booking;
            serviceUser.majoration.active=req.body.active;
            serviceUser.majoration.price=req.body.price;
            serviceUser.equipments= req.body.equipments;


            serviceUser.save().then(service => res.json(service)).catch(err => console.log(err));

        })
        .catch(err => console.log(err))
});

// @Route PUT /myAlfred/api/serviceUser/addPrestation
// Add a prestation for a service
// @Access private
router.put('/addPrestation/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    ServiceUser.findById(req.params.id)
        .then(serviceUser => {


            const newPrestation = {
                prestation: mongoose.Types.ObjectId(req.body.prestation),
                price: req.body.price
            };
            serviceUser.prestations.unshift(newPrestation);


            serviceUser.save().then(service => res.json(service)).catch(err => console.log(err));

        })
        .catch(err => console.log(err))
});

// @Route PUT /myAlfred/api/serviceUser/editPrestation
// Edit the price of a prestation for a service
// @Access private
router.put('/editPrestation/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    ServiceUser.findById(req.params.id)
        .then(serviceUser => {


            const index = serviceUser.prestations
                .map(item => item.id)
                .indexOf(req.body.prestation);

            serviceUser.prestations[index].price = req.body.price;


            serviceUser.save().then(service => res.json(service)).catch(err => console.log(err));

        })
        .catch(err => console.log(err))
});

// @Route POST /myAlfred/api/serviceUser/addDiploma/:id
// Add a diploma for a service
// @Access private
router.post('/addDiploma/:id',upload.single('diploma'),passport.authenticate('jwt',{session:false}),(req,res) => {
    ServiceUser.findById(req.params.id)
        .then(serviceUser => {
            serviceUser.diploma = req.file.path;
            serviceUser.graduated = true;

            serviceUser.save().then(service => res.json(service)).catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

// @Route POST /myAlfred/api/serviceUser/addCertification/:id
// Add a certification for a service
// @Access private
router.post('/addCertification/:id',upload2.single('certification'),passport.authenticate('jwt',{session:false}),(req,res) => {
    ServiceUser.findById(req.params.id)
        .then(serviceUser => {
            serviceUser.certification = req.file.path;
            serviceUser.is_certified = true;

            serviceUser.save().then(service => res.json(service)).catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

// @Route GET /myAlfred/api/serviceUser/all
// View all service per user
// @Access private
router.get('/all',(req,res)=> {

    ServiceUser.find()
        .populate('user')
        .populate('service')
        .populate('prestations.prestation')
        .populate('equipments')
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){
                res.json(service);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));
});

// @Route GET /myAlfred/api/serviceUser/category/:id
// Count number of service per category
router.get('/category/:id',(req,res)=> {

    ServiceUser.find()
        .populate('user')
        .populate('service')
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){


                    service.forEach(e => {
                        if (e.service.category == req.params.id) {
                            res.json({length: service.length})
                        } else {
                            res.json({length: 0})
                        }
                    });



            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => console.log(err));
});

// @Route GET /myAlfred/api/serviceUser/near
// View all service by city
// @Access private
router.get('/near',passport.authenticate('jwt',{session:false}),(req,res)=> {

    User.findById(req.user.id)
        .then(user => {
            ServiceUser.find({city: user.billing_address.city})
                .populate('user')
                .populate('service')
                .limit(6)
                .then(service => {
                    if(typeof service !== 'undefined' && service.length > 0){
                        res.json(service);
                    } else {
                        return res.status(400).json({msg: 'No service found'});
                    }

                })
                .catch(err => res.status(404).json({ service: 'No service found' }));
        });

});

// @Route GET /myAlfred/api/serviceUser/home
// View service for home
// @Access private
router.get('/home',(req,res)=> {

    ServiceUser.find()
        .populate('user')
        .populate('service')
        .limit(6)
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){
                res.json(service);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));
});

// @Route GET /myAlfred/api/serviceUser/currentAlfred
// View all service for the current alfred
// @Access private
router.get('/currentAlfred',passport.authenticate('jwt',{session:false}),(req,res)=> {

    ServiceUser.find({user: req.user.id})
        .populate('service')
        .populate('prestations.prestation')
        .populate('equipments')
        .then(service => {
            if(Object.keys(service).length === 0 && service.constructor === Object){
                return res.status(400).json({msg: 'No service found'});
            } else {
                res.json(service);
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));
});



// @Route GET /myAlfred/api/serviceUser/:id
// View one serviceUser
// @Access private
router.get('/:id',passport.authenticate('jwt',{session: false}),(req,res)=> {

    ServiceUser.findById(req.params.id)
        .populate('user')
        .populate('service')
        .populate('prestations.prestation')
        .populate('equipments')
        .populate('service.equipments')
        .then(service => {
            if(Object.keys(service).length === 0 && service.constructor === Object){
                return res.status(400).json({msg: 'No service found'});
            } else {
                res.json(service);
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));
});

// @Route PUT /myAlfred/serviceUser/deletePrestation/:id
// Delete one prestation from the list
// @Access private
router.put('/deletePrestation/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        ServiceUser.findById(req.params.id)
            .then(serviceUser => {
                const removeIndex = serviceUser.prestations
                    .map(item => item.id)
                    .indexOf(req.body.prestation);

                serviceUser.prestations.splice(removeIndex, 1);


                serviceUser.save().then(list => res.json(list));
            })
            .catch(err => res.status(404).json(err));
    }
);

// @Route DELETE /myAlfred/api/serviceUser/:id
// Delete a service for an alfred
// @Access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    ServiceUser.findById(req.params.id)
        .then(event => {
            event.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({eventnotfound: 'No event found'}));
});




module.exports = router;
