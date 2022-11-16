const moment = require('moment')
const PromiseSerial = require('promise-serial')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {MONGOOSE_OPTIONS, cloneModel, cloneArray} = require('../../server/utils/database')
const TrainingCenter = require('../../server/models/TrainingCenter')
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
  console.log(`Creation ressource ${data.resource_name}`)
  return Resource.findOneAndUpdate(
    {name: data.resource_name},
    {$set: {url: data.resource_url, name: data.resource_name, code: `RES_${resssourceIdx}`, type: 'TP',
      short_name: data.resource_name}},
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

const createSession = (program, center) => {
  return User.find()
    .then(users => {
      return cloneArray({data: program.themes, withOrigin: false})
        .then(themes => {
          return Session.findOneAndUpdate(
            {code: program.code},
            {name: `${program.code}-${program.name}`,
              description: program.description,
              code: program.code, trainees: users.filter(u => u.role=='apprenant'),
              trainers: users.filter(u => u.role=='formateur'),
              start: moment(), end: moment().add(10, 'days'), location: center, program: program._id,
              themes: themes.map(t => t._id),
            },
            {upsert: true, new: true},
          )
            .then(s => {
              console.log(`Created session ${s}`)
              return s
            })
        })
    })
}

const createTraineeSession = (session, trainee) => {
  return User.findOneAndUpdate({_id: trainee}, {$addToSet: {sessions: session}})
}

const generateTraineeSessions = session => {
  return Session.findById(session._id)
    .populate('trainees')
    .then(session => {
      return Promise.all(session.trainees.map(trainee => {
        return createTraineeSession(session, trainee)
      }))
    })
}

async function run() {
  const program_name=process.argv[2]
  if (!program_name) {
    console.error(`No program name provided`)
    process.exit(1)
  }
  await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  const program=await Program.findOne({name: program_name})
    .populate({path: 'themes', populate: 'resources'})
  const center=await TrainingCenter.findOne()
  if (!program) {
    console.error(`No program with name ${program_name} found`)
    process.exit(1)
  }
  if (!center) {
    console.error(`No center found`)
    process.exit(1)
  }
  const session=await createSession(program, center)
  await generateTraineeSessions(session)
  console.log('Terminé')
}

run()
