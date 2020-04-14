const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const {SIB}=require('../../../utils/sendInBlue');


// @Route POST /myAlfred/api/mailing/sendMail/:id
// Register
router.post('/sendMail/:id',(req,res) =>{
  const templateId = req.params.id;
  const contents = req.body;

  console.log(`Sending mail:${templateId} with data ${JSON.stringify(contents)}`);

  const s=new SIB();
  s.sendMail(templateId, contents);
});


module.exports = router;
