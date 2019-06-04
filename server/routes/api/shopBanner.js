const express = require('express');
const router = express.Router();

const ShopBanner = require('../../models/ShopBanner');

router.get('/test',(req, res) => res.json({msg: 'ShopBanner Works!'}) );

// @Route GET /myAlfred/api/shopBanner/all
// View picture for shop banner
router.get('/all',(req,res)=> {

    ShopBanner.find()
        .then(picture => {
            if(typeof picture !== 'undefined' && picture.length > 0){
                res.json(picture);
            } else {
                return res.status(400).json({msg: 'No picture found'});
            }

        })
        .catch(err => res.status(404).json({ picture: 'No picture found' }));
});

// @Route GET /myAlfred/api/shopBanner/:id
// View one shopBanner
router.get('/:id',(req,res)=> {

    ShopBanner.findById(req.params.id)
        .then(picture => {
            if(typeof picture !== 'undefined' && picture.length > 0){
                res.json(picture);
            } else {
                return res.status(400).json({msg: 'No picture found'});
            }

        })
        .catch(err => res.status(404).json({ picture: 'No picture found' }));
});


module.exports = router;
