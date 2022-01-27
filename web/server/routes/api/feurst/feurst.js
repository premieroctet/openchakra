const router = require('express').Router()
const {getDatabase}=require('../../../utils/feurst/xl_db')
// @Route GET /feurst/api/database
// Google callback
router.get('/database', (req, res) => {
  getDatabase()
    .then(db => {
      res.json(db)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

module.exports = router
