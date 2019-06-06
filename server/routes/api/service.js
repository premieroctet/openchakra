const express = require('express');
const router = express.Router();

const Service = require('../../models/Service');

router.get('/test',(req, res) => res.json({msg: 'Service Works!'}) );


// @Route GET /myAlfred/api/service/all
// View all service
router.get('/all',(req,res)=> {

        Service.find()
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
              res.json(service);

              return res.status(400).json({msg: 'No service found'});

      })
      .catch(err => res.status(404).json({ service: 'No service found' }));

});

// @Route GET /myAlfred/api/service/:category
// View one all service per category
router.get('/all/:category',(req,res)=> {

    Service.find({category: req.params.category})
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
