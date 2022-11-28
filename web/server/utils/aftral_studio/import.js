const moment = require('moment');
const {
  APPRENANT,
  FORMATEUR,
  PASSWORD
} = require('../../../utils/aftral_studio/consts');
const { TEXT_TYPE } = require('../../../utils/consts');
const {promises: fs} = require('fs')
const bcrypt=require('bcryptjs')
const Session = require('../../models/Session')
const Program = require('../../models/Program')
const {cloneArray} = require('../database')
const User = require('../../models/User')
require('../../models/Theme')
require('../../models/Resource')
const {extractData, guessFileType} = require('../../../utils/import')

const upsertUser = ({firstname, lastname, email, password, role}) => {
  const hashedPassword=bcrypt.hashSync(password, 10)
  return User.findOneAndUpdate(
    {email},
    {firstname, name: lastname, email, password, role},
    {upsert: true, new: true},
  )
}

const upsertSession = ({programCode, sessionCode, newTrainee, newTrainer, sessionStart, sessionEnd}) => {
  let program=null
  return Session.findOne({code: sessionCode})
    .then(session => {
      if (!session || !session.program) {
        return Program.findOne({code: programCode})
          .populate({path: 'themes', populate: {path: 'resources'}})
          .then(res => {
            program=res
            if (!program) { throw new Error(`No program for code ${programCode}`) }
            return cloneArray({data: program.themes, withOrigin: false})
          })
      }
      return Promise.resolve(null)
    })
    .then(clone => {
      const dataSet={$set: {code: sessionCode, name: sessionCode, start: sessionStart, end: sessionEnd}, $addToSet:{}}
      if (program) {
        dataSet['$set'].program=program
      }
      if (sessionStart) {
        const startMoment=moment(sessionStart, 'DD-MM-YYYY')
        if (!startMoment.isValid()) {throw new Error(`Invalid session start date:${sessionStart}`)}
        dataSet['$set'].start=startMoment
      }
      if (sessionEnd) {
        const endMoment=moment(sessionEnd, 'DD-MM-YYYY')
        if (!endMoment.isValid()) {throw new Error(`Invalid session end date:${sessionEnd}`)}
        dataSet['$set'].end=moment(sessionStart, 'DD-MM-YYYY')
      }
      if (clone) {
        dataSet['$set'].themes=clone
      }
      if (newTrainer) {
        dataSet['$addToSet'].trainers=newTrainer
      }
      if (newTrainee) {
        dataSet['$addToSet'].trainees=newTrainee
      }

      return Session.findOneAndUpdate(
        {code: sessionCode},
        dataSet,
        {upsert: true, new: true},
      )
    })
}

const importTrainee = record => {
  let user=null
  return upsertUser({
    firstname: record.PRENOM_STAGIAIRE, lastname: record.NOM_STAGIAIRE,
    email: record.EMAIL_STAGIAIRE, password: record.REF_STAGIAIRE, role: APPRENANT,
  })
  .then(res => {
    user=res
    return upsertSession({
      programCode: record.CODE_PRODUIT, sessionCode: record.CODE_SESSION,
      sessionStart: record.DATE_DEBUT_SESSION, sessionEnd: record.DATE_FIN_SESSION,
      newTrainee: user
    })
  })
  .then(session => {
    user.sessions.push(session)
    return user.save()
  })
}

const importTrainees = filePath => {
  return fs.readFile(filePath)
    .then(buffer => {
      return extractData(buffer, {format: TEXT_TYPE, delimiter:';'})
    })
    .then(({records}) => {
      return Promise.all(records.map(record => importTrainee(record)))
    })
}

const importTrainer = record => {
  let formateur, program, session
  return upsertUser({
    firstname: record.PRENOM_FORMATEUR, lastname: record.NOM_FORMATEUR,
    email: record.EMAIL_FORMATEUR, password: PASSWORD, role: FORMATEUR,
  })
    .then(user => {
      console.log('upserted user')
      formateur=user
      return upsertSession({
        programCode: record.CODE_PRODUIT, sessionCode: record.CODE_SESSION,
        newTrainer: user,
      })
    })
    .then(session => {
      console.log(`Session:${session._id}`)
    })

}

const importTrainers = filePath => {
  return fs.readFile(filePath)
    .then(buffer => {
      return extractData(buffer, {format: TEXT_TYPE, delimiter:';'})
    })
    .then(({records}) => {
      return Promise.all(records.map(record => importTrainer(record)))
    })
}

module.exports={
  importTrainers,
  importTrainees,
}
