const { APPRENANT } = require('../../../utils/aftral_studio/consts');

const Session = require('../../models/Session')
const Program = require('../../models/Program')
const {cloneArray} = require('../database')
const User = require('../../models/User')
require('../../models/Theme')
require('../../models/Resource')
const {FORMATEUR, PASSWORD} = require('../../../utils/aftral_studio/consts')
const {extractData, guessFileType} = require('../../../utils/import')

const upsertUser = ({firstname, lastname, email, password, role}) => {
  return User.findOneAndUpdate(
    {email},
    {firstname, name: lastname, email, password, role},
    {upsert: true, new: true},
  )
}

const upsertSession = ({programCode, sessionCode, newTrainee, newTrainer, sessionStart, sessionEnd}) => {
  let program
  return Program.findOne({code: programCode})
    .populate({path: 'themes', populate: {path: 'resources'}})
    .then(res => {
      program=res
      if (!program) { throw new Error(`No program for code ${programCode}`) }
      return cloneArray({data: program.themes, withOrigin: false})
    })
    .then(clone => {
      const dataSet={$set: {name: sessionCode,program: program, themes: clone}, $addToSet:{}}
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

const importTrainees = rawData => {
  return guessFileType(rawData)
    .then(format => {
      return extractData(rawData, {format: format, tab: 'Apprenant_20221122_0506'})
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

const importTrainers = rawData => {
  return guessFileType(rawData)
    .then(format => {
      return extractData(rawData, {format: format, tab: 'Session_Formateur (1)'})
    })
    .then(({records}) => {
      return Promise.all(records.map(record => importTrainer(record)))
    })
}

module.exports={
  importTrainers,
  importTrainees,
}
