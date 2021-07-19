const express = require('express')
const router = express.Router()
router.get('/test', (req, res) => res.json({msg: 'Tags Works!'}))


// @Route GET /myAlfred/api/tags/all
// View all tags
router.get('/all', (req, res) => {
  req.context.getModel('Tag').find()
    .then(tags => {
      if (typeof tags !== 'undefined' && context.getModel('Tag').length > 0) {
        return res.json(tags)
      }
      return res.status(400).json({msg: 'No tags found'})
    })
    .catch(err => res.status(404).json({tags: 'No tags found'}))
});

// @Route GET /myAlfred/api/tags/prestations
// View all tags for prestations
router.get('/prestations', (req, res) => {
  req.context.getModel('Tag').find({label: {$in: ['Nid douillet', 'Tracas', 'Plaisirs']}})
    .then(tags => {
      if (typeof tags !== 'undefined' && req.context.getModel('Tag').length > 0) {
        res.json(tags)
      }
      else {
        return res.status(400).json({msg: 'No tags found'})
      }

    })
    .catch(err => {
      console.error(err)
      res.status(404).json({tags: 'No tags found'})
    })
})

// @Route GET /myAlfred/api/tags/category
// View all tags for category
router.get('/category', (req, res) => {
  req.context.getModel('Tag').find({label: {$in: [/Sérénité/i, 'Cours', 'Bien chez soi']}})
    .then(tags => {
      if (typeof tags !== 'undefined' && req.context.getModel('Tag').length > 0) {
        return res.json(tags)
      }
      return res.status(400).json({msg: 'No tags found'})
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({tags: 'No tags found'})
    })
})

// @Route GET /myAlfred/api/tags/services
// View all tags for services
router.get('/services', (req, res) => {
  req.context.getModel('Tag').find({label: {$in: [/Fête/i, /Bien-être/i, 'Bien pratique', 'Top services', 'Jardin', 'Proche', 'Animaux']}})
    .then(tags => {
      return res.json(tags)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({tags: 'No tags found'})
    })
})

// @Route GET /myAlfred/api/tags/:id
// View one tag
router.get('/:id', (req, res) => {
  req.context.getModel('Tag').findById(req.params.id)
    .then(tag => {
      if (!tag) {
        return res.status(404).json({msg: 'No tags found'})
      }
      return res.json(tags)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({tags: 'No tags found'})
    })
})


module.exports = router
