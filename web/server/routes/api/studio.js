const {
  filterDataUser,
  getContacts,
  getResourceSpentTime,
  login
} = require('../../utils/studio/aftral/functions');
const {sendCookie} = require('../../config/passport')
const path=require('path')
const jwt = require('jsonwebtoken')

const fs=require('fs').promises
const child_process = require('child_process')
const mongoose=require('mongoose')
const express = require('express')
const lodash=require('lodash')
const PRODUCTION_ROOT='/home/ec2-user/studio/'
//const PRODUCTION_ROOT='/home/seb/workspace'
//const PRODUCTION_ROOT='/Users/seb/workspace'
const passport = require('passport')
const {HTTP_CODES, NotFoundError}=require('../../utils/errors')
const {getModels} =require('../../utils/database')
const {ACTIONS} = require('../../utils/studio/actions')
const {buildQuery, addComputedFields} = require('../../utils/database')
const url=require('url')

const router = express.Router()

router.get('/models', (req, res) => {
  const allModels=getModels()
  return res.json(allModels)
})

router.post('/file', (req, res) => {
  const {projectName, filePath, contents}=req.body
  if (!(projectName && filePath && contents)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }
  const destpath=path.join(PRODUCTION_ROOT, projectName, 'src', filePath)
  console.log(`Copying in ${destpath}`)
  return fs.writeFile(destpath, contents)
    .then(() => {
      return res.json()
    })
    .catch(err => {
      return res.status(HTTP_CODES.SYSTEM_ERROR).json(err)
    })
})

router.post('/install', (req, res) => {
  const {projectName}=req.body
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }

  const destpath=path.join(PRODUCTION_ROOT, projectName)
  const result=child_process.execSync('yarn install',
    {
      cwd: destpath,
    }, (error, stdout, stderr) => {
      console.log(`Error:${error}`)
      console.log(`Stdout:${stdout}`)
      console.log(`stderr:${stderr}`)
      if (error) {
        return res.status(HTTP_CODES.SYSTEM_ERROR).json(error)
      }
      return res.json()
    })
  console.log(`Install result:${result}`)
  return res.json(result)
})

router.post('/build', (req, res) => {
  const {projectName}=req.body
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }

  const destpath=path.join(PRODUCTION_ROOT, projectName)
  const result=child_process.execSync('yarn build',
    {
      cwd: destpath,
    }, (error, stdout, stderr) => {
      console.log(`Error:${error}`)
      console.log(`Stdout:${stdout}`)
      console.log(`stderr:${stderr}`)
      if (error) {
        return res.status(HTTP_CODES.SYSTEM_ERROR).json(error)
      }
      return res.json()
    })
  console.log(`Build result:${result}`)
  return res.json(result)
})

router.post('/start', (req, res) => {
  const {projectName}=req.body
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }

  const destpath=path.join(PRODUCTION_ROOT, projectName)
  const result=child_process.exec('serve -p 4001 build/',
    {
      cwd: destpath,
    }, (error, stdout, stderr) => {
      console.log(`Error:${error}`)
      console.log(`Stdout:${stdout}`)
      console.log(`stderr:${stderr}`)
    })
  console.log(`Start result:${result}`)
  return res.json(result)
})

router.post('/action', passport.authenticate('cookie', {session: false}), (req, res) => {
  const action=req.body.action
  const actionFn=ACTIONS[action]
  if (!actionFn) {
    console.error(`Unkown action:${action}`)
    return res.status(404).json(`Unkown action:${action}`)
  }

  return actionFn(req.body, req.user, req.get('Referrer'))
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      console.log(err)
      return res.status(err.status || HTTP_CODES.SYSTEM_ERROR).json(err.message || err)
    })
})

router.post('/login', (req, res) => {
  console.log(`Trying to log`)
  const {email, password}=req.body

  return login(email, password)
    .then(user => {
      return sendCookie(user, res).json(user)
    })
    .catch(err => {
      console.log(err)
      return res.status(err.status || HTTP_CODES.SYSTEM_ERROR).json(err.message || err)
    })
})

router.get('/current-user', passport.authenticate('cookie', {session: false}), (req, res) => {
  return res.json(req.user)
})

router.post('/:model', (req, res) => {
  const model=req.params.model
  return mongoose.connection.models[model].create({})
    .then(data => {
      console.log(`CReated ata ${data}`)
      return res.json(data)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

router.get('/:model/:id?', passport.authenticate('cookie', {session: false}), async (req, res) => {
  const model=req.params.model
  let fields=req.query.fields?.split(',') || []
  const id=req.params.id
  const params=url.parse(req.get('Referrer'), true).query
  const user=req.user

  if (model=='contact') {
    const contacts=await getContacts(req.user, id)
      .catch(err => {
        console.error(err)
        res.status(err.status || HTTP_CODES.SYSTEM_ERROR).json(err.message || err)
      })
    return res.json(contacts)
  }

  if (model=='session') {
    fields=lodash([...fields, 'trainers', 'trainees']).uniq().value()
  }

  if (model=='message') {
    fields=lodash([...fields, 'sender', 'destinee_user', 'destinee_session']).uniq().value()
  }

  let data=await buildQuery(model, id, fields).lean({virtuals: true})
  for (let d of data) {
    await addComputedFields(user, params, d, model, fields)
    .catch(err => console.error(err))
  }
  if (!id) {
    data=await filterDataUser({model, data, user: req.user})
  }
  if (id && data.length==0) {
    throw new NotFoundError(`Can't find ${model}:${id}`)
  }
  if (['theme', 'resource'].includes(model) && !id) {
    data=data.filter(t => t.name)
  }
  return res.json(data)
})

module.exports=router
