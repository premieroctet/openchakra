const path=require('path')
const fs=require('fs').promises
const child_process = require('child_process')
const mongoose=require('mongoose')
const express = require('express')
const lodash=require('lodash')
const {HTTP_CODES}=require('../../utils/errors')

const router = express.Router()

const PRODUCTION_ROOT='/home/ec2-user/studio/'

const getModelAttributes = modelName => {
  const schema=mongoose.model(modelName).schema
  return Object.values(schema.paths)
    .filter(att => !att.path.startsWith('_'))
}

const getSimpleModelAttributes = modelName => {
  return getModelAttributes(modelName)
    .filter(att => att.instance != 'ObjectID')
    .map(att => [att.path, att.instance])
}

const getReferencedModelAttributes = modelName => {
  return getModelAttributes(modelName)
    .filter(att => att.instance == 'ObjectID')
    .map(att => getSimpleModelAttributes(att.options.ref)
      .map(([attName, instance]) => [`${att.path}.${attName}`, instance]))
}

router.get('/models', (req, res) => {
  const modelNames=lodash.sortBy(mongoose.modelNames())
  const result=[]
  modelNames.forEach(name => {
    result.push({name,
      attributes:Object.fromEntries(
        [...getSimpleModelAttributes(name), ...lodash.flatten(getReferencedModelAttributes(name))]
      )
    })
  })
  return res.json(result)
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

router.get('/:model', (req, res) => {
  const model=req.params.model
  const attributes=req.query.fields?.split(',') || []

  console.log(`Requesting model ${model}, attributes:${attributes}`)
  /** Simple fields */
  const modelSimpleFields=getSimpleModelAttributes(model).map(attDef => attDef[0])
  const modelRefFields=lodash.uniq(lodash.flatten(getReferencedModelAttributes(model)).map(attDef => attDef[0].split('.')[0]))

  const groupedAttributes=lodash(attributes).groupBy(
    att => (modelSimpleFields.includes(att.split('.')[0]) ? 'SIMPLE' : att.split('.')[0]))

  const fieldsFilter={'_id': true, ...lodash.fromPairs(groupedAttributes.get('SIMPLE', []).map(s => ([s, true])))}

  const populates=groupedAttributes.omit(['SIMPLE'])

  let query=mongoose.connection.models[model].find({}, {...fieldsFilter})
  query=populates.reduce((q, values, key) => q.populate({path: key, select: values.map(v => v.split('.')[1])}), query)
  query
    .then(data => res.json(data))
    .catch(err => {
      console.error(err)
      res.status(HTTP_CODES.SYSTEM_ERROR).json(err)
    })
})

module.exports=router
