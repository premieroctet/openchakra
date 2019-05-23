const express = require('express');
const router = express.Router();

const Tags = require('../../models/Tags');

router.get('/test',(req, res) => res.json({msg: 'Tags Works!'}) );


// @Route GET /myAlfred/api/tags/all
// View all tags
router.get('/all',(req,res)=> {

        Tags.find()
            .then(tags => {
                if(typeof tags !== 'undefined' && tags.length > 0){
                    res.json(tags);
                } else {
                    return res.status(400).json({msg: 'No tags found'});
                }

            })
            .catch(err => res.status(404).json({ tags: 'No tags found' }));
});

// @Route GET /myAlfred/api/tags/:id
// View one tag
router.get('/:id', (req,res)=> {

        Tags.findById(req.params.id)
            .then(tags => {
                if(typeof tags !== 'undefined' && tags.length > 0){
                    res.json(tags);
                } else {
                    return res.status(400).json({msg: 'No tags found'});
                }

            })
            .catch(err => res.status(404).json({ tags: 'No tags found' }));
});


module.exports = router;
