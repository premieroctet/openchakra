const { COMPANY_DATA, USER_DATA, DIET_DATA } = require('./data/modelsBaseData')
const { COMPANY_ACTIVITY, COMPANY_ACTIVITY_OTHER } = require('../../server/plugins/smartdiet/consts')
const Company = require('../../server/models/Company')
const path=require('path')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const fs=require('fs')
const moment = require('moment')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

const Lead=require('../../server/models/Lead')
const User = require('../../server/models/User')
const NutritionAdvice = require('../../server/models/NutritionAdvice')
require('../../server/models/Content')
require('../../server/models/Comment')

describe('Prospects', () => {

  let leadsData
  beforeEach(async () => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must return proper nut advices', async() => {
    const patient_email='test@test.com'
    const unknown_patient_email='unknown@test.com'
    const diet1_email='diet@test.com'
    const diet2_email='diet@test.com'
    const company=await Company.create({...COMPANY_DATA, name: 'test', activity: COMPANY_ACTIVITY_OTHER})
    const user=await User.create({...USER_DATA, company, email: patient_email, password: 'hop'})
    const diet1=await User.create({...DIET_DATA, email: diet1_email, password: 'hop'})
    const diet2=await User.create({...DIET_DATA, email: diet2_email, password: 'hop'})
    const nuts=[[diet1, unknown_patient_email], [diet1, patient_email],[diet2, unknown_patient_email], [diet2, patient_email]]
    await Promise.all(nuts.map(([d, p]) => NutritionAdvice.create({diet: d, patient_email:p, comment: 'c' })))
    const nutDiet1=await User.findOne({email: diet1_email}).populate('nutrition_advices')
    const nutDiet2=await User.findOne({email: diet2_email}).populate('nutrition_advices')
    const nutPatient=await User.findOne({email: patient_email}).populate('nutrition_advices')
    expect(nutDiet1.nutrition_advices).toHaveLength(2)
    expect(nutDiet2.nutrition_advices).toHaveLength(2)
    expect(nutPatient.nutrition_advices).toHaveLength(2)
  })

})
