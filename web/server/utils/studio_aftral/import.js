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

const importSession = rawData => {
  return guessFileType(rawData)
    .then(format => {
      return extractData(rawData, {format: format, tab: 'Session_Formateur (1)'})
    })
    .then(({records}) => {
      return Promise.all(records.map(record => {
        let formateur, program, session
        return upsertUser({
          firstname: record.PRENOM_FORMATEUR, lastname: record.NOM_FORMATEUR,
          email: record.EMAIL_FORMATEUR, password: PASSWORD, role: FORMATEUR,
        })
          .then(user => {
            console.log('upserted user')
            formateur=user
            return Program.findOne({code: record.CODE_PRODUIT})
              .populate({path: 'themes', populate: {path: 'resources'}})
          })
          .then(res => {
            if (!res) { throw new Error(`No program for code ${record.CODE_PRODUIT}`) }
            program=res
            return cloneArray({data: program.themes, withOrigin: false})
          })
          .then(clone => {
            return Session.findOneAndUpdate(
              {code: record.CODE_SESSION},
              {
                $set: {
                  name: record.CODE_SESSION,
                  themes: clone,
                },
                $addToSet: {
                  trainers: formateur,
                },
              },
              {upsert: true, new: true},
            )
          })
          .then(session => {
            console.log(`Session:${session._id}`)
          })
      }))
    })
}

module.exports={importSession}
