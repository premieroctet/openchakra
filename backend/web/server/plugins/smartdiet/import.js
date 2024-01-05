const fs=require('fs')
const lodash=require('lodash')
const moment=require('moment')
const {extractData, guessFileType, importData}=require('../../../utils/import')
const { guessDelimiter } = require('../../../utils/text')
const Company=require('../../models/Company')
const User=require('../../models/User')
const { ROLE_EXTERNAL_DIET, ROLE_CUSTOMER } = require('./consts')
const { CREATED_AT_ATTRIBUTE } = require('../../../utils/consts')
require('../../models/User')
require('../../models/Coaching')

const DEFAULT_PASSWORD='DEFAULT'

const computePseudo = record => {
  const letters=[record.firstname?.slice(0, 1), record.lastname?.slice(0, 2)].filter(v => !!v)
  return letters.join('').toUpperCase() || 'FAK'
}

const USER_MAPPING= company => ({
  role: () => ROLE_CUSTOMER,
  email: 'emailCanonical',
  firstname: ({record}) => record.firstname || 'inconnu',
  lastname: ({record}) => record.lastname || 'inconnu',
  dataTreatmentAccepted: () => true,
  cguAccepted: () => true,
  password: () => DEFAULT_PASSWORD,
  company: () => company,
  pseudo: ({record}) => computePseudo(record),
})

const USER_KEY='email'

const DIET_MAPPING={
  role: () => ROLE_EXTERNAL_DIET,
  password: () => DEFAULT_PASSWORD,
  firstname: 'firstname',
  lastname: 'lastname',
  email: ({record}) => `${record.firstname}.${record.lastname}@none.io`.toLowerCase().replace(/ /g, ''),
}

const DIETS_AGENDA_MAPPING={
  role: () => ROLE_EXTERNAL_DIET,
  email: ({record}) => `${record.PRENOM}.${record.NOM}@none.io`.toLowerCase().replace(/ /g, ''),
  smartagenda_id: 'AGENDA',
}

const COACHING_MAPPING={
  [CREATED_AT_ATTRIBUTE]: ({record}) => moment(record.orderdate)
}

const importUsers = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  const company=(await Company.update({name: 'Import'}, {name: 'Import'}, {upsert: true})).upserted[0]._id
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'user', data:records, mapping:USER_MAPPING(company), sourceKey: USER_KEY}))
}

const importDiets = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'user', data:records, mapping:DIET_MAPPING, sourceKey: USER_KEY}))
}

const importDietsAgenda = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'user', data:records, mapping:DIETS_AGENDA_MAPPING, sourceKey: USER_KEY}))
}

const importCoachings = async input_file => {
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'coaching', data:records, mapping:COACHING_MAPPING, sourceKey: CREATED_AT_ATTRIBUTE}))
}



module.exports={
  importUsers,
  importDiets,
  importDietsAgenda,
  importCoachings,
}