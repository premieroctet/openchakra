const express = require('express');
const router = express.Router();
const passport = require('passport');

const Service = require('../../models/Service');
const ServiceUser = require('../../models/ServiceUser');

router.get('/test',(req, res) => res.json({msg: 'Service Works!'}) );


// @Route GET /myAlfred/api/service/all
// View all service
router.get('/all',(req,res)=> {

   console.log("All services");
        Service.find()
            .sort({'label':1})
            .populate('tags')
            .populate('equipments')
            .populate('category')
            .then(service => {
                if(typeof service !== 'undefined' && service.length > 0){
                    res.json(service);
                } else {
                    return res.status(400).json({msg: 'No service found'});
                }

            })
            .catch(err => res.status(404).json({ service: 'No service found' }));


});

// @Route GET /myAlfred/api/service/random/home
// View random service homepage
router.get('/random/home',(req,res)=> {

    Service.countDocuments().exec(function (err, count) {

        let limitrecords=6;

        function getRandomArbitrary(min, max) {
            return Math.ceil(Math.random() * (max - min) + min);
        }
        let skipRecords = getRandomArbitrary(1, count-limitrecords);

        let random = Math.floor(Math.random() * count);


        Service.find().populate('category').limit(6).skip(random).exec(
            function (err, result) {

                res.json(result)
            })
    })


});

// @Route GET /myAlfred/api/service/:id
// View one service
router.get('/:id',(req,res)=> {

    Service.findById(req.params.id)
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(service => {
            if(Object.keys(service).length === 0 && service.constructor === Object){
                return res.status(400).json({msg: 'No service found'});
            } else {
                res.json(service);
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));

});

// @Route GET /myAlfred/api/service/all/:category
// View all service per category
router.get('/all/:category',(req,res)=> {

    Service.find({category: req.params.category})
        .sort({'label':1})
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){
                res.json(service);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));

});

// @Route GET /myAlfred/api/service/currentAlfred/:category
// View all service per category filtered by already provided Alfred's services
router.get('/currentAlfred/:category', passport.authenticate('jwt',{session:false}), async (req,res)=> {

    let serviceUsers = await ServiceUser.find({user:req.user});
    serviceUsers = serviceUsers.map(s => s.service);
    console.log("Count:"+JSON.stringify(serviceUsers));

    Service.find({category: req.params.category, _id : { $nin: serviceUsers}})
        .sort({'label':1})
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(services => {
            if(typeof services !== 'undefined' && services.length > 0){
                res.json(services);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found:error' }));

});

// @Route GET /myAlfred/api/service/all/tags/:tags
// View all service per tags
router.get('/all/tags/:tags',(req,res)=> {

    Service.find({tags: req.params.tags})
        .sort({'label':1})
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(service => {
            if(typeof service !== 'undefined' && service.length > 0){
                res.json(service);
            } else {
                return res.status(400).json({msg: 'No service found'});
            }

        })
        .catch(err => res.status(404).json({ service: 'No service found' }));

});




module.exports = router;
