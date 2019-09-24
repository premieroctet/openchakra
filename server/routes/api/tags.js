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

// @Route GET /myAlfred/api/tags/prestations
// View all tags for prestations
router.get('/prestations',(req,res)=> {

    Tags.find({title:{$in:['Nid douillet','Tracas','Plaisirs']}})
        .then(tags => {
            if(typeof tags !== 'undefined' && tags.length > 0){
                res.json(tags);
            } else {
                return res.status(400).json({msg: 'No tags found'});
            }

        })
        .catch(err => res.status(404).json({ tags: 'No tags found' }));
});

// @Route GET /myAlfred/api/tags/category
// View all tags for category
router.get('/category',(req,res)=> {

    Tags.find({title:{$in:[/Sérénité/i,'Cours','Bien chez soi']}})
        .then(tags => {
            if(typeof tags !== 'undefined' && tags.length > 0){
                res.json(tags);
            } else {
                return res.status(400).json({msg: 'No tags found'});
            }

        })
        .catch(err => res.status(404).json({ tags: 'No tags found' }));
});

// @Route GET /myAlfred/api/tags/services
// View all tags for services
router.get('/services',(req,res)=> {

    Tags.find({title:{$in:[/Fête/i,/Bien-être/i,'Bien pratique','Top services','Jardin','Proche','Animaux']}})
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
                if(Object.keys(tags).length === 0 && tags.constructor === Object){
                    return res.status(400).json({msg: 'No tags found'});
                } else {
                    res.json(tags);
                }

            })
            .catch(err => res.status(404).json({ tags: 'No tags found' }));
});


module.exports = router;
