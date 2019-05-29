const express = require('express');
const router = express.Router();

const Calculating = require('../../models/Calculating');

router.get('/test',(req, res) => res.json({msg: 'Calculating Works!'}) );


// @Route GET /myAlfred/api/calculating/all
// View all calculating system
router.get('/all', (req,res)=> {

        Calculating.find()
            .then(calculating => {
                if(typeof calculating !== 'undefined' && calculating.length > 0){
                    res.json(calculating);
                } else {
                    return res.status(400).json({msg: 'No calculating found'});
                }

            })
            .catch(err => res.status(404).json({ calculating: 'No calculating found' }));


});

// @Route GET /myAlfred/api/calculating/:id
// View one calculating system
router.get('/:id',(req,res)=> {

        Calculating.findById(req.params.id)
            .then(calculating => {
                if(typeof calculating !== 'undefined' && calculating.length > 0){
                    res.json(calculating);
                } else {
                    return res.status(400).json({msg: 'No calculating found'});
                }

            })
            .catch(err => res.status(404).json({ calculating: 'No calculating found' }));


});



module.exports = router;
