const express = require('express');
const router = express.Router();

const Options = require('../../models/Options');

router.get('/test', (req, res) => res.json({msg: 'Options Works!'}));


// @Route GET /myAlfred/api/options/all
// View all options
router.get('/all', (req, res) => {

  Options.find()
    .then(options => {
      if (typeof options !== 'undefined' && options.length > 0) {
        res.json(options);
      } else {
        return res.status(400).json({msg: 'No options found'});
      }

    })
    .catch(err => res.status(404).json({options: 'No options found'}));
});

// @Route GET /myAlfred/api/options/:id
// View one option
router.get('/:id', (req, res) => {

  Options.findById(req.params.id)
    .then(options => {
      if (Object.keys(options).length === 0 && options.constructor === Object) {
        return res.status(400).json({msg: 'No options found'});
      } else {
        res.json(options);
      }

    })
    .catch(err => res.status(404).json({options: 'No options found'}));
});


module.exports = router;
