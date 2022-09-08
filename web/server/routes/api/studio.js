const path=require('path')
const fs=require('fs').promises
const child_process = require('child_process')
const mongoose=require('mongoose')
const express = require('express')
const lodash=require('lodash')
const {HTTP_CODES}=require('../../utils/errors')

const router = express.Router()

router.get('/models', (req, res) => {
  const modelNames=lodash.sortBy(mongoose.modelNames())
  const result=[]
  modelNames.forEach(name => {
    result.push({
      name: name,
      attributes: Object.keys(mongoose.model(name).schema.paths)
        .filter(attName => !attName.startsWith('_')),
    })
  })
  // console.log(modelNames.map(m => mongoose.model(m).schema.paths))
  return res.json(result)
})

router.post('/file', (req, res) => {
  const {projectName, filePath, contents}=req.body
  if (!(projectName && filePath && contents)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }
  const destpath=path.join('/home/seb/workspace', projectName, 'src', filePath)
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

  const destpath=path.join('/home/seb/workspace', projectName)
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

  const destpath=path.join('/home/seb/workspace', projectName)
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

module.exports=router
