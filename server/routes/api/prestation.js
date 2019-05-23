const express = require('express');
const router = express.Router();

const Prestation = require('../../models/Prestation');

router.get('/test',(req, res) => res.json({msg: 'Prestation Works!'}) );


// @Route GET /myAlfred/api/prestation/all
// Get all prestations
router.get('/all',(req,res) => {
    Prestation.find()
        .populate('category')
        .populate('job')
        .populate('service')
        .populate('billing')
        .populate('search_filter')
        .populate('filter_presentation')
        .populate('calculating')
        .then(prestation => {
            if(typeof prestation !== 'undefined' && prestation.length > 0){
                res.json(prestation);
            } else {
                return res.status(400).json({msg: 'No prestation found'});
            }

        })
        .catch(err => res.status(404).json({ prestation: 'No prestation found' }));
});

// @Route GET /myAlfred/api/prestation/:id
// View one prestation
router.get('/:id',(req,res)=> {

    Prestation.findById(req.params.id)
        .populate('category')
        .populate('job')
        .populate('service')
        .populate('billing')
        .populate('search_filter')
        .populate('filter_presentation')
        .populate('calculating')
        .then(prestation => {
            if(typeof prestation !== 'undefined' && prestation.length > 0){
                res.json(prestation);
            } else {
                return res.status(400).json({msg: 'No prestation found'});
            }

        })
        .catch(err => res.status(404).json({ prestation: 'No prestation found' }));
});


module.exports = router;
