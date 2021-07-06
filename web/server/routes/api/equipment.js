const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: 'Equipment Works!'}));


// @Route GET /myAlfred/api/equipment/all
// View all equipments
router.get('/all', (req, res) => {

  req.context.getModel('Equipment').find()
    .then(equipment => {
      if (typeof equipment !== 'undefined' && equipment.length > 0) {
        res.json(equipment);
      } else {
        return res.status(400).json({msg: 'No equipment found'});
      }

    })
    .catch(err => res.status(404).json({equipment: 'No equipment found'}));


});

// @Route GET /myAlfred/api/equipment/:id
// View one equipment
router.get('/:id', (req, res) => {

  req.context.getModel('Equipment').findById(req.params.id)
    .then(equipment => {
      if (Object.keys(equipment).length === 0 && equipment.constructor === Object) {
        return res.status(400).json({msg: 'No equipment found'})
      }
      res.json(equipment)
    })
    .catch(err => {
      console.error(err)
      return res.status(404).json({equipment: 'No equipment found'})
    })
})

module.exports = router
