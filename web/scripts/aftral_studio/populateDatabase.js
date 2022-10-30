const { MONGOOSE_OPTIONS, cloneModel } = require('../../server/utils/database');
const Trainingcenter = require('../../server/models/TrainingCenter');
const moment = require('moment');
const Session = require('../../server/models/Session');
const lodash=require('lodash')
const User = require('../../server/models/User');
const Resource = require('../../server/models/Resource');
const Theme = require('../../server/models/Theme');
const Program=require('../../server/models/Program')
const PromiseSerial = require('promise-serial');
const mongoose = require('mongoose')
const {getDatabaseUri} = require('../../config/config')
const data=require('./populate.json')
const bcrypt=require('bcryptjs')

const PASSWD=bcrypt.hashSync("password", 10)
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
      }
      },
      {upsert: true, new:true}
    )
}

let resssourceIdx=0
let themeIdx=0

const generateProgram = program => {
  let [p_code, p_name, designer_email, p_descr, t_name,  r_name, r_url]=program
  console.log(`program:${p_name}`)
  p_desc=p_descr.slice(0, 10)
  return Resource.findOneAndUpdate(
    {url: r_url, name: r_name},
    {$set:{url: r_url, code: `RES_${resssourceIdx}`, type: 'TP', short_name: r_name}},
    {upsert: true, new: true})
    .then(res => {
      console.log(`Resource ok`)
      resssourceIdx = resssourceIdx +1
      return Theme.findOneAndUpdate({name: t_name}, {$set:{name: t_name, code: `TH_${themeIdx}`}, $addToSet:{resources: res}}, {upsert: true, new: true})
    })
    .then(res => {
      themeIdx = themeIdx+1
      return User.findOne({email: designer_email})
       .then( designer => {
         return Program.findOneAndUpdate(
           {name: p_name},
           {$set:{name: p_name, code: p_code, designer: designer, description: p_descr}, $addToSet:{themes: res}},
           {upsert: true, new: true}
         )
       })
    })
}

const generateUsers = user => {
  let [role, firstname, name, email, start, end]=user
  console.log(`User ${email}`)
  return User.findOneAndUpdate(
    {email},
    {role, firstname, name, email, password: PASSWD},
    {upsert: true, new: true}
  )
}

const generateSessions = (session, center) => {
  let [code_session, code_program, emails,start, end]=session
  emails=emails.split(',')
  return Promise.all([Program.findOne({code: code_program}), User.find({email: {$in: emails}})])
    .then(([program, users]) => {
      return Session.findOneAndUpdate(
        {code: code_session},
        {name: `${code_session}-${program.name}`,
        description: program.description,
          code: code_session, program: program, trainees: users,
          start:moment(start, 'DD/MM/YYYY'), end: moment(end, 'DD/MM/YYYY'), location: center},
        {upsert: true, new: true}
      )
    })
}

const createTraineeResource = r => {
  return cloneModel(r)
}

const createTraineeTheme = t => {
  return cloneModel(t)
}

const createTraineeSession = (session, trainee) => {
  return cloneModel({data: session, forceData:{trainee: trainee}})
}

const generateTraineeSessions = () => {
  return Session.find()
    .populate({path: 'program', populate:{path:'themes', populate: 'resources'}})
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
//await mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
await mongoose.connection.dropDatabase()
await PromiseSerial(data.programs.map(p => () => generateProgram(p)))
console.log(data.users)
await PromiseSerial(data.users.map(p => () => generateUsers(p)))
const center=await generateCenter()
console.log('sessions')
await Promise.all(data.sessions.map(p => generateSessions(p, center)))
await generateTraineeSessions()
await Session.find({}, {origin:1}).then(sessions => console.log(sessions))
}

run()
