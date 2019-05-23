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

// @Route GET /myAlfred/api/service/:id
// View one service
router.get('/:id',(req,res)=> {

        Service.findById(req.params.id)
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
