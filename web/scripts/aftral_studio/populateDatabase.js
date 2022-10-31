const moment = require('moment')
const lodash=require('lodash')
const PromiseSerial = require('promise-serial')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {MONGOOSE_OPTIONS, cloneModel, cloneArray} = require('../../server/utils/database')
const Trainingcenter = require('../../server/models/TrainingCenter')
const Session = require('../../server/models/Session')
const User = require('../../server/models/User')
const Resource = require('../../server/models/Resource')
const Theme = require('../../server/models/Theme')
const Program=require('../../server/models/Program')
const {getDatabaseUri} = require('../../config/config')
const {addChild} = require('../../server/utils/studio/aftral/functions')
const data=require('./populate.json')

const PASSWD=bcrypt.hashSync('password', 10)
const STORY_FILE= name => `https://my-alfred-data-test.s3.eu-west-3.amazonaws.com/pictures/${name.replace(/ /g, '+')}/story.html`
const STD_FILE= name => `https://my-alfred-data-test.s3.eu-west-3.amazonaws.com/pictures/${name.replace(/ /g, '+')}`

const generateCenter = () => {
  return Trainingcenter.findOneAndUpdate(
    {code: 'MON'},
    {
      name: 'Monchy',
      code: 'MON',
      address: {
        address: '6 rue de la République',
        city: 'Monchy Saint Eloi',
        zip_code: '60290',
        country: 'France',
      },
    },
    {upsert: true, new: true},
  )
}

let resssourceIdx=0
let themeIdx=0

const createResource = data => {
  return Resource.findOneAndUpdate(
    {url: data.resource_url, name: data.resource_name},
    {$set: {url: data.resource_url, name: data.resource_name, code: `RES_${resssourceIdx}`, type: 'TP', short_name: data.resource_name}},
    {upsert: true, new: true})
}

const createTheme = data => {
  return Theme.findOneAndUpdate(
    {name: data.theme_name},
    {name: data.theme_name, code: `TH_${themeIdx}`},
    {upsert: true, new: true})
    .then(theme => {
      return Resource.findOne({name: data.resource_name})
        .then(res => {
          addChild(theme._id, res._id)
        })
    })
}

const generateProgram = data => {
  return User.findOne({email: data.designer})
    .then(designer => {
      return Program.findOneAndUpdate(
        {name: data.name},
        {name: data.name, code: data.code, designer: designer._id, description: data.description},
        {upsert: true, new: true},
      )
        .then(program => {
          Theme.findOne({name: data.theme_name})
            .then(theme => {
              addChild(program._id, theme._id)
            })
        })
    })
}

const createUser = data => {
  return User.findOneAndUpdate(
    {email: data.email},
    {role: data.role, firstname: data.firstname, name: data.name, email: data.email, password: PASSWD},
    {upsert: true, new: true},
  )
}

const createSession = (data, center) => {
  const emails=data.trainee.split(',')
  return Promise.all([Program.findOne({code: data.program_code}).populate({path: 'themes', populate: 'resources'}), User.find({email: {$in: emails}})])
    .then(([program, users]) => {
      return cloneArray({data: program.themes, withOrigin: false})
        .then(themes => {
          return Session.findOneAndUpdate(
            {code: data.code},
            {name: `${data.code}-${program.name}`,
              description: program.description,
              code: data.code, trainees: users,
              start: moment(data.start, 'DD/MM/YYYY'), end: moment(data.end, 'DD/MM/YYYY'), location: center, program: program._id,
              themes: themes.map(t => t._id)},
            {upsert: true, new: true},
          )
        })
    })
}

const createTraineeSession = (session, trainee) => {
  return cloneModel({data: session, forceData: {trainee: trainee, trainees: session.trainees}})
    .catch(err => { console.error(`${err}:${data}`) })
}

const generateTraineeSessions = () => {
  return Session.find()
    .populate({path: 'program', populate: {path: 'themes', populate: 'resources'}})
    .populate({path: 'themes', populate: 'resources'})
    .populate('trainees')
    .then(sessions => {
      return Promise.all(sessions.map(session => {
        return Promise.all(session.trainees.map(trainee => {
          return createTraineeSession(session, trainee)
        }))
      }))
    })
}

async function run() {
// await mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
  await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  await mongoose.connection.dropDatabase()
  await PromiseSerial(data.programs.map(p => () => createResource(p)))
  await PromiseSerial(data.programs.map(p => () => createTheme(p)))
  await PromiseSerial(data.users.map(p => () => createUser(p)))
  await PromiseSerial(data.programs.map(p => () => generateProgram(p)))
  const center=await generateCenter()
  await Promise.all(data.sessions.map(p => createSession(p, center)))
  await generateTraineeSessions()
  console.log('Terminé')
}

run()
