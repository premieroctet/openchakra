const lodash = require('lodash')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const Session = require('../../server/models/Session')
const Resource = require('../../server/models/Resource')
const Theme = require('../../server/models/Theme')
const Program=require('../../server/models/Program')
const {getDatabaseUri} = require('../../config/config')

let progrResources=[]
let sessionResources=[]
let orphanThemesResources=[]
let orphanResources=[]
let allResources=[]

mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return Program.find().populate('themes')
      .then(programs => {
        progrResources=lodash.flattenDeep(programs.map(p => p.themes.map(t => t.resources)))
        console.log(`Program resources:${progrResources.length}`)
      })
  })
  .then(() => {
    return Session.find().populate('themes')
      .then(programs => {
        sessionResources=lodash.flattenDeep(programs.map(p => p.themes.map(t => t.resources)))
        console.log(`Session resources:${sessionResources.length}`)
      })
  })
  .then(() => {
    return Theme.find({origin: null})
      .then(themes => {
        orphanThemesResources=lodash.flattenDeep(themes.map(t => t.resources))
          .filter(r => !sessionResources.map(r => r._id.toString()).includes(r._id.toString()))
        console.log(`Theme resources:${orphanThemesResources.length}`)
      })
  })
  .then(() => {
    return Resource.find({origin: null})
      .then(res => {
        orphanResources=res
        console.log(`Orphan resources:${orphanResources.length}`)
      })
  })
  .then(() => {
    return Resource.find()
      .then(res => {
        allResources=res
        const resTotal=progrResources.length+sessionResources.length+orphanThemesResources.length+orphanResources.length
        console.log(`All resources:${allResources.length}`)
        console.log(`Total:${resTotal}`)
        console.log(`Diff:${resTotal-allResources.length}`)
      })
  })
  .catch(err => {
    console.error(err)
  })
  .finally(() => {
    process.exit(0)
  })
