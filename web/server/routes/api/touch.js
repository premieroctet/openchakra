const express = require('express');
const router = express.Router();
const {computeUrl} = require('../../../config/config');
const Job = require('../../models/Job');
var fs = require('fs');

// @Route GET /myAlfred/api/touch
router.get('/', (req, res) => {
  console.log(computeUrl(req));
  fs.writeFile('host.txt', computeUrl(req), function (err) {
    if (err) {
      throw err;
    }
  });
  res.json();
});


module.exports = router;
