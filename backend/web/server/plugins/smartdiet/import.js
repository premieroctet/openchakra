const fs=require('fs')
const siret = require('siret')
const lodash=require('lodash')
const moment=require('moment')
const path=require('path')
const crypto = require('crypto')
const {extractData, guessFileType, importData, cache, setCache}=require('../../../utils/import')
const { guessDelimiter } = require('../../../utils/text')
const Company=require('../../models/Company')
const User=require('../../models/User')
const AppointmentType=require('../../models/AppointmentType')
const { ROLE_EXTERNAL_DIET, ROLE_CUSTOMER, DIET_REGISTRATION_STATUS_ACTIVE, COMPANY_ACTIVITY_ASSURANCE, COMPANY_ACTIVITY_OTHER, CONTENTS_ARTICLE, CONTENTS_DOCUMENT, CONTENTS_VIDEO, CONTENTS_INFOGRAPHY, CONTENTS_PODCAST, QUIZZ_TYPE_PATIENT, QUIZZ_QUESTION_TYPE_ENUM_SINGLE, QUIZZ_TYPE_PROGRESS, COACHING_QUESTION_STATUS, COACHING_QUESTION_STATUS_NOT_ADDRESSED, COACHING_QUESTION_STATUS_NOT_ACQUIRED, COACHING_QUESTION_STATUS_IN_PROGRESS, COACHING_QUESTION_STATUS_ACQUIRED, GENDER_MALE, GENDER_FEMALE, COACHING_STATUS_NOT_STARTED, QUIZZ_TYPE_ASSESSMENT, DIET_REGISTRATION_STATUS_REFUSED } = require('./consts')
const { CREATED_AT_ATTRIBUTE, TEXT_TYPE } = require('../../../utils/consts')
const AppointmentTypeSchema = require('./schemas/AppointmentTypeSchema')
const Key=require('../../models/Key')
const QuizzQuestion = require('../../models/QuizzQuestion')
require('../../models/UserQuizz')
require('../../models/UserQuizzQuestion')
require('../../models/Conversation')
require('../../models/Message')
require('../../models/Target')
const Quizz = require('../../models/Quizz')
const Coaching = require('../../models/Coaching')
const { idEqual } = require('../../utils/database')
const Appointment = require('../../models/Appointment')
const UserSurvey = require('../../models/UserSurvey')
const { runPromisesWithDelay } = require('../../utils/concurrency')
const NodeCache = require('node-cache')
const Offer = require('../../models/Offer')
const { updateCoachingStatus } = require('./coaching')
const { DefaultDeserializer } = require('v8')
const { isPhoneOk } = require('../../../utils/sms')
const UserQuizzQuestion = require('../../models/UserQuizzQuestion')

const DEFAULT_PASSWORD='DEFAULT'
const PRESTATION_DURATION=45
const PRESTATION_NAME=`Générique ${PRESTATION_DURATION} minutes`
const PRESTATION_SMARTAGENDA_ID=-1
const KEY_NAME='Clé import'

const QUIZZ_FACTOR=100

const normalizeTel = tel => {
  if (tel?.length==9) {
    tel=`0${tel}`
  }
  if (!isPhoneOk(tel)) {
    tel=null
  }
  return tel
}

const fixPatients = async directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''], [/orange\.f\\\n/g, 'orange.f'],
    [/\@hotmailfr"/g, '@hotmail.fr"'], [/\@orange\.f"/g, '@orange.fr"'], [/\@hotmail\.fr2/g, '@hotmail.fr'],
    [/\@gmailcom"/g, '@gmail.com"'], [/\@gmail\.c"/g, '@gmail.com"'], [/\@aolcom"/g, '@aol.com"'], [/\@orangefr"/g, '@orange.fr"'], 
    [/@sfr"/g, '@sfr.fr"'], [/\@yahoofr/g, "@yahoo.fr"], [/\@hotmailcom"/g, 'hotmail.com"'], [/\@neuffr"/g, '@neuf.fr"'], 
    [/\@msncom"/g, '@msn.com"'], [/\@gmail"/g, '@gmail.com"'], [/\@free.f"/g, '@free.fr"'], [/\@orange,fr/g, 'orange.fr'],
    [/\@live\.f"/g, '@live.fr"'], [/\@yahoo\.f"/g, '@yahoo.fr"'], [/francksurgis\.\@live\.fr/, 'francksurgis@live.fr'],
    [/\@outlook\.f"/g, '@outlook.fr"'], [/\@yahoo"/g, '@yahoo.fr"'], [/\@lapos"/g, '@laposte.net"'], [/\@lapost"/g, '@laposte.net"'],
    [/yanis69240hotmail.com/, 'yanis69240@hotmail.com']

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
    [/.quilibre/g, 'Equilibre'], [/\/ Vegan/g, '/Vegan'], [/Apéro \!/g, 'Apéro'], [/Fr.quences/g, 'Fréquences'],
    [/.quivalences/g, 'Equivalences'],
  ]
  const PATH=path.join(directory, 'smart_quiz.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixQuizzQuestions = directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  const PATH=path.join(directory, 'smart_question.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixObjectives = directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  const PATH=path.join(directory, 'smart_objective.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixMessages = directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  const PATH=path.join(directory, 'smart_message.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixSummary = directory => {
  const REPLACES=[ [/\r/g, ''], [/\\"/g, "'"], [/\\\\/g, ''],]
  const PATH=path.join(directory, 'smart_summary.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const fixSpecs = directory => {
  const REPLACES=[
    ['Allergies et intolérances alim', 'Gluten'],
    ['Autres troubles de santé (pathologies)','Hypertension Artérielle (HTA)'],
    [ 'Maternité', 'Grossesse' ],
    [ 'Perte de poids', 'Perdre du poids' ],
    [ 'Prise de poids', 'Prendre du poids' ],
    [ 'Rééquilibrage alimentaire', 'Rééquilibrage alimentaire' ],
    [ 'Sportifs', 'Compétition' ],
    [ 'TCA / Comportemental', 'Compulsion alimentaire' ],
    [ 'Troubles digestifs', 'Syndrome de l’intestin irritable (SII)' ],
    [ 'Troubles hormonaux', 'Hyperthyroïdie' ],
    [ 'Végétariens et végétaliens', 'Végétarisme' ]
  ]
  const PATH=path.join(directory, 'smart_spec.csv')
  const contents=fs.readFileSync(PATH).toString()
  let fixed=contents
  REPLACES.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  fs.writeFileSync(PATH, fixed)
}

const loadRecords = async path =>  {
  const contents=fs.readFileSync(path)
  const {records} = await extractData(contents, {format: TEXT_TYPE, delimiter: ';'})
  return records
}

const getMessageId = (threadId, date) => {
  return `${threadId}${moment(date).unix()}`
}

const generateMessages = async directory =>{
  const THREADS=path.join(directory, 'smart_thread.csv')
  const MESSAGES=path.join(directory, 'smart_message.csv')
  const records=await loadRecords(MESSAGES)
  const conversations=lodash(records)
    .groupBy('SDTHREADID')
    .mapValues(msgs => lodash.uniq(msgs.map(m => m.SDSENDERID)))
    .entries()
    .filter(([threadId, users]) => users.length==2)
    .fromPairs()
    .value()
  
  // Generate conversation
  const convContents=['SDTHREADID;USER1;USER2']
  Object.entries(conversations).forEach(conv => convContents.push([conv[0], conv[1][0], conv[1][1]].join(';')))
  fs.writeFileSync(path.join(directory, 'conversation.csv'), convContents.join('\n'))

  // Generate messages
  const messContents=['MESSAGEID;SDTHREADID;SENDER;RECEIVER;DATE;MESSAGE']
  records.forEach(message => {
    const users=conversations[message.SDTHREADID]
    if (users) {
      const sender=message.SDSENDERID
      const receiver=users[0]==sender ? users[1] : users[0]
      const msgId=getMessageId(message.SDTHREADID, message.datetime)
      messContents.push([msgId,message.SDTHREADID,sender, receiver, message.datetime, message.message].join(';'))
    }
  })
  fs.writeFileSync(path.join(directory, 'message.csv'), messContents.join('\n'))
}

const generateProgress = async directory => {
  const consulPath=path.join(directory, 'smart_consultation.csv')
  const consultProgressPath = path.join(directory, 'smart_consultation_progress.csv')
  const outputPath = path.join(directory, 'progress.csv')
  
  console.time('Progress')
  let consultations=await loadRecords(consulPath)
  let progress=await loadRecords(consultProgressPath)

  progress=lodash(progress)
    .groupBy('CONSULTID')
    .mapValues(criteria => Object.fromEntries(criteria.map(c => [c.SDCRITERIAID, c.status])))
    .value()


  consultations=lodash(consultations)
    .groupBy('SDPROGRAMID')
    .mapValues(consults => lodash.orderBy(consults, c => moment(c.date)))
    .mapValues(consults => consults.map(c => progress[c.SDCONSULTID]).filter(v => !!v))
    .pickBy(consults => consults.length>0)
    .mapValues(criterions => lodash.assign({}, ...criterions))

  // console.log(consultations.value())
  let res=['SDPROGRAMID;SDCRITERIAID;status']
  consultations.entries().value()
    .forEach(([program, obj]) => {
      Object.entries(obj).forEach(([crit, status])=> {
        res.push(`${program};${crit};${status}`)
      })
    })
  fs.writeFileSync(outputPath, res.join('\n'))
  console.timeEnd('Progress')
}

const fixFiles = async directory => {
  console.log('Fixing files')
  await fixPatients(directory)
  await fixAppointments(directory)
  await fixQuizz(directory)
  await fixQuizzQuestions(directory)
  await fixObjectives(directory)
  await fixMessages(directory)
  await fixSummary(directory)
  await generateMessages(directory)
  await fixSpecs(directory)
  await generateProgress(directory)
  console.log('Fixed files')
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

const SMART_OFFER_MAPPING= {
  1 : {name: 'Offre bilan', coaching_credit: 1, duration: 1*30},
  2 : {name: 'Offre un mois', coaching_credit: 2, duration: 1*30},
  3:  {name: 'Offre 3 mois', coaching_credit: 4, duration: 3*30},
  4:  {name: 'Offre 6 mois', coaching_credit: 7, duration: 6*30},
  10: {name: 'Offre illimitée', coaching_credit: 99, duration: 99*30},
}

const OFFER_MAPPING= {
  name: ({record}) => SMART_OFFER_MAPPING[record.SDPROGRAMTYPE]?.name,
  price: () => 1,
  groups_credit: () => 0,
  nutrition_credit: () => 3,
  duration: ({record}) => SMART_OFFER_MAPPING[record.SDPROGRAMTYPE]?.duration,
  coaching_credit: ({record}) => SMART_OFFER_MAPPING[record.SDPROGRAMTYPE]?.coaching_credit,
  infographies_unlimited: () => true,
  infographies_unlimited: () => true,
  articles_unlimited: () => true,
  podcasts_unlimited: () => true,
  video_unlimited: () => true,
  webinars_credit: () => 4,
  company: ({cache, record}) => cache('company', record.SDPROJECTID),
  validity_start: () => moment(),
  assessment_quizz: async () => await Quizz.findOne({type: QUIZZ_TYPE_ASSESSMENT}),
  migration_id: 'SDPROGRAMTYPE',
}

const OFFER_KEY='name'
const OFFER_MIGRATION_KEY='migration_id'

const GENDER_MAPPING={
  M: GENDER_MALE,
  F: GENDER_FEMALE,
}

const PATIENT_MAPPING={
  role: () => ROLE_CUSTOMER,
  email: 'emailCanonical',
  firstname: ({record}) => record.firstname || 'inconnu',
  lastname: ({record}) => record.lastname || 'inconnu',
  dataTreatmentAccepted: () => true,
  cguAccepted: () => true,
  password: () => DEFAULT_PASSWORD,
  company: ({cache, record}) => cache('company', record.SDPROJECTID),
  pseudo: ({record}) => computePseudo(record),
  gender: ({record}) => GENDER_MAPPING[record.gender],
  birthday: ({record}) => lodash.isEmpty(record.birthdate) ? null:  moment(record.birthdate),
  phone: ({record}) => normalizeTel(record.phone),
  migration_id: 'SDPATIENTID',
  source: () => 'import',
}

const PATIENT_KEY='email'
const PATIENT_MIGRATION_KEY='migration_id'

const HEIGHT_MAPPING={
  migration_id: 'patient_id',
  _id: ({cache, record}) => cache('user', record.patient_id),
  height: 'height',
}

const HEIGHT_KEY='_id'
const HEIGHT_MIGRATION_KEY='migration_id'

const DIET_MAPPING={
  role: () => ROLE_EXTERNAL_DIET,
  password: () => DEFAULT_PASSWORD,
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  smartagenda_id: 'smartagendaid',
  migration_id: 'SDID',
  zip_code: ({record}) => record.cp?.length==4 ? record.cp+'0' : record.cp,
  address: 'address',
  phone: ({record}) => normalizeTel(record.TEL),
  adeli: 'adelinumber',
  city: 'city',
  siret: ({record}) => siret.isSIRET(record.siret)||siret.isSIREN(record.siret) ? record.siret : null,
  birthday: 'birthdate',
  [CREATED_AT_ATTRIBUTE]: ({record}) => moment(record['created_at']),
  registration_status: ({record}) => +record.enabled==1 ? DIET_REGISTRATION_STATUS_ACTIVE : DIET_REGISTRATION_STATUS_REFUSED,
  diet_coaching_enabled: ({record}) => +record.hasteleconsultation==1,
  diet_visio_enabled: ({record}) => +record.easewithconfs==1,
  diet_site_enabled: ({record}) => +record.hasatelier==1,
  diet_admin_comment: 'comments',
  description: 'annonce',
  source: () => 'import',
}

const DIET_KEY='email'
const DIET_MIGRATION_KEY='migration_id'

const COACHING_MAPPING={
  [CREATED_AT_ATTRIBUTE]: ({record}) => moment(record.orderdate),
  user: ({cache, record}) => cache('user', record.SDPATIENTID),
  offer: ({cache, record}) => cache('offer', record.SDPROGRAMTYPE),
  migration_id: 'SDPROGRAMID',
  diet: ({cache, record}) => cache('user', record.SDDIETID),
  smartdiet_patient_id: 'SDPATIENTID',
}

const COACHING_KEY=['user', CREATED_AT_ATTRIBUTE]
const COACHING_MIGRATION_KEY='migration_id'

const APPOINTMENT_MAPPING= prestation_id => ({
  coaching: ({cache, record}) => cache('coaching', record.SDPROGRAMID),
  start_date: 'date',
  end_date: ({record}) => moment(record.date).add(45, 'minutes'),
  note: 'comments',
  appointment_type: () => prestation_id,
  migration_id: 'SDCONSULTID',
  diet: async ({cache, record}) => {
    let diet=cache('user', record.SDDIETID)
    if (!diet) {
      diet=(await Coaching.findById(cache('coaching', record.SDPROGRAMID), {diet:1}))?.diet
    }
    return diet
  },
  user: async ({cache, record}) => (await Coaching.findById(cache('coaching', record.SDPROGRAMID), {user:1}))?.user,
  validated: ({record}) => +record.status>1,
})


const APPOINTMENT_KEY=['coaching', 'start_date']
const APPOINTMENT_MIGRATION_KEY='migration_id'

const MEASURE_MAPPING={
  migration_id: 'SDCONSULTID',
  date: async ({cache, record}) => (await Appointment.findById(cache('appointment', record.SDCONSULTID), {start_date:1}))?.start_date,
  chest: 'chest',
  waist: 'waist',
  hips: 'pelvis',
  thighs: ({record}) => lodash.mean([parseInt(record.leftthigh), parseInt(record.rightthigh)].filter(v => !!v)) || undefined,
  arms: () => undefined,
  weight: 'weight',
  user: async ({cache, record}) => (await Appointment.findById(cache('appointment', record.SDCONSULTID), {user:1}))?.user,
}

const MEASURE_MAPPING_KEY='migration_id'
const MEASURE_MAPPING_MIGRATION__KEY='migration_id'

const QUIZZ_MAPPING={
  migration_id: 'SDQUIZID',
  name: 'name',
  type: () => QUIZZ_TYPE_PATIENT,
}

const QUIZZ_KEY='name'
const QUIZZ_MIGRATION_KEY='migration_id'

const QUIZZQUESTION_MAPPING={
  migration_id: ({record}) => parseInt(record.SDQUIZID)*QUIZZ_FACTOR+parseInt(record.position),
  title: ({record}) => record.question.replace(/[\r\n\\]/g, ''),
  success_message: ({record}) => `Bravo! ${record.comments}`,
  error_message: ({record}) => `Dommage! ${record.comments}`,
  type: () => QUIZZ_QUESTION_TYPE_ENUM_SINGLE,
}

const QUIZZQUESTION_KEY='title'
const QUIZZQUESTION_MIGRATION_KEY='migration_id'

const QUIZZANSWER_1_MAPPING={
  migration_id: ({record}) => (parseInt(record.SDQUIZID)*QUIZZ_FACTOR+parseInt(record.position))*QUIZZ_FACTOR+1,
  quizzQuestion: ({record, cache}) => {
    const question_migration_id=parseInt(record.SDQUIZID)*QUIZZ_FACTOR+parseInt(record.position)
    return cache('quizzQuestion', question_migration_id)
  },
  text: 'firstanswer',
}

const QUIZZANSWER_1_KEY=['text', 'quizzQuestion']
const QUIZZANSWER_1_MIGRATION_KEY='migration_id'

const QUIZZANSWER_2_MAPPING={
  migration_id: ({record}) => (parseInt(record.SDQUIZID)*QUIZZ_FACTOR+parseInt(record.position))*QUIZZ_FACTOR+1,
  quizzQuestion: ({record, cache}) => {
    const question_migration_id=parseInt(record.SDQUIZID)*QUIZZ_FACTOR+parseInt(record.position)
    return cache('quizzQuestion', question_migration_id)
  },
  text: 'secondanswer',
}

const QUIZZANSWER_2_KEY=['text', 'quizzQuestion']
const QUIZZANSWER_2_MIGRATION_KEY='migration_id'


const hashStringToDecimal = inputString => {
  const hash = crypto.createHash('sha256')
  hash.update(inputString)
  const hashedString = hash.digest('hex')
  const decimalNumber = BigInt('0x' + hashedString)
  const res=parseInt(decimalNumber%BigInt(1000000000))
  return res
}

const KEY_MAPPING={
  migration_id: ({record}) => hashStringToDecimal(record.name),
  name: 'smartpoint',
  text: 'secondanswer',
}

const KEY_KEY='name'
const KEY_MIGRATION_KEY='migration_id'


const ASSESSMENT_MAPPING={
  migration_id: ({record, cache}) => cache('usercoaching', record.SDPATIENTID),
  smartdiet_assessment_id: 'SDSUMMARYID',
}

const ASSESSMENT_KEY='smartdiet_assessment_id'
const ASSESSMENT_MIGRATION_KEY='migration_id'

const IMPACT_MAPPING={
  migration_id: ({record, cache}) => cache('usercoaching', record.SDPATIENTID),
  smartdiet_impact_id: 'SDSECONDSUMMARYID',
}

const IMPACT_KEY='smartdiet_impact_id'
const IMPACT_MIGRATION_KEY='migration_id'

const CONVERSATION_MAPPING={
  migration_id: 'SDTHREADID',
  users: ({cache, record}) => [cache('user', record.USER1), cache('user', record.USER2)],
}

const CONVERSATION_KEY='migration_id'
const CONVERSATION_MIGRATION_KEY='migration_id'

const MESSAGE_MAPPING={
  migration_id: ({record}) => getMessageId(record.SDTHREADID, record.DATE),
  conversation: ({cache, record}) => cache('conversation', record.SDTHREADID),
  receiver: ({cache, record}) => cache('user', record.RECEIVER),
  sender: ({cache, record}) => cache('user', record.SENDER),
  content: 'MESSAGE',
  [CREATED_AT_ATTRIBUTE]: 'DATE',
}

const MESSAGE_KEY='migration_id'
const MESSAGE_MIGRATION_KEY='migration_id'

const SPEC_MAPPING={
  migration_id: 'SPECID',
  name: 'name',
}

const SPEC_KEY='name'
const SPEC_MIGRATION_KEY='migration_id'

const progressCb = step => (index, total)=> {
  step=step||Math.floor(total/10)
  if (step && index%step==0) {
    console.log(`${index}/${total}`)
  }
}

const updateImportedCoachingStatus = async () => {
  const coachings=await Coaching.find({status: COACHING_STATUS_NOT_STARTED, migration_id: {$ne: null}}, {_id:1})
  const step=Math.floor(coachings.length/20)
  await runPromisesWithDelay(coachings.map((coaching, idx) => () => {
    if (idx%step==0) {
      console.log(idx, '/', coachings.length, '(', Math.ceil(idx/coachings.length*100),'%)')
    }
    return updateCoachingStatus(coaching._id)
      .catch(err => console.error(`Coaching ${coaching._id}:${err}`))
  }))
}

const updateDietCompanies = async () => {
  const diets=await User.find({role: ROLE_EXTERNAL_DIET, 'customer_companies.0': {$exists: false}})
  console.log('Updating', diets.length, 'diets companies')
  const res=await runPromisesWithDelay(diets.map(diet => async () => {
    const appts=await Appointment.find({diet}).populate('user')
    const companies=lodash(appts).map(appt => appt.user.company._id).uniq()
    await User.findByIdAndUpdate(diet, {$addToSet: {customer_companies: companies.value()}})
  }))
}

const importCompanies = async input_file => {
  return loadRecords(input_file)
    .then(records => 
      importData({model: 'company', data:records, mapping:COMPANY_MAPPING, identityKey: COMPANY_KEY, 
        migrationKey: COMPANY_MIGRATION_KEY, progressCb: progressCb()}))
}

const importOffers = async input_file => {
  return loadRecords(input_file)
    .then(records => {
      records=lodash.uniqBy(records, 'SDPROGRAMTYPE')
      return importData({model: 'offer', data:records, mapping:OFFER_MAPPING, identityKey: OFFER_KEY, 
        migrationKey: OFFER_MIGRATION_KEY, progressCb: progressCb()})
    })
}


const importPatients = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => 
      importData({model: 'user', data:records, mapping:PATIENT_MAPPING, identityKey: PATIENT_KEY, 
        migrationKey: PATIENT_MIGRATION_KEY, progressCb: progressCb()})
    )
}

const importDiets = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  return loadRecords(input_file)
    .then(records =>  importData({
      model: 'user', data:records, mapping:DIET_MAPPING, identityKey: DIET_KEY, migrationKey: DIET_MIGRATION_KEY
    }))
}

const ensureProgress = (coaching, progressTmpl) => {
  if (coaching.progress) {
    return Promise.resolve(coaching)
  }
  return progressTmpl.cloneAsUserQuizz()
    .then(prg => {
      coaching.progress=prg
      return coaching.save()
    })
}

const ensureSurvey = coaching => {
  return UserSurvey.updateOne(
    {user: coaching.user},
    {user: coaching.user},
    {upsert: true}
  )
}


const importCoachings = async input_file => {
  return loadRecords(input_file)
    .then(records => {
      // Map SM patient to its SM coaching
      records.forEach(record => setCache('usercoaching', record.SDPATIENTID, record.SDPROGRAMID))
      return importData({model: 'coaching', data:records, mapping:COACHING_MAPPING, 
      identityKey: COACHING_KEY, migrationKey: COACHING_MIGRATION_KEY, progressCb: progressCb()})
    })
}

const importAppointments = async input_file => {
  let prestation=await AppointmentType.findOne({title: PRESTATION_NAME})
  if (!prestation) {
    prestation=await AppointmentType.create({title: PRESTATION_NAME, duration: PRESTATION_DURATION, 
      smartagenda_id: PRESTATION_SMARTAGENDA_ID})
  }
  prestation=prestation._id

  const contents=fs.readFileSync(input_file)
  return loadRecords(input_file)
    .then(records => 
      importData({model: 'appointment', data:records, mapping:APPOINTMENT_MAPPING(prestation), 
      identityKey: APPOINTMENT_KEY, migrationKey: APPOINTMENT_MIGRATION_KEY, progressCb: progressCb()}
    ))
}

const importMeasures = async input_file => {
  return loadRecords(input_file)
    .then(records => 
    importData({
      model: 'measure', data:records, mapping:MEASURE_MAPPING, identityKey: MEASURE_MAPPING_KEY, 
      migrationKey: MEASURE_MAPPING_MIGRATION__KEY, progressCb: progressCb()
    })
  )
}

const importQuizz = async input_file => {
  return loadRecords(input_file)
    .then(records =>  importData({model: 'quizz', data:records, mapping:QUIZZ_MAPPING, 
      identityKey: QUIZZ_KEY, migrationKey: QUIZZ_MIGRATION_KEY, progressCb: progressCb()}))
}
  
const importQuizzQuestions = async input_file => {
  return loadRecords(input_file)
    .then(records => importData({model: 'quizzQuestion', data:records, mapping:QUIZZQUESTION_MAPPING, 
    identityKey: QUIZZQUESTION_KEY, migrationKey: QUIZZQUESTION_MIGRATION_KEY, progressCb: progressCb()})
  )
  // Attach questions to quizzs
  .then(res=> QuizzQuestion.find({migration_id: {$ne: null}})
    .then(questions => lodash(questions)
      .groupBy(q => Math.floor(q.migration_id/QUIZZ_FACTOR))
      .mapValues(quizzQuestions => quizzQuestions.map(q => q._id))
      .value()
    )
    .then(grouped => Object.keys(grouped).map(key => Quizz.findOneAndUpdate({migration_id: key}, {questions: grouped[key]})))
    .then(queries => Promise.all(queries))
    .then(() => res)
  )
}

const importQuizzQuestionAnswer = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => 
      Promise.all([
        importData({model: 'item', data:records, mapping:QUIZZANSWER_1_MAPPING, 
          identityKey: QUIZZANSWER_1_KEY, migrationKey: QUIZZANSWER_1_MIGRATION_KEY, progressCb: progressCb()}),
        importData({model: 'item', data:records, mapping:QUIZZANSWER_2_MAPPING, 
          identityKey: QUIZZANSWER_2_KEY, migrationKey: QUIZZANSWER_2_MIGRATION_KEY, progressCb: progressCb()}),
      ])
    )
    .then(([res1, res2]) => [...res1, ...res2])
}

const ORDERS=['FIRST', 'SECOND', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']

const importUserQuizz = async input_file => {
  return loadRecords(input_file)
    .then(records => runPromisesWithDelay(records.map((record, idx) => async() => {
      const log=idx%500 ? () => {} : console.log
      log(idx, '/', records.length)
      const userId=cache('user', record.SDPATIENTID)
      const quizzId=cache('quizz', record.SDQUIZID)
      console.log('quizzid', quizzId)
      const coaching=await Coaching.findOne({user: userId}).sort({ [CREATED_AT_ATTRIBUTE]: -1 }).limit(1)
        .populate('quizz_templates')
        .populate('quizz')
      if (!coaching) {
        console.log('no coaching')
        return Promise.reject(`No coaching for user ${record.SDPATIENTID}/${userId}`)
      }
      // Check if template exists
      const hasTemplate=coaching.quizz_templates.some(q => idEqual(q._id, quizzId))
      if (!hasTemplate) {
        coaching.quizz_templates.push(quizzId)
        const quizz=await Quizz.findById(quizzId).populate({path: 'questions', populate: 'available_answers'})
        const cloned=await quizz.cloneAsUserQuizz()
        coaching.quizz.push(cloned._id)
        console.log(quizz.questions.length, cloned.questions.length)
        await coaching.save()
        return Promise.all(ORDERS.map(async (attribute, index) => {
          const answer=parseInt(record[attribute])
          const quizzQuestion=quizz.questions[index]
          const userQuestion=cloned.questions[index]
          // console.log(index, 'quizz question before', quizzQuestion)
          if (!!quizzQuestion && !lodash.isNaN(answer)) {
            const item_id=quizzQuestion.available_answers[answer]
            userQuestion.single_enum_answer=item_id._id
            console.log('saving')
            return userQuestion.save().then(console.log).catch(err => console.error('err', err))
          }
          else {
            return true
          }
        }))
      }
      else {
        return Promise.resolve(true)
      }
    })))
}

const importKeys = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'key', data:records, mapping:KEY_MAPPING, 
    identityKey: KEY_KEY, migrationKey: KEY_MIGRATION_KEY, progressCb: progressCb()}))
}

const importProgressQuizz = async input_file => {
  return Promise.all([
    loadRecords(input_file), 
    Quizz.findOne({type: QUIZZ_TYPE_PROGRESS}).populate('questions')
  ])
    .then(([records, progressQuizz]) => Promise.allSettled(records.map(record => {
        const question=progressQuizz.questions.find(q => q.title==record.name)
        if (!question) {
          throw new Error(`Missing question:${record.name}`)
        }
        console.log('setting', question._id, 'to', record.SDCRITERIAID)
        question.migration_id=record.SDCRITERIAID
        setCache('quizzQuestion', record.SDCRITERIAID, question._id)
        return question.save()
          // Update all user quesitons based on this one
          .then(q => UserQuizzQuestion.updateMany({quizz_question: q}, {migration_id: q.migration_id}))
      }))
    )
}

const getCriterionAnswer = async (criterion_id, status) => {

  const STATUS_MAPPING={
    0: COACHING_QUESTION_STATUS_NOT_ADDRESSED,
    1: COACHING_QUESTION_STATUS_NOT_ACQUIRED,
    2: COACHING_QUESTION_STATUS_IN_PROGRESS,
    3: COACHING_QUESTION_STATUS_ACQUIRED,
  }

  const model=`progress_answer`
  const key=`${criterion_id}-${status}`
  let result=cache(model, key)
  if (result) {
    return result
  }
  const quizz=await Quizz.findOne({type: QUIZZ_TYPE_PROGRESS}).populate({path: 'questions', populate: 'available_answers'})
  const answer_id=quizz.questions.find(q => q.migration_id==criterion_id)
    .available_answers.find(a => a.text=COACHING_QUESTION_STATUS[STATUS_MAPPING[status]])._id
  setCache(model, key, answer_id)
  return answer_id
}

const importUserProgressQuizz = async (input_file) => {

  const progressCache=new NodeCache()

  const getProgress = async (coachingId) => {
    let result=progressCache.get(coachingId)
    if (!result) {
      result=await Coaching.findById(coachingId)
        .populate({path: 'progress', select: {questions:1}, populate: {path: 'questions'}})
      progressCache.set(coachingId, result.progress)
    }
    return result
  }

  return loadRecords(input_file)
    .then(records => runPromisesWithDelay(records.map((record, idx) => async () => {
      console.time('update progress')
      const log=idx%200 ? () => {} : console.log
      log(idx,'/', records.length)
      const coachingId=cache('coaching', record.SDPROGRAMID)
      console.log(record.SDPROGRAMID, coachingId)
      const progress=await getProgress(coachingId)
      const question=progress.questions.find(q => q.migration_id==record.SDCRITERIAID)
      if (!!question.single_enum_answer) {
        return
      }
      const answer_id=await getCriterionAnswer(record.SDCRITERIAID, record.status)
      if (!question || !answer_id) {
        console.error(`Not found: Question ${question}: answer ${answer_id}`)
        throw new Error(`Question ${question}: answer ${answer_id}`)
      }
      question.single_enum_answer=answer_id
      const res=question.save()
      console.timeEnd('update progress')
      return 
    })))
}

const importUserObjectives = async input_file => {
  const contents=fs.readFileSync(input_file)
  return await Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => runPromisesWithDelay(records.map((record, idx) => async () => {
      if (idx%1000==0) {
        console.log(idx, '/', records.length)
      }
      const dt=moment(record.date)
      const userId=cache('user', record.SDPATIENTID)
      const appointments=await Appointment.find({user: user_id}, {start_date:1})
      const nearestAppt=lodash.minBy(appointments, app => Math.abs(dt.diff(app.start_date, 'minute')))
      if (!user) {
        throw new Error('no user for', record.SDPATIENTID)
      }
      if (!nearestAppt) {
        throw new Error('no nearest appt for', record.SDPATIENTID)
      }
      let question=await QuizzQuestion.findOne({title: record.objective})
      if (!question) {
        question=await QuizzQuestion.create({title: record.objective, type: QUIZZ_QUESTION_TYPE_ENUM_SINGLE})
      }
      const userQuestion=await question.cloneAsUserQuestion()
      return Appointment.findByIdAndUpdate(nearestAppt._id, {$addToSet: {objectives: question, user_objectives: userQuestion}})
    })))
}

const importUserAssessmentId = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'coaching', data:records, mapping:ASSESSMENT_MAPPING, 
    identityKey: ASSESSMENT_KEY, migrationKey: ASSESSMENT_MIGRATION_KEY, progressCb: progressCb()}))
}

const importUserImpactId = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'coaching', data:records, mapping:IMPACT_MAPPING, 
    identityKey: IMPACT_KEY, migrationKey: IMPACT_MIGRATION_KEY, progressCb: progressCb()}))
}

const importConversations = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'conversation', data:records, mapping:CONVERSATION_MAPPING, 
    identityKey: CONVERSATION_KEY, migrationKey: CONVERSATION_MIGRATION_KEY, progressCb: progressCb()}))
}

const importMessages = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'message', data:records, mapping:MESSAGE_MAPPING, 
    identityKey: MESSAGE_KEY, migrationKey: MESSAGE_MIGRATION_KEY, progressCb: progressCb()}))
}

const importSpecs = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'target', data:records, mapping:SPEC_MAPPING, 
    identityKey: SPEC_KEY, migrationKey: SPEC_MIGRATION_KEY, progressCb: progressCb()})
  )
}

const importDietSpecs = async input_file => {
  const contents=fs.readFileSync(input_file)
  const records=await loadRecords(input_file)
  return runPromisesWithDelay(records.map(record => async () => {
    const diet_id=cache('user', record.DIETID)
    const target_id=cache('target', record.SPECID)
    if (!diet_id) {
      throw new Error(`No diet id ${record.DIETID}`)
    }
    if (!target_id) {
      throw new Error(`No spec id ${record.SPECID}`)
    }
    return User.findByIdAndUpdate(diet_id, {$addToSet: {objective_targets: target_id}})
  }))
  .then(res =>  {
    const errors=res.filter(r => r.status=='rejected').map(r => r.reason)
    if (!lodash.isEmpty(errors)) {
      throw new Error(errors)
    }
    return res.map(r => r.value)
  })
}

const importPatientHeight = async input_file => {
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'user', data:records, mapping:HEIGHT_MAPPING, 
    identityKey: HEIGHT_KEY, migrationKey: HEIGHT_MIGRATION_KEY, progressCb: progressCb()})
  )
}


module.exports={
  importCompanies,
  importOffers,
  importPatients,
  importDiets,
  importCoachings,
  importAppointments,
  importMeasures,
  fixFiles,
  importQuizz,
  importQuizzQuestions,
  importQuizzQuestionAnswer,
  importUserQuizz,
  importKeys,
  importProgressQuizz,
  importUserProgressQuizz,
  importUserObjectives,
  importUserAssessmentId,
  importUserImpactId,
  importConversations,
  importMessages,
  updateImportedCoachingStatus,
  updateDietCompanies,
  importSpecs, importDietSpecs, importPatientHeight,
}

