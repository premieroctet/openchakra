const moment = require('moment');
const Session = require('../../server/models/Session');

const User = require('../../server/models/User');
const Resource = require('../../server/models/Resource');
const Theme = require('../../server/models/Theme');
const Program=require('../../server/models/Program')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {getDatabaseUri} = require('../../config/config')
const data=require('./populate.json')

const PASSWD="$2a$10$JMS3UfmkpDVM98R2CGRMU.KaxJh1LZs.PQdwkizTXrtZ3txAW0kiq"
const STORY_FILE= name => `https://my-alfred-data-test.s3.eu-west-3.amazonaws.com/pictures/${name}/story.html`

const generateProgramQuery = program => {
  let [p_code, p_name, designer_email, p_descr, t_name,  r_url]=program
  p_desc=p_descr.slice(0, 10)
  r_url=STORY_FILE(r_url)
  return Resource.findOneAndUpdate({url: r_url}, {$set:{url: r_url}}, {upsert: true, new: true})
    .then(res => {
      return Theme.findOneAndUpdate({name: t_name}, {$set:{name: t_name}, $addToSet:{resources: res}}, {upsert: true, new: true})
    })
    .then(res => {
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

const generateUsersQuery = user => {
  let [role, firstname, name, email, start, end]=user
  return User.findOneAndUpdate({email}, {role, firstname, name, email, password: PASSWD}, {upsert: true, new: true})
}

const generateSessionsQuery = session => {
  let [code_session, code_program, emails,start, end]=session
  emails=emails.split(',')
  return Promise.all([Program.findOne({code: code_program}), User.find({email: emails})])
    .then(([program, users]) => {
      return Session.findOneAndUpdate(
        {code: code_session},
        {code: code_session, program: program, trainees: users,
          start:moment(start, 'DD/MM/YYYY'), end: moment(end, 'DD/MM/YYYY')},
        {upsert: true, new: true}
      )
    })
}

let user=null
console.log(getDatabaseUri())
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return Promise.all(data.programs.map(p => generateProgramQuery(p)))
  })
  .then(() => {
    return Promise.all(data.users.map(p => generateUsersQuery(p)))
  })
  .then(() => {
    return Promise.all(data.sessions.map(p => generateSessionsQuery(p)))
  })
  .then(res => {
    return Session.find().populate('trainees')
  })
  .then(res => {
    return Program.find().populate('designer')
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
