const lodash=require('lodash')
const {
  WORKFLOWS,
  updateWorkflows
} = require('../../server/plugins/smartdiet/functions')
const AppointmentType = require('../../server/models/AppointmentType')
const {
  APPOINTMENT_DATA,
  COACHING_DATA,
  COLLECTIVE_CHALLENGE_DATA,
  COMPANY_DATA,
  GROUP_DATA,
  KEY_DATA,
  OFFER_DATA,
  USER_DATA
} = require('./data/modelsBaseData')
const Appointment = require('../../server/models/Appointment')
const Coaching = require('../../server/models/Coaching')
const { ROLE_EXTERNAL_DIET } = require('../../server/plugins/smartdiet/consts')
const CollectiveChallenge = require('../../server/models/CollectiveChallenge')
const { MONGOOSE_OPTIONS, loadFromDb } = require('../../server/utils/database')
const Key = require('../../server/models/Key')
const Group = require('../../server/models/Group')
const Offer = require('../../server/models/Offer')
const Company = require('../../server/models/Company')
const Lead = require('../../server/models/Lead')
const User = require('../../server/models/User')
const moment = require('moment')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet}=require('../utils')

forceDataModelSmartdiet()
const {computeWorkflowLists}=require('../../server/plugins/smartdiet/functions')
const MAIL_HANDLER=require('../../server/utils/mailjet')

require('../../server/models/Target')
require('../../server/models/UserQuizz')
require('../../server/models/Key')
require('../../server/models/Association')
require('../../server/models/Category')
require('../../server/models/Item')
require('../../server/models/Question')

describe('Worflows', () => {

  const LEADONLY='leadonly@wappizy.com'
  const LEADUSER='leadanduser@wappizy.com'
  const DIET='diet@wappizy.com'

  let company
  let anyUser
  let leadUser
  let diet
  let key
  let offer
  let appointmentType

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    company=await Company.create({...COMPANY_DATA, code: 'COMPCODE'})
    offer=await Offer.create({...OFFER_DATA, company})
    key=await Key.create({...KEY_DATA})
    anyUser=await Lead.create({...USER_DATA, email: LEADONLY, company_code: company.code})
    await Lead.create({...USER_DATA, email: LEADUSER, company_code: company.code})
    leadUser=await User.create({...USER_DATA, email: LEADUSER, password: 'pass', company})
    diet=await User.create({...USER_DATA, role: ROLE_EXTERNAL_DIET,  email: DIET, password: 'pass', company})
    appointmentType=await AppointmentType.create({smartagenda_id: 0, duration: 2, title: 'Rendez-vous'})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  afterEach(async() => {
    await Group.deleteMany({})
    await CollectiveChallenge.deleteMany({})
    await Coaching.deleteMany({})
    await Appointment.deleteMany({})
    offer.coaching_credit=0
    await offer.save()
  })


  it('must filter CL_LEAD_NOCOA_NOGROUP', async() => {
    const result=await computeWorkflowLists()
    expect(result.CL_LEAD_NOCOA_NOGROUP.add).toContain(LEADONLY)
    expect(result.CL_LEAD_NOCOA_NOGROUP.add).not.toContain(LEADUSER)
    expect(result.CL_LEAD_NOCOA_NOGROUP.add).not.toContain(DIET)
  })

  it('must filter CL_LEAD_NOCOA_GROUP', async() => {
    await Group.create({...GROUP_DATA, key, moderator: anyUser, companies:[company._id]})
    const result=await computeWorkflowLists()
    expect(result.CL_LEAD_NOCOA_GROUP.add).toContain(LEADONLY)
    expect(result.CL_LEAD_NOCOA_GROUP.add).not.toContain(LEADUSER)
    expect(result.CL_LEAD_NOCOA_GROUP.add).not.toContain(DIET)
  })

  it('must filter CL_LEAD_COA_NOGROUP', async() => {
    offer.coaching_credit=12
    await offer.save()
    const result=await computeWorkflowLists()
    expect(result.CL_LEAD_COA_NOGROUP.add).toContain(LEADONLY)
    expect(result.CL_LEAD_COA_NOGROUP.add).not.toContain(LEADUSER)
    expect(result.CL_LEAD_COA_NOGROUP.add).not.toContain(DIET)
  })

  it('must filter CL_LEAD_COA_GROUP', async() => {
    await Group.create({...GROUP_DATA, key, moderator: anyUser, companies:[company._id]})
    offer.coaching_credit=12
    await offer.save()
    const result=await computeWorkflowLists()
    expect(result.CL_LEAD_COA_GROUP.add).toContain(LEADONLY)
    expect(result.CL_LEAD_COA_GROUP.add).not.toContain(LEADUSER)
    expect(result.CL_LEAD_COA_GROUP.add).not.toContain(DIET)
  })

  it('must filter CL_REGISTERED', async() => {
    const result=await computeWorkflowLists()
    expect(result.CL_REGISTERED).not.toContain(LEADONLY)
    expect(result.CL_REGISTERED.add).toContain(LEADUSER)
    expect(result.CL_REGISTERED.add).not.toContain(DIET)
  })

  it('must filter CL_REGISTERED_COLL_CHALL', async() => {
    let challenge=await CollectiveChallenge.create({...COLLECTIVE_CHALLENGE_DATA, start_date: moment().add(29, 'days'), end_date: moment(), user:anyUser, company})
    const result=await computeWorkflowLists()
    expect(result.CL_REGISTERED_COLL_CHALL.add).not.toContain(LEADONLY)
    expect(result.CL_REGISTERED_COLL_CHALL.add).toContain(LEADUSER)
    expect(result.CL_REGISTERED_COLL_CHALL.add).not.toContain(DIET)
  })

  it('must filter CL_REGISTERED_FIRST_COA_APPT', async() => {
    const coaching=await Coaching.create({...COACHING_DATA, user: leadUser})
    await Appointment.create({...APPOINTMENT_DATA, appointment_type: appointmentType,
      start_date: moment().add(-3, 'hour'), end_date:moment().add(-2, 'hour'), coaching,
    })
    const result=await computeWorkflowLists()
    expect(result.CL_REGISTERED_FIRST_COA_APPT.add).not.toContain(LEADONLY)
    expect(result.CL_REGISTERED_FIRST_COA_APPT.add).toContain(LEADUSER)
    expect(result.CL_REGISTERED_FIRST_COA_APPT.add).not.toContain(DIET)
  })

  it('Must compute workflows list', async() => {
    const res=await computeWorkflowLists()
    console.log(JSON.stringify(res, null,2))
    const removed=Object.values(res).find(v => v.remove.length>0).remove
    const added=Object.values(res).find(v => v.remove.length>0).remove
    console.log(JSON.stringify(removed[0]))
    expect(added.every(item => lodash.isObject(item))).toBe(true)
    expect(removed.every(item => lodash.isObject(item))).toBe(true)
  })

  it.only('Must update workflows', async() => {
    const res=await updateWorkflows()
    console.log(res)
  })

  it.skip('must add to list with parameters', async() => {
    const list=WORKFLOWS.CL_LEAD_COA_NOGROUP.id
    //const properties={codeentreprise: 'Com hop12', credit_consult: 19, Client:'La compagnie', logo: 'hophophop'}
    const properties={codeentreprise: 'Com hop12', credit_consult: 19, client: 'compagnie', logo: false}
    const contacts=[{email: 'hello+testeasninogroup@wappizy.com', properties}]
    await MAIL_HANDLER.addContactsToList({contacts, list})
  })
})
