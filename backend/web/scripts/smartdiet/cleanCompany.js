const Company = require('../../server/models/Company')

const { ROLE_CUSTOMER } = require('../../server/plugins/smartdiet/consts')

const Diploma = require('../../server/models/Diploma')

const Group = require('../../server/models/Group')

const TeamMember = require('../../server/models/TeamMember')

const Content = require('../../server/models/Content')

const Comment = require('../../server/models/Comment')

const UserSurvey = require('../../server/models/UserSurvey')

const Measure = require('../../server/models/Measure')

const Appointment = require('../../server/models/Appointment')
const Coaching = require('../../server/models/Coaching')
const Message = require('../../server/models/Message')
const User = require('../../server/models/User')
require('../../server/models/LogbookDay')
require('../../server/models/UserSurvey')
require('../../server/models/UserQuestion')

const { getDatabaseUri } = require('../../config/config')

const { MONGOOSE_OPTIONS } = require('../../server/utils/database')

const { getDataModel } = require('../../config/config')
const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')

const checkDeleted = company => {
  const id = company._id.toString()
  return Promise.all(mongoose.modelNames().map(modelName => {
    return mongoose.models[modelName].find()
      .then(documents => documents.filter(doc => JSON.stringify(doc).includes(id)))
      .then(docs => {
        if (docs.length>0) {
          console.log(`${company.name}(${company.id}) is still in the ${modelName} document(s):${JSON.stringify(docs)}`)
        }
      })
  }))
}

const cleanCompany = name => {
  return Company.findOne({name})
    .then(company => {
      if (!company) { throw new Error(`Company ${name} not found`)}
      const id=company._id
      console.log(`Removing company ${name} ${id}`)
      return company.delete()
    })
    .then(comp => checkDeleted(comp))
}



if (!getDataModel()=='smartdiet') {
  console.errro(`Run as smartdiet datamodel`)
}
const company_name=process.argv.slice(2, 4)
if (!company_name) {
  console.log(`Expected company name to delete`)
  process.exit(1)
}
console.log(`Cleaning company ${company_name}`)
return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => cleanCompany(company_name))
  //.then(console.log)
  .catch(console.error)
  .finally(() => process.exit())
