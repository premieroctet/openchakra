const express = require('express');
const router = express.Router();

const FilterPresentation = require('../../models/FilterPresentation');

router.get('/test', (req, res) => res.json({msg: 'FilterPresentation Works!'}));


// @Route GET /myAlfred/api/filterPresentation/all
// View all filterPresentation
router.get('/all', (req, res) => {

  FilterPresentation.find()
    .then(filterPresentation => {
      if (typeof filterPresentation !== 'undefined' && filterPresentation.length > 0) {
        res.json(filterPresentation);
      } else {
        return res.status(400).json({msg: 'No filterPresentation found'});
      }

    })
    .catch(err => res.status(404).json({filterPresentation: 'No filterPresentation found'}));
});

// @Route GET /myAlfred/api/filterPresentation/:id
// View one filterPresentation
router.get('/:id', (req, res) => {

  FilterPresentation.findById(req.params.id)
    .then(filterPresentation => {
      if (Object.keys(filterPresentation).length === 0 && filterPresentation.constructor === Object) {
        return res.status(400).json({msg: 'No filterPresentation found'});
      } else {
        res.json(filterPresentation);
      }

    })
    .catch(err => res.status(404).json({billing: 'No filterPresentation found'}));
});


module.exports = router;
