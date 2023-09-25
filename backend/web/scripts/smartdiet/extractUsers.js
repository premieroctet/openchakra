const path=require('path')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../../.env')})
const { displayConfig } = require('../../config/config')
const moment = require('moment')
const { CREATED_AT_ATTRIBUTE } = require('../../utils/consts')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const {getDatabaseUri} = require('../../config/config')
const mongoose=require('mongoose')
const User = require('../../server/models/User')
const { ROLES } = require('../../server/plugins/smartdiet/consts')
require('../../server/plugins/smartdiet/functions')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const HEADERS=[
  {title: 'Créé le', id:'created_format'},
  {title: 'Prénom', id:'firstname'},
  {title: 'Nom', id:'lastname'},
  {title: 'Email', id:'email'},
  {title: 'Role', id: 'role'},
  {title: 'Code entreprise', id: 'company_code'},
  {title: 'Nom entreprise', id: 'company_name'},
]

console.log(`extracting all Smartdiet accounts`)
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() =>  User.find().populate('company').lean({virtuals:true}))
  .then(users => {
    return users.map(u => ({
      ...u,
      created_format: moment(u[CREATED_AT_ATTRIBUTE]).format('DD/MM/YY hh:mm'),
      role: ROLES[u.role],
      company_name : u.company?.name
    }))
  })
  .then(users => {
    const csvWriter = createCsvWriter({
      path: './AllSmartdiet.csv',
      header: HEADERS,
      fieldDelimiter: ';'
    });
    return csvWriter.writeRecords(users)
  })
  .catch(err => console.error(errs))
  .finally(() => {
    process.exit(0)
  })
