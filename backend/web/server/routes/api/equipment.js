const express = require('express')
const {HTTP_CODES} = require('../../utils/errors')
const Equipment = require('../../models/Equipment')

const router = express.Router()

router.get('/test', (req, res) => res.json({msg: 'Equipment Works!'}))


// @Route GET /myAlfred/api/equipment/all
// View all equipments
router.get('/all', (req, res) => {

  Equipment.find()
    .then(equipment => {
      if (typeof equipment !== 'undefined' && equipment.length > 0) {
        res.json(equipment)
      }
      else {
        return res.status(400).json({msg: 'No equipment found'})
      }

    })
    .catch(err => res.status(HTTP_CODES.NOT_FOUND).json({equipment: 'No equipment found'}))


})

// @Route GET /myAlfred/api/equipment/:id
// View one equipment
router.get('/:id', (req, res) => {

  Equipment.findById(req.params.id)
    .then(equipment => {
      if (Object.keys(equipment).length === 0 && equipment.constructor === Object) {
        return res.status(400).json({msg: 'No equipment found'})
      }
      res.json(equipment)
    })
    .catch(err => {
      console.error(err)
      return res.status(HTTP_CODES.NOT_FOUND).json({equipment: 'No equipment found'})
    })
})

module.exports = router
