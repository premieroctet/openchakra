const passport = require('passport');
const express = require('express');
const router = express.Router();

const Prestation = require('../../models/Prestation');
const _ = require('lodash');

router.get('/test', (req, res) => res.json({msg: 'Prestation Works!'}));


// @Route GET /myAlfred/api/prestation/all
// Get all prestations
router.get('/all', (req, res) => {
  Prestation.find()
    .sort({'label': 1})
    .populate('category')
    .populate('job')
    .populate('service')
    .populate('billing')
    .populate('search_filter')
    .populate('filter_presentation')
    .populate('calculating')
    .populate('tags')
    .then(prestation => {
      if (typeof prestation !== 'undefined' && prestation.length > 0) {
        res.json(prestation);
      } else {
        return res.status(400).json({msg: 'No prestation found'});
      }

    })
    .catch(err => res.status(404).json({prestation: 'No prestation found'}));
});

// @Route GET /myAlfred/api/prestation/home
// Get all prestations
router.get('/home', (req, res) => {
  Prestation.find().sort({'label': 1})
    .populate('category')
    .populate('job')
    .populate('service')
    .populate('billing')
    .populate('search_filter')
    .populate('filter_presentation')
    .populate('calculating')
    .populate('tags')
    .limit(4)
    .then(prestation => {
      if (typeof prestation !== 'undefined' && prestation.length > 0) {
        res.json(prestation);
      } else {
        return res.status(400).json({msg: 'No prestation found'});
      }

    })
    .catch(err => res.status(404).json({prestation: 'No prestation found'}));
});

// @Route GET /myAlfred/api/prestation/:service
// View all prestations per service
router.get('/:service', (req, res) => {

  Prestation.find({service: req.params.service}).sort({'label': 1})
    .populate('category')
    .populate('service')
    .populate('filter_presentation')
    .populate('billing')
    .then(prestation => {
      if (typeof prestation !== 'undefined' && prestation.length > 0) {
        res.json(prestation);
      } else {
        return res.status(400).json({msg: 'No prestation found'});
      }

    })
    .catch(err => res.status(404).json({prestation: 'No prestation found'}));
});

// @Route POST /myAlfred/api/prestation/all/search
// Search prestation by label
router.post('/all/search', (req, res) => {
  const dat = req.body.label;
  Prestation.find({$text: {$search: dat}})
    .populate('service')
    .populate('category')
    .sort({label: 1})
    .then(prestation => {
      if (typeof prestation !== 'undefined' && prestation.length > 0) {

        res.json(prestation);
      } else {
        return res.status(400).json({msg: 'No prestation found'});
      }

    })
    .catch(err => res.status(404).json({prestation: 'Error'}));


});

// @Route GET /myAlfred/api/prestation/:service/:filter
// View all prestations per service and filter
router.get('/:service/:filter', passport.authenticate('jwt', {session: false}), (req, res) => {


  let result = User.findById(req.user.id);
  Prestation.find({
    service: req.params.service,
    filter_presentation: req.params.filter,
  })
    .sort({'label': 1})
    .populate('billing')
    .then(prestation => {
      if (typeof prestation !== 'undefined' && prestation.length > 0) {
        res.json(prestation);
      } else {
        return res.status(400).json({msg: 'No prestation found'});
      }
    })
    .catch(err => res.status(404).json({prestation: 'No prestation found'}));
});

// @Route GET /myAlfred/api/prestation/all/tags/:tags
// View all prestations per tags
router.get('/all/tags/:tags', (req, res) => {


  Prestation.find({tags: req.params.tags})
    .sort({'label': 1})
    .populate('tags')
    .then(prestations => {
      if (typeof prestations !== 'undefined' && prestations.length > 0) {
        res.json(prestations);
      } else {
        return res.status(400).json({msg: 'No prestations found'});
      }

    })
    .catch(err => res.status(404).json({service: 'No prestation found'}));

});

// @Route GET /myAlfred/api/prestation/:id
// View one prestation
router.get('/:id', (req, res) => {


  Prestation.findById(req.params.id)
    .populate('category')
    .populate('job')
    .populate('service')
    .populate('billing')
    .populate('search_filter')
    .populate('filter_presentation')
    .populate('calculating')
    .populate('tags')
    .then(prestation => {
      if (Object.keys(prestation).length === 0 && prestation.constructor === Object) {
        return res.status(400).json({msg: 'No prestation found'});
      } else {
        res.json(prestation);
      }

    })
    .catch(err => res.status(404).json({prestation: 'No prestation found'}));
});


module.exports = router;
