const fs=require('fs')
const lodash=require('lodash')
const moment=require('moment')
const {extractData, guessFileType, importData}=require('../../../utils/import')
const { guessDelimiter } = require('../../../utils/text')
const Company=require('../../models/Company')
const User=require('../../models/User')
const AppointmentType=require('../../models/AppointmentType')
const { ROLE_EXTERNAL_DIET, ROLE_CUSTOMER, DIET_REGISTRATION_STATUS_ACTIVE, COMPANY_ACTIVITY_ASSURANCE } = require('./consts')
const { CREATED_AT_ATTRIBUTE } = require('../../../utils/consts')
const AppointmentTypeSchema = require('./schemas/AppointmentTypeSchema')
require('../../models/User')
require('../../models/Coaching')

const DEFAULT_PASSWORD='DEFAULT'
const COMPANY_NAME='COmpagnie import'
const PRESTATION_DURATION=45
const PRESTATION_NAME=`Générique ${PRESTATION_DURATION} minutes`
const PRESTATION_SMARTAGENDA_ID=-1

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
  migration_id: 'SDPATIENTID'
})

const USER_KEY='email'
const USER_MIGRATION_KEY='migration_id'

const DIET_MAPPING={
  role: () => ROLE_EXTERNAL_DIET,
  password: () => DEFAULT_PASSWORD,
  firstname: 'firstname',
  lastname: 'lastname',
  email: ({record}) => `${record.firstname}.${record.lastname}@none.io`.toLowerCase().replace(/ /g, ''),
  registration_status: () => DIET_REGISTRATION_STATUS_ACTIVE,
  migration_id: 'SDDIETID'
}

const DIET_MIGRATION_KEY='migration_id'

const DIETS_AGENDA_MAPPING={
  email: ({record}) => `${record.PRENOM}.${record.NOM}@none.io`.toLowerCase().replace(/ /g, ''),
  smartagenda_id: 'AGENDA',
  migration_id: 'AGENDA'
}

const AGENDA_IDENTITY_KEY=USER_KEY
const AGENDA_MIGRATION_KEY='migration_id'

const COACHING_MAPPING={
  [CREATED_AT_ATTRIBUTE]: ({record}) => moment(record.orderdate),
  user: ({cache, record}) => cache('user', record.SDPATIENTID),
  migration_id: 'SDPROGRAMID',
  diet: ({cache, record}) => cache('user', record.SDDIETID),
}

const COACHING_KEY=['user', CREATED_AT_ATTRIBUTE]
const COACHING_MIGRATION_KEY='migration_id'

const APPOINTMENT_MAPPING= prestation_id => ({
  coaching: ({cache, record}) => cache('coaching', record.SDPROGRAMID),
  start_date: 'date',
  end_date: ({record}) => moment(record.date).add(45, 'minutes'),
  synthesis: 'comment',
  appointment_type: () => prestation_id,
  migration_id: 'SDCONSULTID',
})

const APPOINTMENT_KEY=['coaching', 'start_date']
const APPOINTMENT_MIGRATION_KEY='migration_id'


const importUsers = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  let company=await Company.findOne({name: COMPANY_NAME})
  if (!company) {
    company=await Company.create({name: COMPANY_NAME, activity: COMPANY_ACTIVITY_ASSURANCE, size: 500})
  }
  company=company._id

  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => 
      importData({model: 'user', data:records, mapping:USER_MAPPING(company), identityKey: USER_KEY, migrationKey: USER_MIGRATION_KEY})
    )
}

const importDiets = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'user', data:records, mapping:DIET_MAPPING, identityKey: USER_KEY, migrationKey: USER_MIGRATION_KEY}))
}

const importDietsAgenda = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'user', data:records, mapping:DIETS_AGENDA_MAPPING, identityKey: USER_KEY, migrationKey:AGENDA_MIGRATION_KEY}))
}

const importCoachings = async input_file => {
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'coaching', data:records, mapping:COACHING_MAPPING, identityKey: COACHING_KEY, migrationKey: COACHING_MIGRATION_KEY}))
}

const importAppointments = async input_file => {
  // End deactivate password encryption
  let prestation=await AppointmentType.findOne({title: PRESTATION_NAME})
  if (!prestation) {
    prestation=await AppointmentType.create({title: PRESTATION_NAME, duration: PRESTATION_DURATION, smartagenda_id: PRESTATION_SMARTAGENDA_ID})
  }
  prestation=prestation._id

  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => 
      importData({model: 'appointment', data:records, mapping:APPOINTMENT_MAPPING(prestation), 
      identityKey: APPOINTMENT_KEY, migrationKey: APPOINTMENT_MIGRATION_KEY}
    ))
}



module.exports={
  importUsers,
  importDiets,
  importDietsAgenda,
  importCoachings,
  importAppointments,
}