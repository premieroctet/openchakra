const fs=require('fs')
const lodash=require('lodash')
const moment=require('moment')
const path=require('path')
const {extractData, guessFileType, importData, prepareCache}=require('../../../utils/import')
const { guessDelimiter } = require('../../../utils/text')
const Company=require('../../models/Company')
const User=require('../../models/User')
const AppointmentType=require('../../models/AppointmentType')
const { ROLE_EXTERNAL_DIET, ROLE_CUSTOMER, DIET_REGISTRATION_STATUS_ACTIVE, COMPANY_ACTIVITY_ASSURANCE, COMPANY_ACTIVITY_OTHER, CONTENTS_ARTICLE, CONTENTS_DOCUMENT, CONTENTS_VIDEO, CONTENTS_INFOGRAPHY, CONTENTS_PODCAST } = require('./consts')
const { CREATED_AT_ATTRIBUTE } = require('../../../utils/consts')
const AppointmentTypeSchema = require('./schemas/AppointmentTypeSchema')
require('../../models/User')
require('../../models/Coaching')
const Key=require('../../models/Key')

const DEFAULT_PASSWORD='DEFAULT'
const PRESTATION_DURATION=45
const PRESTATION_NAME=`Générique ${PRESTATION_DURATION} minutes`
const PRESTATION_SMARTAGENDA_ID=-1
const KEY_NAME='Clé import'


const fixDiets = async directory => {
  const CPINDEX=8
  const PATH=path.join(directory, 'smart_diets.csv')
  const contents=fs.readFileSync(PATH).toString()
  const splitted=contents.split('\n').map(l => l.split(';'))
  splitted.forEach((l, idx) => idx !=0 && !lodash.isEmpty(l[CPINDEX]) && l[CPINDEX].length==4 ? l[CPINDEX]+='0' : {})
  // console.log(splitted)
  const fixed_str=splitted.map(l => l.join(';')).join('\n')
  fs.writeFileSync(PATH, fixed_str)
}

const fixPatients = async directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''], [/orange\.f\\\n/g, 'orange.f'],
    [/\@hotmailfr"/g, '@hotmail.fr"'], [/\@orange\.f"/g, '@orange.fr"'], [/\@hotmail\.fr2/g, '@hotmail.fr'],
    [/\@gmailcom"/g, '@gmail.com"'], [/\@gmail\.c"/g, '@gmail.com"'], [/\@aolcom"/g, '@aol.com"'], [/\@orangefr"/g, '@orange.fr"'], 
    [/@sfr"/g, '@sfr.fr"'], [/\@yahoofr/g, "@yahoo.fr"], [/\@hotmailcom"/g, 'hotmail.com"'], [/\@neuffr"/g, '@neuf.fr"'], 
    [/\@msncom"/g, '@msn.com"'], [/\@gmail"/g, '@gmail.com"'], [/\@free.f"/g, '@free.fr"'], [/\@orange,fr/g, 'orange.fr'],
    [/\@live\.f"/g, '@live.fr"'], [/\@yahoo\.f"/g, '@yahoo.fr"'], [/francksurgis\.\@live\.fr/, 'francksurgis@live.fr'],
    [/\@outlook\.f"/g, '@outlook.fr"'], [/\@yahoo"/g, '@yahoo.fr"'], [/\@lapos"/g, '@laposte.net"'],

  ]
  const PATH=path.join(directory, 'smart_patient.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixAppointments = directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  const PATH=path.join(directory, 'smart_consultation.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixQuizz = directory => {
  const REPLACES=[
    [/.qui/g, 'Equi'], [/Végétariens\//g, 'Végétariens /'], [/Apéro \!/g, 'Apéro'], [/Fr.quences/g, 'Fréquences'],
  ]
  const PATH=path.join(directory, 'smart_quiz.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixFiles = async directory => {
  await fixDiets(directory)
  await fixPatients(directory)
  await fixAppointments(directory)
  await fixQuizz(directory)
}

const computePseudo = record => {
  const letters=[record.firstname?.slice(0, 1), record.lastname?.slice(0, 2)].filter(v => !!v)
  return letters.join('').toUpperCase() || 'FAK'
}

const COMPANY_MAPPING= {
  name: 'name',
  size: () => 1,
  activity: () => COMPANY_ACTIVITY_OTHER,
  migration_id: 'SDPROJECTID',
}

const COMPANY_KEY='name'
const COMPANY_MIGRATION_KEY='migration_id'

const USER_MAPPING={
  role: () => ROLE_CUSTOMER,
  email: 'emailCanonical',
  firstname: ({record}) => record.firstname || 'inconnu',
  lastname: ({record}) => record.lastname || 'inconnu',
  dataTreatmentAccepted: () => true,
  cguAccepted: () => true,
  password: () => DEFAULT_PASSWORD,
  company: ({cache, record}) => cache('company', record.SDPROJECTID),
  pseudo: ({record}) => computePseudo(record),
  migration_id: 'SDPATIENTID'
}

const USER_KEY='email'
const USER_MIGRATION_KEY='migration_id'

const DIET_MAPPING={
  role: () => ROLE_EXTERNAL_DIET,
  password: () => DEFAULT_PASSWORD,
  firstname: 'PRENOM',
  lastname: 'NOM',
  email: 'EMAIL',
  registration_status: () => DIET_REGISTRATION_STATUS_ACTIVE,
  smartagenda_id: 'ID AGENDA',
  migration_id: 'SDID',
  zip_code: 'CPCAB',
  address: 'VILLECAB',
}

const DIET_MIGRATION_KEY='migration_id'

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
  synthesis: 'comments',
  appointment_type: () => prestation_id,
  migration_id: 'SDCONSULTID',
})


const APPOINTMENT_KEY=['coaching', 'start_date']
const APPOINTMENT_MIGRATION_KEY='migration_id'

const MEASURE_MAPPING={
  migration_id: 'SDCONSULTID',
  date: ({cache, record}) => cache('consultation_date', record.SDCONSULTID),
  chest: 'chest',
  waist: 'waist',
  hips: 'pelvis',
  thighs: ({record}) => lodash.mean([parseInt(record.leftthigh), parseInt(record.rightthigh)].filter(v => !!v)) || undefined,
  arms: () => undefined,
  weight: 'weight',
  user:({cache, record}) => cache('consultation_patient', record.SDCONSULTID),
}

const MEASURE_MAPPING_KEY='migration_id'
const MEASURE_MAPPING_MIGRATION__KEY='migration_id'

const progressCb = step => (index, total)=> {
  step=step||1
  if (step && index%step==0) {
    console.log(`${index}/${total}`)
  }
}

const importCompanies = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => 
      importData({model: 'company', data:records, mapping:COMPANY_MAPPING, identityKey: COMPANY_KEY, 
        migrationKey: COMPANY_MIGRATION_KEY, progressCb: progressCb()}))
}


const importUsers = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => 
      importData({model: 'user', data:records, mapping:USER_MAPPING, identityKey: USER_KEY, 
        migrationKey: USER_MIGRATION_KEY, progressCb: progressCb(2000)})
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

const importCoachings = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'coaching', data:records, mapping:COACHING_MAPPING, 
    identityKey: COACHING_KEY, migrationKey: COACHING_MIGRATION_KEY, progressCb: progressCb(1000)}))
}

const importAppointments = async input_file => {
  let prestation=await AppointmentType.findOne({title: PRESTATION_NAME})
  if (!prestation) {
    prestation=await AppointmentType.create({title: PRESTATION_NAME, duration: PRESTATION_DURATION, 
      smartagenda_id: PRESTATION_SMARTAGENDA_ID})
  }
  prestation=prestation._id

  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => 
      importData({model: 'appointment', data:records, mapping:APPOINTMENT_MAPPING(prestation), 
      identityKey: APPOINTMENT_KEY, migrationKey: APPOINTMENT_MIGRATION_KEY, progressCb: progressCb(2000)}
    ))
}

const importMeasures = async input_file => {
  return prepareCache()
    .then(() => {
      const contents=fs.readFileSync(input_file)
      return Promise.all([guessFileType(contents), guessDelimiter(contents)])
      .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
      .then(({records}) => 
        importData({
          model: 'measure', data:records, mapping:MEASURE_MAPPING, identityKey: MEASURE_MAPPING_KEY, 
          migrationKey: MEASURE_MAPPING_MIGRATION__KEY, progressCb: progressCb(2000)
        })
      )
    })
  }


module.exports={
  importCompanies,
  importUsers,
  importDiets,
  importCoachings,
  importAppointments,
  importMeasures,
  fixFiles,
}