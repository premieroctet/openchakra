const path=require('path')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../../.env')})
const { displayConfig } = require('../../config/config')
const moment = require('moment')
const { CREATED_AT_ATTRIBUTE } = require('../../utils/consts')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {getDatabaseUri} = require('../../config/config')
const mongoose=require('mongoose')
const User = require('../../server/models/User')
require('../../server/plugins/all-inclusive/functions')
const {COACH_ALLE}=require('../../server/plugins/all-inclusive/consts')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const HEADERS=[
  {title: 'Créé le', id:'created_format'},
  {title: 'Prénom', id:'firstname'},
  {title: 'Nom', id:'lastname'},
  {title: 'Email', id:'email'},
  {title: 'Département', id:'zip_code'},
  {title: 'Métiers', id: 'job'},
  {title: 'Masqué', id: 'visible_str'},
  {title: 'Qualifié', id: 'qualified_str'},
  {title: 'Accompagnement', id: 'coaching_alle'},
  {title: '% complétude', id: 'profile_progress'},
  {title: 'Assurance', id: 'insurance_type'},
  {title: 'Document assurance', id: 'insurance_report'},
]

console.log(`extracting all TIPIs`)
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() =>  User.find().populate('jobs').lean({virtuals:true}))
  .then(users => {
    return users.map(u => ({
      ...u,
      job: u.jobs.map(j => j.name).join(','),
      coaching_alle: u.coaching==COACH_ALLE ? 'oui':'non',
      created_format: moment(u[CREATED_AT_ATTRIBUTE]).format('DD/MM/YY hh:mm'),
    }))
  })
  .then(users => {
    const csvWriter = createCsvWriter({
      path: './AllTIPIs.csv',
      header: HEADERS,
      fieldDelimiter: ';'
    });
    return csvWriter.writeRecords(users)
  })
  .catch(err => console.error(errs))
  .finally(() => {
    process.exit(0)
  })
