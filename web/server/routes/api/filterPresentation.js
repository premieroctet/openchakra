const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: 'FilterPresentation Works!'}));


// @Route GET /myAlfred/api/filterPresentation/all
// View all filterPresentation
router.get('/all', (req, res) => {

  req.context.getModel('FilterPresentation').find()
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

  req.context.getModel('FilterPresentation').findById(req.params.id)
    .then(filterPresentation => {
      if (!filterPresentation) {
        return res.status(400).json({msg: 'No filterPresentation found'})
      }
      res.json(filterPresentation)
    })
    .catch(err => {
      res.status(404).json({billing: `No filterPresentation found:${err}`})
    })
})


module.exports = router;
