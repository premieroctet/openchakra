const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: 'Job Works!'}));

// @Route GET /myAlfred/api/job/all
// View all job
router.get('/all', (req, res) => {

  req.context.getModel('Job').find()
    .then(job => {
      if (typeof job !== 'undefined' && job.length > 0) {
        res.json(job);
      } else {
        return res.status(400).json({msg: 'No job found'});
      }

    })
    .catch(err => res.status(404).json({job: 'No job found'}));
});

// @Route GET /myAlfred/api/job/:id
// View one job
router.get('/:id', (req, res) => {

  req.context.getModel('Job').findById(req.params.id)
    .then(job => {
      if (!job) {
        return res.status(400).json({msg: 'No job found'})
      }
      res.json(job)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({job: `No job found:${err}`})
    })
})


module.exports = router;
