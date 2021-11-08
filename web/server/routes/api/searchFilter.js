const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: 'SearchFilter Works!'}));

// @Route GET /myAlfred/api/searchFilter/all
// View all searchFilter
router.get('/all', (req, res) => {

  req.context.getModel('SearchFilter').find()
    .then(searchFilter => {
      if (typeof searchFilter !== 'undefined' && searchFilter.length > 0) {
        res.json(searchFilter);
      } else {
        return res.status(400).json({msg: 'No searchFilter found'});
      }

    })
    .catch(err => res.status(404).json({searchFilter: 'No searchFilter found'}));
});

// @Route GET /myAlfred/api/searchFilter/:id
// View one searchFilter
router.get('/:id', (req, res) => {

  req.context.getModel('SearchFilter').findById(req.params.id)
    .then(searchFilter => {
      if (!searchFilter) {
        return res.status(400).json({msg: 'No searchFilter found'})
      }
      res.json(searchFilter)
    })
    .catch(err => {
      console.error(err)
      return res.status(404).json({billing: `No searchFilter found:${err}`})
    })
})


module.exports = router;
