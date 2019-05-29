const express = require('express');
const router = express.Router();

const Category = require('../../models/Category');

router.get('/test',(req, res) => res.json({msg: 'Category Works!'}) );


// @Route GET /myAlfred/api/category/all
// View all categories
router.get('/all', (req,res)=> {

    Category.find()
        .then(category => {
            if(typeof category !== 'undefined' && category.length > 0){
                res.json(category);
            } else {
                return res.status(400).json({msg: 'No category found'});
            }

        })
        .catch(err => res.status(404).json({ category: 'No category found' }));


});

// @Route GET /myAlfred/api/category/:id
// View one category
router.get('/:id', (req,res)=> {

    Category.findById(req.params.id)
        .then(category => {
            if(typeof category !== 'undefined' && category.length > 0){
                res.json(category);
            } else {
                return res.status(400).json({msg: 'No category found'});
            }

        })
        .catch(err => res.status(404).json({ category: 'No category found' }));


});


module.exports = router;
