const TraineeResource = require('../../server/models/TraineeResource');
const TraineeSession = require('../../server/models/TraineeSession');
const Trainingcenter = require('../../server/models/TrainingCenter');
const moment = require('moment');
const Session = require('../../server/models/Session');
const lodash=require('lodash')
const User = require('../../server/models/User');
const Resource = require('../../server/models/Resource');
const Theme = require('../../server/models/Theme');
const TraineeTheme = require('../../server/models/TraineeTheme');
const Program=require('../../server/models/Program')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {getDatabaseUri} = require('../../config/config')
const data=require('./populate.json')

const PASSWD="$2a$10$JMS3UfmkpDVM98R2CGRMU.KaxJh1LZs.PQdwkizTXrtZ3txAW0kiq"
const STORY_FILE= name => `https://my-alfred-data-test.s3.eu-west-3.amazonaws.com/pictures/${name}/story.html`

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

const generateProgramQuery = program => {
  let [p_code, p_name, designer_email, p_descr, t_name,  r_name]=program
  p_desc=p_descr.slice(0, 10)
  r_url=STORY_FILE(r_name)
  return Resource.findOneAndUpdate({url: r_url, name: r_name}, {$set:{url: r_url, code: `RES_${resssourceIdx}`, type: 'TP', short_name: r_name}}, {upsert: true, new: true})
    .then(res => {
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

const generateUsersQuery = user => {
  let [role, firstname, name, email, start, end]=user
  return User.findOneAndUpdate({email}, {role, firstname, name, email, password: PASSWD}, {upsert: true, new: true})
}

const generateSessionsQuery = (session, center) => {
  let [code_session, code_program, emails,start, end]=session
  emails=emails.split(',')
  return Promise.all([Program.findOne({code: code_program}), User.find({email: emails})])
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

const populateSessions = () => {
  return Session.find()
  .populate({path: 'program', populate:{path:'theme', popluate: 'resources'}})
    .then(sessions => {
      return sessions.map(session => {
        session.themes=session.program.themes
        return session.save()
      })
    })
}

const createTraineeResource = r => {
  return TraineeResource.create({
    name: r.name, short_name: r.name,
    code: r.code, description: r.description,
    type: r.type,url: r.url
  })
}

const createTraineeTheme = t => {
  return Promise.all(t.resources.map(r => createTraineeResource(r)))
  .then(resources => {
    return TraineeTheme.create({
      name: t.name, code: t.code,
      picture: t.picture, resources: resources
    })
  })
}

const generateTraineeSessions = () => {
  return Session.find()
    .populate({path: 'program', populate:{path:'themes', populate: 'resources'}})
    .then(sessions => {
      return Promise.all(sessions.map(session => {
        return Promise.all(session.trainees.map(trainee => {
          return Promise.all(session.program.themes.map(t => createTraineeTheme(t)))
            .then(themes => {
              return TraineeSession.create({
                name: session.name, description: session.program.description,
                trainee: trainee, session: session,
                themes: themes,
              })
            })
          }))
        }))
      })
}

let user=null
console.log(getDatabaseUri())
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return mongoose.connection.dropDatabase()
  })
  .then(() => {
    return Promise.all(data.programs.map(p => generateProgramQuery(p)))
  })
  .then(() => {
    return Promise.all(data.users.map(p => generateUsersQuery(p)))
  })
  .then(() => {
    return generateCenter()
  })
  .then(center => {
    return Promise.all(data.sessions.map(p => generateSessionsQuery(p, center)))
  })
  .then(() => {
    return generateTraineeSessions()
  })
  .then(res => {
    return Session.find().populate('trainees')
  })
  .then(res => {
    return Program.find().populate('designer')
  })
  .then(res => {
    return populateSessions()
  })
  .then(() => {
    return TraineeSession.find().populate('themes')
  })
  .then(res => {
    console.log('OK')
    process.exit(0)
  })
