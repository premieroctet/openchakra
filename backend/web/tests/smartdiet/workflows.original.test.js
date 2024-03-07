const {
  WORKFLOWS,
  computeWorkflowLists,
  mapContactToMailJet,
  updateWorkflows
} = require('../../server/plugins/smartdiet/workflows')
const {
  COMPANY_ACTIVITY_ASSURANCE,
  COMPANY_ACTIVITY_BANQUE,
  ROLE_EXTERNAL_DIET
} = require('../../server/plugins/smartdiet/consts')
const {
  APPOINTMENT_DATA,
  COACHING_DATA,
  COLLECTIVE_CHALLENGE_DATA,
  COMPANY_NO_INSURANCE_DATA,
  GROUP_DATA,
  KEY_DATA,
  OFFER_DATA,
  USER_DATA
} = require('./data/modelsBaseData')
const lodash=require('lodash')
const AppointmentType = require('../../server/models/AppointmentType')
const Appointment = require('../../server/models/Appointment')
const Coaching = require('../../server/models/Coaching')
const { MONGOOSE_OPTIONS, loadFromDb } = require('../../server/utils/database')
const CollectiveChallenge = require('../../server/models/CollectiveChallenge')
const Key = require('../../server/models/Key')
const Offer = require('../../server/models/Offer')
const Company = require('../../server/models/Company')
const Lead = require('../../server/models/Lead')
const User = require('../../server/models/User')
const moment = require('moment')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet}=require('../utils')

forceDataModelSmartdiet()
const MAIL_HANDLER=require('../../server/utils/mailjet')
const { getDatabaseUri } = require('../../config/config')

require('../../server/models/Target')
require('../../server/models/UserQuizz')
require('../../server/models/Key')
require('../../server/models/Association')
require('../../server/models/Category')
require('../../server/models/Item')
require('../../server/models/Question')

jest.setTimeout(50000)

describe('Worflows', () => {

  const LEADONLY='audrey.hamelin@sinch.com'

  beforeAll(async() => {
    await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.close()
  })

  const emailContained = email => {
    return expect.arrayContaining([expect.objectContaining( {Email: email})])
  }


  it('must filter CL_ADH_LEAD_COA_NOGROUP_NOT_OPENED', async() => {
    const result=await computeWorkflowLists()
    console.log(result)
    expect(result.CL_ADH_LEAD_COA_NOGROUP_NOT_OPENED.add).toEqual(emailContained(LEADONLY))
  })


})
