const express = require('express');
const router = express.Router();

const Billing = require('../../models/Billing');

router.get('/test', (req, res) => res.json({msg: 'Billing Works!'}));


// @Route GET /myAlfred/api/billing/all
// View all billings system
router.get('/all', (req, res) => {

  Billing.find()
    .then(billing => {
      if (typeof billing !== 'undefined' && billing.length > 0) {
        res.json(billing);
      } else {
        return res.status(400).json({msg: 'No billing found'});
      }

    })
    .catch(err => res.status(404).json({billing: 'No billing found'}));


});

// @Route GET /myAlfred/api/billing/:id
// View one billings system
router.get('/:id', (req, res) => {

  Billing.findById(req.params.id)
    .then(billing => {
      if (Object.keys(billing).length === 0 && billing.constructor === Object) {

        return res.status(400).json({msg: 'No billing found'});
      } else {
        res.json(billing);
      }

    })
    .catch(err => res.status(404).json({billing: 'No billing found'}));


});


module.exports = router;
