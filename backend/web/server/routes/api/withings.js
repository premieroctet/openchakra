const express = require('express')

const router = express.Router()

//const wConfig=getWithingsConfig()

router.get('/', (req, res) => {
  return res.json('Ok')
})

module.exports = router
