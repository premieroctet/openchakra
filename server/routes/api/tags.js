const express = require('express');
const router = express.Router();

const Tags = require('../../models/Tags');

router.get('/test', (req, res) => res.json({msg: 'Tags Works!'}));


// @Route GET /myAlfred/api/tags/all
// View all tags
router.get('/all', (req, res) => {

  Tags.find()
    .then(tags => {
      if (typeof tags !== 'undefined' && tags.length > 0) {
        res.json(tags);
      } else {
        return res.status(400).json({msg: 'No tags found'});
      }

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/prestations
// View all tags for prestations
router.get('/prestations', (req, res) => {

  Tags.find({label: {$in: ['Nid douillet', 'Tracas', 'Plaisirs']}})
    .then(tags => {
      if (typeof tags !== 'undefined' && tags.length > 0) {
        res.json(tags);
      } else {
        return res.status(400).json({msg: 'No tags found'});
      }

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/prestations/section1
// View all tags for prestations
router.get('/prestations/section1', (req, res) => {

  Tags.findOne({label: 'Nid douillet - Prestations'})
    .then(tags => {

      res.json(tags);


    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/prestations/section10
// View all tags for prestations
router.get('/prestations/section10', (req, res) => {

  Tags.findOne({label: 'Plaisirs - Prestations'})
    .then(tags => {

      res.json(tags);


    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/prestations/section19
// View all tags for prestations
router.get('/prestations/section19', (req, res) => {

  Tags.findOne({label: 'Tracas - Prestations'})
    .then(tags => {

      res.json(tags);


    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/category
// View all tags for category
router.get('/category', (req, res) => {

  Tags.find({label: {$in: [/Sérénité/i, 'Cours', 'Bien chez soi']}})
    .then(tags => {
      if (typeof tags !== 'undefined' && tags.length > 0) {
        res.json(tags);
      } else {
        return res.status(400).json({msg: 'No tags found'});
      }

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/category/section6
// View all tags for category
router.get('/category/section6', (req, res) => {

  Tags.findOne({label: /Sérénité - Catégorie/i})
    .then(tags => {
      res.json(tags);


    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/category/section15
// View all tags for category
router.get('/category/section15', (req, res) => {

  Tags.findOne({label: /Bien chez soi - Catégorie/i})
    .then(tags => {
      res.json(tags);


    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/category/section22
// View all tags for category
router.get('/category/section22', (req, res) => {

  Tags.findOne({label: /Cours - Catégorie/i})
    .then(tags => {
      res.json(tags);


    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services
// View all tags for services
router.get('/services', (req, res) => {

  Tags.find({label: {$in: [/Fête/i, /Bien-être/i, 'Bien pratique', 'Top services', 'Jardin', 'Proche', 'Animaux']}})
    .then(tags => {
      if (typeof tags !== 'undefined' && tags.length > 0) {
        res.json(tags);
      } else {
        return res.status(400).json({msg: 'No tags found'});
      }

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services/section3
// View all tags for services
router.get('/services/section3', (req, res) => {

  Tags.findOne({label: 'Animaux - Services'})
    .then(tags => {
      res.json(tags);

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services/section7
// View all tags for services
router.get('/services/section7', (req, res) => {

  Tags.findOne({label: 'Bien pratique - Services'})
    .then(tags => {
      res.json(tags);

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services/section9
// View all tags for services
router.get('/services/section9', (req, res) => {

  Tags.findOne({label: 'Top services - Services'})
    .then(tags => {
      res.json(tags);

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services/section12
// View all tags for services
router.get('/services/section12', (req, res) => {

  Tags.findOne({label: 'Fete - Services'})
    .then(tags => {
      res.json(tags);

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services/section16
// View all tags for services
router.get('/services/section16', (req, res) => {

  Tags.findOne({label: 'Jardin - Services'})
    .then(tags => {
      res.json(tags);

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services/section18
// View all tags for services
router.get('/services/section18', (req, res) => {

  Tags.findOne({label: 'Proches - Services'})
    .then(tags => {
      res.json(tags);

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/services/section21
// View all tags for services
router.get('/services/section21', (req, res) => {

  Tags.findOne({label: /Déco - Services/i})
    .then(tags => {
      res.json(tags);

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});

// @Route GET /myAlfred/api/tags/:id
// View one tag
router.get('/:id', (req, res) => {

  Tags.findById(req.params.id)
    .then(tags => {
      if (Object.keys(tags).length === 0 && tags.constructor === Object) {
        return res.status(400).json({msg: 'No tags found'});
      } else {
        res.json(tags);
      }

    })
    .catch(err => res.status(404).json({tags: 'No tags found'}));
});


module.exports = router;
