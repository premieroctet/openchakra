const fs=require('fs')
const siret = require('siret')
const lodash=require('lodash')
const moment=require('moment')
const path=require('path')
const crypto = require('crypto')
const {extractData, guessFileType, importData, cache, setCache}=require('../../../utils/import')
const { guessDelimiter, normalize } = require('../../../utils/text')
const Company=require('../../models/Company')
const User=require('../../models/User')
const AppointmentType=require('../../models/AppointmentType')
const {
  ROLE_EXTERNAL_DIET, ROLE_CUSTOMER, DIET_REGISTRATION_STATUS_ACTIVE, COMPANY_ACTIVITY_OTHER, QUIZZ_TYPE_PATIENT, 
  QUIZZ_QUESTION_TYPE_ENUM_SINGLE, QUIZZ_TYPE_PROGRESS, COACHING_QUESTION_STATUS, COACHING_QUESTION_STATUS_NOT_ADDRESSED, 
  COACHING_QUESTION_STATUS_NOT_ACQUIRED, COACHING_QUESTION_STATUS_IN_PROGRESS, COACHING_QUESTION_STATUS_ACQUIRED, 
  GENDER_MALE, GENDER_FEMALE, COACHING_STATUS_NOT_STARTED, QUIZZ_TYPE_ASSESSMENT, DIET_REGISTRATION_STATUS_REFUSED, 
  FOOD_DOCUMENT_TYPE_NUTRITION, GENDER, DIET_REGISTRATION_STATUS_VALID, DIET_REGISTRATION_STATUS_PENDING, COACHING_CONVERSION_CANCELLED 
} = require('./consts')
const { CREATED_AT_ATTRIBUTE, TEXT_TYPE } = require('../../../utils/consts')
require('../../models/Key')
const QuizzQuestion = require('../../models/QuizzQuestion')
require('../../models/UserQuizz')
require('../../models/UserQuizzQuestion')
require('../../models/Conversation')
require('../../models/Message')
require('../../models/Target')
require('../../models/FoodDocument')
require('../../models/NutritionAdvice')
require('../../models/Network')
require('../../models/Diploma')
const Quizz = require('../../models/Quizz')
const Coaching = require('../../models/Coaching')
const { idEqual } = require('../../utils/database')
const Appointment = require('../../models/Appointment')
const UserSurvey = require('../../models/UserSurvey')
const { runPromisesWithDelay } = require('../../utils/concurrency')
const NodeCache = require('node-cache')
require('../../models/Offer')
const { updateCoachingStatus } = require('./coaching')
const { isPhoneOk } = require('../../../utils/sms')
const UserQuizzQuestion = require('../../models/UserQuizzQuestion')
const mime = require('mime-types')
const { sendFilesToAWS, sendFileToAWS } = require('../../middlewares/aws')
const UserQuizz = require('../../models/UserQuizz')
const { isNewerThan } = require('../../utils/filesystem')
const pairing =require('@progstream/cantor-pairing')
const FoodDocument = require('../../models/FoodDocument')
const DEFAULT_PASSWORD='DEFAULT'

const ASS_PRESTATION_DURATION=45
const ASS_PRESTATION_NAME=`Bilan générique ${ASS_PRESTATION_DURATION} minutes`
const ASS_PRESTATION_SMARTAGENDA_ID=-1

const FOLLOWUP_PRESTATION_DURATION=15
const FOLLOWUP_PRESTATION_NAME=`Suivi générique ${FOLLOWUP_PRESTATION_DURATION} minutes`
const FOLLOWUP_PRESTATION_SMARTAGENDA_ID=-2

const KEY_NAME='Clé import'

const QUIZZ_FACTOR=100

const NUT_JOB={
  0: '',
  1: 'Administratif',
  2: 'Chauffeur longue distance',
  3: 'Chauffeur moyenne distance',
  4: 'Manutention',
  5: 'Opérationnel',
  6: 'Logistique',
  7: 'Acheteur',
  8: 'Apprenti',
  9: 'Sans activité',
  10: 'Handicapé',
  11: 'Retraité(e)',
  12: 'Accident du travail',
  13: 'Pas de réponse',
}

const NUT_SUBJECT={
  1: `Equilibre alimentaire`,
  2: `Problématiques organisationnelles sur le terrain (achats de denrées, stockage, ...)`,
  3: `Problématiques organisationnelles à la maison (menu, liste de course..)`,
  4: `Comportements alimentaires`,
  5: `Perte/Prise de poids`,
  6: `Pathologies`,
  7: `Autre`,
}

const NUT_REASON={
  0: `Aucune`,
  1: `Déjà suivi sur cette thématique`,
  2: `Hors cible`,
  3: `Je n'ai pas le temps`,
  4: `Je ne souhaite pas échanger avec une diététicienne`,
  5: `Le format ne me convient pas`,
  6: `Autre motif/sans réponse`,
  7: `N'a pas besoin - tout est clair`,
}


const normalizePhone = tel => {
  let newTel=tel?.replace(/ /g, '')
  if (newTel?.length==9) {
    newTel=`0${newTel}`
  }
  if (!isPhoneOk(newTel)) {
    newTel=null
  }
  return newTel
}

const replaceInFile = (path, replaces) => {
  const contents=fs.readFileSync(path).toString()
  let fixed=contents
  replaces.forEach(([search, replace]) => fixed=fixed.replace(search, replace))
  if (fixed!=contents) {
    console.log('Updated', path)
    fs.writeFileSync(path, fixed)
  }
}

const fixPatients = async directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''], [/orange\.f\\\n/g, 'orange.f'],
    [/\@hotmailfr"/g, '@hotmail.fr"'], [/\@orange\.f"/g, '@orange.fr"'], [/\@hotmail\.fr2/g, '@hotmail.fr'],
    [/\@gmailcom"/g, '@gmail.com"'], [/\@gmail\.c"/g, '@gmail.com"'], [/\@aolcom"/g, '@aol.com"'], [/\@orangefr"/g, '@orange.fr"'], 
    [/@sfr"/g, '@sfr.fr"'], [/\@yahoofr/g, "@yahoo.fr"], [/\@hotmailcom"/g, 'hotmail.com"'], [/\@neuffr"/g, '@neuf.fr"'], 
    [/\@msncom"/g, '@msn.com"'], [/\@gmail"/g, '@gmail.com"'], [/\@free.f"/g, '@free.fr"'], [/\@orange,fr/g, 'orange.fr'],
    [/\@live\.f"/g, '@live.fr"'], [/\@yahoo\.f"/g, '@yahoo.fr"'], [/francksurgis\.\@live\.fr/g, 'francksurgis@live.fr'],
    [/\@outlook\.f"/g, '@outlook.fr"'], [/\@yahoo"/g, '@yahoo.fr"'], [/\@lapos"/g, '@laposte.net"'], [/\@lapost"/g, '@laposte.net"'],
    [/yanis69240hotmail.com/g, 'yanis69240@hotmail.com']

  ]

  replaceInFile(path.join(directory, 'smart_patient.csv'), REPLACES)
}

const fixDiets = directory => {
  const REPLACES=[['UPPER(lastname)', 'lastname'], [/\\"/g, "'"], ]
  replaceInFile(path.join(directory, 'smart_diets.csv'), REPLACES)
}

const fixAppointments = async directory => {
  const INPUT=path.join(directory, 'smart_consultation.csv')
  const MIS_INPUT=path.join(directory, 'smart_mis.csv')
  const EO_INPUT=path.join(directory, 'smart_eo.csv')
  const OUTPUT=path.join(directory, 'consultation.csv')
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  replaceInFile(INPUT, REPLACES)
  let records=await loadRecords(INPUT)

  if (isNewerThan(OUTPUT, INPUT) && isNewerThan(OUTPUT, MIS_INPUT) && isNewerThan(OUTPUT, EO_INPUT)) {
    console.log('no need to generate appts')
    return 
  }
  console.log('Generating appts')
  // Remove MIS appointments
  console.log('records before MIS filter', records.length)
  const mis=(await loadRecords(MIS_INPUT)).map(record => record.SDCONSULTID)
  records=records.filter(r => !mis.includes(r.SDCONSULTID))
  console.log('records after MIS filter', records.length)

  // Remove EO appointments
  console.log('records before EO filter', records.length)
  const eo=(await loadRecords(EO_INPUT)).map(record => record.SDCONSULTID)
  records=records.filter(r => !eo.includes(r.SDCONSULTID))
  console.log('records after EO filter', records.length)
  
  const firstAppointments=lodash(records).groupBy('SDPROGRAMID')
    .mapValues(consults => lodash.minBy(consults, c => moment(c.date)).SDCONSULTID)
    .value()
  const ASS_HEADER='assessment'
  const keys=[...Object.keys(records[0]), ASS_HEADER]
  const result=[keys.join(';')]
  records.forEach(record => {
    const line=keys.map(k => k==ASS_HEADER ? (firstAppointments[record.SDPROGRAMID]==record.SDCONSULTID ? "1" : "0"): record[k])
    result.push(line.join(';'))
  })

  
  fs.writeFileSync(OUTPUT, result.join('\n'))
}

const fixQuizz = directory => {
  const REPLACES=[
    [/.quilibre/g, 'Equilibre'], [/\/ Vegan/g, '/Vegan'], [/Apéro \!/g, 'Apéro'], [/Fr.quences/g, 'Fréquences'],
    [/.quivalences/g, 'Equivalences'],
  ]
  replaceInFile(path.join(directory, 'smart_quiz.csv'), REPLACES)
}

const fixQuizzQuestions = directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  replaceInFile(path.join(directory, 'smart_question.csv'), REPLACES)
}

const fixObjectives = directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  replaceInFile(path.join(directory, 'smart_objective.csv'), REPLACES)
}

const fixMessages = directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''],
  ]
  replaceInFile(path.join(directory, 'smart_message.csv'), REPLACES)
}

const fixSummary = directory => {
  const REPLACES=[ [/\r/g, ''], [/\\"/g, "'"], [/\\\\/g, ''],]
  replaceInFile(path.join(directory, 'smart_summary.csv'), REPLACES)
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
  replaceInFile(path.join(directory, 'smart_spec.csv'), REPLACES)
}

const loadRecords = async path =>  {
  const msg=`Loading records from ${path}`
  console.time(msg)
  const contents=fs.readFileSync(path)
  const {records} = await extractData(contents, {format: TEXT_TYPE, delimiter: ';'})
  console.timeEnd(msg)
  return records
}

const saveRecords = async (path, keys, data) =>  {
  const msg=`Saving records to ${path}`
  console.time(msg)
  const header=keys.join(';')
  const contents=data.map(d => keys.map(k => d[k]).join(';'))
  const fullContents=header+'\n'+contents.join('\n')
  return fs.writeFileSync(path, fullContents)
}

const generateMessages = async directory =>{
  const THREADS=path.join(directory, 'smart_thread.csv')
  const MESSAGES=path.join(directory, 'smart_message.csv')

  const CONVERSATIONS_OUTPUT=path.join(directory, 'wapp_conversations.csv')
  const MESSAGES_OUTPUT=path.join(directory, 'wapp_messages.csv')

  if (isNewerThan(CONVERSATIONS_OUTPUT, THREADS) 
      && isNewerThan(CONVERSATIONS_OUTPUT, MESSAGES)
      && isNewerThan(MESSAGES_OUTPUT, THREADS)
      && isNewerThan(MESSAGES_OUTPUT, MESSAGES)
  ) {
    // console.log('No need to generate', OUTPUT)
    return
  }

  console.log('Generating', CONVERSATIONS_OUTPUT, 'and', MESSAGES_OUTPUT)

  const sd_messages=await loadRecords(MESSAGES)
  const threads=await loadRecords(THREADS)

  const createCantorKey = (user1, user2) => {
    const users=[parseInt(user1), parseInt(user2)].sort()
    return pairing.pair(...users)
  }

  const conversations=lodash([...sd_messages, ...threads])
    .map(({SDTHREADID, SDCREATORID, SDSENDERID}) => ({SDTHREADID, USERID: SDCREATORID || SDSENDERID}))
    .groupBy('SDTHREADID')
    .mapValues(users => lodash.uniq(users.map(r => parseInt(r.USERID))))
    .pickBy(v => v.length==2)
    .entries()
    .map((([SDTHREADID, [USER1, USER2]]) => ({SDTHREADID, USER1, USER2, CONVID: createCantorKey(USER1, USER2)})))
    .groupBy('CONVID')
    .mapValues(threads => ({...threads[0], SDTHREADID: undefined, SDTHREADIDS: threads.map(t => t.SDTHREADID)}))
    
  const conversationKeys=['CONVID','USER1','USER2']
  saveRecords(CONVERSATIONS_OUTPUT, conversationKeys, conversations)

  const getConvId = threadId => {
    const conv=conversations.values().find(e => e.SDTHREADIDS.includes(threadId))
    return parseInt(conv?.CONVID)
  }

  const getReceiver = (convId, sender) => {
    const conv=conversations.values().find(conv => conv.CONVID==convId)
    const receiver=conv.USER1==sender ? conv.USER2 : conv.USER1
    return receiver
  }

  const messages=lodash(sd_messages)
    // Compute convid
    .map(r => ({...r, CONVID: getConvId(r.SDTHREADID)}))
    // Remove no CONVID entries (i.e. thread with one people only)
    .filter(v => !!v.CONVID)
    .map(msg => ({...msg, SENDER: msg.SDSENDERID, RECEIVER: getReceiver(msg.CONVID, msg.SDSENDERID), message: `"${msg.message}"`}))
    .value()

  const messagesKeys=['CONVID', 'SENDER', 'RECEIVER', 'message', 'datetime']
  saveRecords(MESSAGES_OUTPUT, messagesKeys, messages)
}

const generateProgress = async directory => {
  const consulPath=path.join(directory, 'smart_consultation.csv')
  const consultProgressPath = path.join(directory, 'smart_consultation_progress.csv')
  const outputPath = path.join(directory, 'wapp_progress.csv')

  if (isNewerThan(outputPath, consulPath) && isNewerThan(outputPath, consultProgressPath)) {
    console.log('No need to generate', outputPath)
    return
  }
  console.log('Generating', outputPath)

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


const fixFoodDocuments = async directory => {
  const REPLACES=[
    [/\\"/g, "'"], [/\\\\/g, ''], [/’/g, "'"]
  ]
  replaceInFile(path.join(directory, 'smart_fiche.csv'), REPLACES)
  const fichesRecords=await loadRecords(path.join(directory, 'smart_fiche.csv'))
  const mappingRecords=await loadRecords(path.join(directory, 'wapp_fiche_mapping.csv'))
  const getMappingName = originalName => {
    const mappingName=mappingRecords.find(record => record.smart_name==originalName)?.wapp_name
    return mappingName
  }
  // Check existence of mapped names in DB
  const missingDbDocuments=(await Promise.all(
    mappingRecords
      .filter(r => !!r.wapp_name)
      .map(r => FoodDocument.exists({name: r.wapp_name})
        .then(exists => exists ? '': `No document ${r.wapp_name} in DB`)
      )
  )).filter(v => !!v)
  if (!lodash.isEmpty(missingDbDocuments)) {
    throw new Error(`Not found in DB: ${missingDbDocuments}`)  
  }
}

const fixFiles = async directory => {
  console.log('Fixing files')
  await fixPatients(directory)
  await fixDiets(directory)
  await fixAppointments(directory)
  await fixQuizz(directory)
  await fixQuizzQuestions(directory)
  await fixObjectives(directory)
  await fixMessages(directory)
  await fixSummary(directory)
  await generateMessages(directory)
  await fixSpecs(directory)
  await generateProgress(directory)
  await fixFoodDocuments(directory)
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
  name: async ({cache, record}) => {
    const user=await User.findById(cache('user', record.SDPATIENTID)).populate('company')
    return `${SMART_OFFER_MAPPING[record.SDPROGRAMTYPE]?.name} pour ${user?.company?.name} `
  },
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
  company: async ({cache, record}) => {
    const user=await User.findById(cache('user', record.SDPATIENTID))
    return user?.company
  },
  validity_start: () => '01/01/2019',
  assessment_quizz: async () => await Quizz.findOne({type: QUIZZ_TYPE_ASSESSMENT}),
  // migration_id: company smart id * 1000 + smart program type
  migration_id: async ({cache, record}) => {
    const user=await User.findById(cache('user', record.SDPATIENTID)).populate('company')
    const mig_id=user?.company?.migration_id*1000+(+record.SDPROGRAMTYPE)
    return mig_id
  },
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
  phone: ({record}) => normalizePhone(record.phone),
  diet_comment: 'comments',
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

const WEIGHT_MAPPING={
  // Weight from summary
  migration_id: ({record}) => -record.patient_id,
  weight: 'weight',
  user: ({cache, record}) => cache('user', record.patient_id),
  date: 'updated',
}

const WEIGHT_KEY='migration_id'
const WEIGHT_MIGRATION_KEY='migration_id'



const DIET_STATUS_MAPPING={
  0: DIET_REGISTRATION_STATUS_PENDING,
  1: DIET_REGISTRATION_STATUS_PENDING,
  2: DIET_REGISTRATION_STATUS_ACTIVE,
  3: DIET_REGISTRATION_STATUS_REFUSED,
  4: DIET_REGISTRATION_STATUS_VALID,
}
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
  phone: ({record}) => normalizePhone(record.phone),
  adeli: 'adelinumber',
  city: 'city',
  siret: ({record}) => siret.isSIRET(record.siret)||siret.isSIREN(record.siret) ? record.siret : null,
  birthday: 'birthdate',
  [CREATED_AT_ATTRIBUTE]: ({record}) => moment(record['created_at']),
  registration_status: ({record}) => DIET_STATUS_MAPPING[+record.status],
  diet_coaching_enabled: ({record}) => +record.hasteleconsultation==1,
  diet_visio_enabled: ({record}) => +record.easewithconfs==1,
  diet_site_enabled: ({record}) => +record.hasatelier==1,
  diet_admin_comment: 'comments',
  description: 'annonce',
  picture: async ({record, picturesDirectory}) => {return await getS3FileForDiet(picturesDirectory, record.firstname, record.lastname, 'profil')},
  rib: async ({record, ribDirectory}) => {return await getS3FileForDiet(ribDirectory, record.firstname, record.lastname, 'rib')},
  source: () => 'import',
}

const DIET_KEY='email'
const DIET_MIGRATION_KEY='migration_id'

const COACHING_MAPPING={
  [CREATED_AT_ATTRIBUTE]: ({record}) => moment(record.orderdate),
  user: ({cache, record}) => cache('user', record.SDPATIENTID),
  offer: async ({cache, record}) => {
    const user=await User.findById(cache('user', record.SDPATIENTID))
      .populate({path: 'company', populate: 'current_offer'})
    const offer=user?.company?.current_offer?._id
    console.log('coaching user', record.SDPATIENTID, !!user)
    console.log('coaching company', !!user?.company)
    console.log('coaching company offer', !!user?.company?.current_offer)
    return offer
  },
  migration_id: 'SDPROGRAMID',
  diet: ({cache, record}) => cache('user', record.SDDIETID),
  smartdiet_patient_id: 'SDPATIENTID',
}

const COACHING_KEY=['user', CREATED_AT_ATTRIBUTE]
const COACHING_MIGRATION_KEY='migration_id'

const APPOINTMENT_MAPPING= (assessment_id, followup_id) => ({
  coaching: ({cache, record}) => cache('coaching', record.SDPROGRAMID),
  start_date: 'date',
  end_date: ({record}) => moment(record.date).add(45, 'minutes'),
  note: 'comments',
  appointment_type: ({record}) => +record.assessment ? assessment_id : followup_id,
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

const SMART_POINT_MAPPING={
  0: `Pas de clé`,
  1: `Je bouge`,
  2: `Je dors`,
  3: `Je gère`,
  4: `J'équilibre`,
  5: `Je m'organise`,
  6: `J'achète`,
  7: `Je ressens`,
}


const KEY_MAPPING={
  migration_id: ({record}) => Object.entries(SMART_POINT_MAPPING).find(([k, text]) => text==record.smartpoint) [0],
  name: 'smartpoint',
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
  migration_id: 'CONVID',
  users: ({cache, record}) => [cache('user', record.USER1), cache('user', record.USER2)],
}

const CONVERSATION_KEY='migration_id'
const CONVERSATION_MIGRATION_KEY='migration_id'

const getMessageId = (convId, date) => {
  return `${convId}${moment(date).unix()}`
}

const MESSAGE_MAPPING={
  migration_id: ({record}) => getMessageId(record.CONVID, record.datetime),
  conversation: ({cache, record}) => cache('conversation', record.CONVID),
  receiver: ({cache, record}) => cache('user', record.RECEIVER),
  sender: ({cache, record}) => cache('user', record.SENDER),
  content: 'message',
  [CREATED_AT_ATTRIBUTE]: 'datetime',
}

const MESSAGE_KEY='migration_id'
const MESSAGE_MIGRATION_KEY='migration_id'

const SPEC_MAPPING={
  migration_id: 'SPECID',
  name: 'name',
}

const SPEC_KEY='name'
const SPEC_MIGRATION_KEY='migration_id'

const FOOD_DOCUMENT_MAPPING= mapping => ({
  migration_id: 'IDFICHESD',
  name: ({record}) => mapping[record.name] || record.name,
  description: 'description',
  type: () => FOOD_DOCUMENT_TYPE_NUTRITION,
  key: ({record, cache}) => {
    // If no key => J'équilibre
    const keyId=cache('key', +record.smartpoint || 4)
    return keyId
  },
  document: async ({record, foodDocumentDirectory}) => {
    const url=await getS3FileForFoodDocument(foodDocumentDirectory, record.IDFICHESD, 'food')
      .catch(err => console.error(record, err))
    return url
  },
})

const FOOD_DOCUMENT_KEY='name'
const FODD_DOCUMENT_MIGRATION_KEY='migration_id'

const getGender = gender => GENDER[+gender==1 ? GENDER_MALE : +gender==2 ? GENDER_FEMALE : undefined]

const NUTADVICE_MAPPING={
  migration_id: ({record}) => parseInt(`${record.SDDIETID}${moment(record.DATE).unix()}`),
  start_date: 'DATE',
  diet: ({cache, record}) => cache('user', record.SDDIETID),
  patient_email: 'email',
  comment: ({record}) => {
    return `${getGender(record.gender)} ${record.age} ans, ${NUT_JOB[record.job_type]}, sujet : ${NUT_SUBJECT[record.SUBJECT]}, \
raison : ${NUT_REASON[record.reason]}, ${+record.coaching>0 ? 'a mené à un coaching' : `n'a pas mené à un coaching`}`
  }
}

const NUTADVICE_KEY='migration_id'
const NUTADVICE_MIGRATION_KEY='migration_id'

const NETWORK_MAPPING={
  migration_id: 'SDNETWORKID',
  name: 'name',
}

const NETWORK_KEY='name'
const NETWORK_MIGRATION_KEY='migration_id'

const GRADE_MAPPING={
  0: 'BTS',
  1: 'DUT',
}

const DIPLOMA_MAPPING={
  migration_id: 'SDID',
  name: ({record}) => GRADE_MAPPING[+record.grade],
  date: 'diplomedate',
  user: ({cache, record}) => cache('user', record.SDID),
  picture: async ({record, diplomaDirectory}) => {
    const url=await getS3FileForDiet(diplomaDirectory, record.firstname, record.lastname, 'diploma')
      .catch(err => console.error(record, err))
    return url
  },
}

const DIPLOMA_KEY='migration_id'
const DIPLOMA_MIGRATION_KEY='migration_id'


const OTHER_DIPLOMA_MAPPING={
  migration_id: ({record}) => (+record.SDID)*10,
  name: 'othergrade',
  user: ({cache, record}) => cache('user', record.SDID),
}

const OTHER_DIPLOMA_KEY='migration_id'
const OTHER_DIPLOMA_MIGRATION_KEY='migration_id'


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
      return importData({model: 'offer', data:records, mapping:OFFER_MAPPING, identityKey: OFFER_KEY, 
        migrationKey: OFFER_MIGRATION_KEY, progressCb: progressCb()})
    })
}


const importPatients = async input_file => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  return loadRecords(input_file)
    .then(records => 
      importData({model: 'user', data:records, mapping:PATIENT_MAPPING, identityKey: PATIENT_KEY, 
        migrationKey: PATIENT_MIGRATION_KEY, progressCb: progressCb()})
    )
}

const importDiets = async (input_file, pictures_directory, rib_directory) => {
  // Deactivate password encryption
  const schema=User.schema
  schema.paths.password.setters=[]
  // End deactivate password encryption
  return loadRecords(input_file)
    .then(records =>  importData({
      model: 'user', data:records, mapping:DIET_MAPPING, identityKey: DIET_KEY, migrationKey: DIET_MIGRATION_KEY, 
      picturesDirectory: pictures_directory, ribDirectory: rib_directory,
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
    .then(() => Coaching.find({migration_id: {$ne: null}}, {user:1}))
    .then(coachings => Promise.all(coachings.map(ensureSurvey)))
}

const importAppointments = async input_file => {
  let assessemntType=await AppointmentType.findOne({title: ASS_PRESTATION_NAME})
  if (!assessemntType) {
    assessemntType=await AppointmentType.create({title: ASS_PRESTATION_NAME, duration: ASS_PRESTATION_DURATION, 
      smartagenda_id: ASS_PRESTATION_SMARTAGENDA_ID})
  }

  let followupType=await AppointmentType.findOne({title: FOLLOWUP_PRESTATION_NAME})
  if (!followupType) {
    followupType=await AppointmentType.create({title: FOLLOWUP_PRESTATION_NAME, duration: FOLLOWUP_PRESTATION_DURATION, 
      smartagenda_id: FOLLOWUP_PRESTATION_SMARTAGENDA_ID})
  }

  return loadRecords(input_file)
    .then(records => {
      const mapping=APPOINTMENT_MAPPING(assessemntType._id, followupType._id)
      return importData({model: 'appointment', data:records, mapping, 
        identityKey: APPOINTMENT_KEY, migrationKey: APPOINTMENT_MIGRATION_KEY, progressCb: progressCb()})
    })
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
      const coaching=await Coaching.findOne({user: userId}).sort({ [CREATED_AT_ATTRIBUTE]: -1 }).limit(1)
        .populate('quizz_templates')
        .populate('quizz')
      if (!coaching) {
        return Promise.reject(`No coaching for user ${record.SDPATIENTID}/${userId}`)
      }
      // Check if template exists
      const hasTemplate=coaching.quizz_templates.some(q => idEqual(q._id, quizzId))
      if (!hasTemplate) {
        coaching.quizz_templates.push(quizzId)
        const quizz=await Quizz.findById(quizzId).populate({path: 'questions', populate: 'available_answers'})
        const cloned=await quizz.cloneAsUserQuizz()
        coaching.quizz.push(cloned._id)
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
  return loadRecords(input_file)
    .then(records => importData({model: 'key', data:records, mapping:KEY_MAPPING, 
        identityKey: KEY_KEY, migrationKey: KEY_MIGRATION_KEY, progressCb: progressCb()})
    )
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
    .available_answers.find(a => a.text==COACHING_QUESTION_STATUS[STATUS_MAPPING[status]])._id
  setCache(model, key, answer_id)
  return answer_id
}

const importUserProgressQuizz = async (input_file) => {

  const progressCache=new NodeCache()

  const getProgress = async (coachingId) => {
    let result=progressCache.get(coachingId)
    if (!result) {
      result=await UserQuizz.findOne({coaching: coachingId})
        .populate('questions')
      progressCache.set(coachingId, result.progress)
    }
    return result
  }

  return loadRecords(input_file)
    .then(records => runPromisesWithDelay(records.map((record, idx) => async () => {
      if (idx%500==0)  {
        console.log(idx,'/', records.length)
      }
      const coachingId=cache('coaching', record.SDPROGRAMID)
      const progress=await getProgress(coachingId)
      const question=progress.questions.find(q => q.migration_id==record.SDCRITERIAID)
      const answer_id=await getCriterionAnswer(record.SDCRITERIAID, record.status)
      if (!question || !answer_id) {
        throw new Error(`Question ${question}: answer ${answer_id}`)
      }
      question.single_enum_answer=answer_id
      return question.save().then(() => null)
    })))
}

const importUserObjectives = async input_file => {
  return loadRecords(input_file)
    .then(records => runPromisesWithDelay(records.map((record, idx) => async () => {
      if (idx%1000==0) {
        console.log(idx, '/', records.length)
      }
      const dt=moment(record.date)
      const userId=cache('user', record.SDPATIENTID)
      if (!userId) {
        throw new Error('no user for', record.SDPATIENTID)
      }
      const appointments=await Appointment.find({user: userId}, {start_date:1}).catch(console.error)
      const nearestAppt=lodash.minBy(appointments, app => Math.abs(dt.diff(app.start_date, 'minute')))
      if (!nearestAppt) {
        throw new Error('no nearest appt for', record.SDPATIENTID)
      }
      let question=await QuizzQuestion.findOne({title: record.objective})
      if (!question) {
        question=await QuizzQuestion.create({title: record.objective, type: QUIZZ_QUESTION_TYPE_ENUM_SINGLE})
      }
      const userQuestion=await question.cloneAsUserQuestion()
      return Appointment.findByIdAndUpdate(nearestAppt._id, {$addToSet: {objectives: question, user_objectives: userQuestion}})
        .then(() => null)
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
  return loadRecords(input_file)
    .then(records => importData({model: 'conversation', data:records, mapping:CONVERSATION_MAPPING, 
      identityKey: CONVERSATION_KEY, migrationKey: CONVERSATION_MIGRATION_KEY, progressCb: progressCb()}))
}

const importMessages = async input_file => {
  return loadRecords(input_file)
    .then(records => importData({model: 'message', data:records, mapping:MESSAGE_MAPPING, 
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
  return loadRecords(input_file)
    .then(records => importData({model: 'user', data:records, mapping:HEIGHT_MAPPING, 
    identityKey: HEIGHT_KEY, migrationKey: HEIGHT_MIGRATION_KEY, progressCb: progressCb()})
  )
}

const importPatientWeight = async input_file => {
  return loadRecords(input_file)
    .then(records => importData({model: 'measure', data:records, mapping:WEIGHT_MAPPING, 
    identityKey: WEIGHT_KEY, migrationKey: WEIGHT_MIGRATION_KEY, progressCb: progressCb()})
  )
}

const importFoodDocuments = async (input_file, mapping_file, documents_directory) => {
  let mapping=(await loadRecords(mapping_file))
    .filter(record => !lodash.isEmpty(record.wapp_name))
    .map(record => [record.smart_name, record.wapp_name])
  mapping = Object.fromEntries(mapping)
  return loadRecords(input_file)
    .then(records => importData({model: 'foodDocument', data:records, mapping:FOOD_DOCUMENT_MAPPING(mapping), 
      identityKey: FOOD_DOCUMENT_KEY, migrationKey: FODD_DOCUMENT_MIGRATION_KEY, progressCb: progressCb(),
      foodDocumentDirectory: documents_directory
    })
  )
}

const importUserFoodDocuments = async input_file => {
  const coachingCache=new NodeCache()
  // Maps SD ID to WAPP coaching id
  const getCoaching = async sdpatientid => {
    let res=coachingCache.get(sdpatientid)
    if (!res) {
      const userId=cache('user', sdpatientid)
      res=(await Coaching.findOne({user: userId}).sort({[CREATED_AT_ATTRIBUTE]: -1}).limit(1))?._id
      coachingCache.set(sdpatientid, res)
    }
    return res
  }
  return loadRecords(input_file)
    .then(records => runPromisesWithDelay(records.map((record, idx) => async () => {
      idx%1000==0 && console.log(idx, '/', records.length)
      const ficheId=cache('foodDocument', record.SDFICHEID)
      const coachingId=await getCoaching(record.SDPATIENTID)
      return Coaching.findByIdAndUpdate(coachingId, {$addToSet: {food_documents: ficheId}})
    })))
}

const importNutAdvices = async input_file => {
  return loadRecords(input_file)
    .then(records => importData({model: 'nutritionAdvice', data:records, mapping:NUTADVICE_MAPPING, 
      identityKey: NUTADVICE_KEY, migrationKey: NUTADVICE_MIGRATION_KEY, progressCb: progressCb()}
    )
  )
}

const filesCache=new NodeCache()

const getDirectoryFiles= directory => {
  let files=filesCache.get(directory)
  if (!files) {
    const fileNames=fs.readdirSync(directory)
    files=Object.fromEntries(fileNames.map(filename => [normalize(filename).replace(/[\s-]/g, '').split('.')[0], filename]))
    filesCache.set(directory, files)
  }
  return files
}

const findFileForDiet = async (directory, firstname, lastname) => {
  const normalizedDietName=normalize([firstname, lastname].join(' ')).replace(/[\s-]/g, '')
  const files=getDirectoryFiles(directory)
  const found=files[normalizedDietName]
  // !!found && console.log('Found file', found, 'for', firstname, lastname)
  return !!found ? path.join(directory, found) : null
}

const getS3FileForDiet = async (directory, firstname, lastname, type) => {
  const fullpath=await findFileForDiet(directory, firstname, lastname)
  if (fullpath) {
    const s3File=await sendFileToAWS(fullpath, type)
      .catch(err => console.error('err on', fullpath))
    // console.log('in S3 got', firstname, lastname, s3File.Location)
    return s3File?.Location
  }
}

const findFileForFoodDocument = async (directory, documentId) => {
  const normalizedDietName=normalize(`fiche${documentId}`)
  const files=getDirectoryFiles(directory)
  const found=files[normalizedDietName]
  // !!found && console.log('Found file', found, 'for', firstname, lastname)
  return !!found ? path.join(directory, found) : null
}

const getS3FileForFoodDocument = async (directory, documentId, type) => {
  const fullpath=await findFileForFoodDocument(directory, documentId)
  if (fullpath) {
    const s3File=await sendFileToAWS(fullpath, type)
      .catch(err => console.error('err on', fullpath))
    // console.log('in S3 got', firstname, lastname, s3File.Location)
    return s3File?.Location
  }
}

const importNetworks = async input_file => {
  return loadRecords(input_file)
    .then(records => importData({model: 'network', data:records, mapping: NETWORK_MAPPING, 
      identityKey: NETWORK_KEY, migrationKey: NETWORK_MIGRATION_KEY, progressCb: progressCb()}
    )
  )
}

const importDietNetworks = async input_file => {
  let notfound=0
  return loadRecords(input_file)
    .then(records => runPromisesWithDelay(records.map(record => async () => {
      const dietId=cache('user', record.SDDIETID)
      const networkId=cache('network', record.SDNETWORKID)
      !dietId && notfound++
      return User.findByIdAndUpdate(dietId, {$addToSet: {networks: networkId}})
    }))
    .then(() => console.log(notfound))
  )
}

const importDiploma = async (input_file, diploma_directory) => {
  return loadRecords(input_file)
    .then(records => importData({model: 'diploma', data:records, mapping: DIPLOMA_MAPPING, 
      identityKey: DIPLOMA_KEY, migrationKey: DIPLOMA_MIGRATION_KEY, progressCb: progressCb(), diplomaDirectory: diploma_directory}
    )
    .then(console.log)
  )
}

const importOtherDiploma = async (input_file) => {
  return loadRecords(input_file)
    .then(records => importData({model: 'diploma', data:records, mapping: OTHER_DIPLOMA_MAPPING, 
      identityKey: OTHER_DIPLOMA_KEY, migrationKey: OTHER_DIPLOMA_MIGRATION_KEY, progressCb: progressCb()}
    )
    .then(console.log)
  )
}

module.exports={
  loadRecords, saveRecords,
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
  importSpecs, importDietSpecs, importPatientHeight, importPatientWeight,
  importFoodDocuments,
  importUserFoodDocuments,
  importNutAdvices,
  importNetworks, importDietNetworks, importDiploma,
  importOtherDiploma,
  generateMessages,
  fixFoodDocuments,
}

