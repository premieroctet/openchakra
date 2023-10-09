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
    company=await Company.create({...COMPANY_NO_INSURANCE_DATA, code: 'COMPCODE'})
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
    await CollectiveChallenge.deleteMany({})
    await Coaching.deleteMany({})
    await Appointment.deleteMany({})
    offer.coaching_credit=0
    offer.groups_unlimited=false
    await offer.save()
    company.activity=COMPANY_ACTIVITY_BANQUE
    company=await company.save()
  })

  const emailContained = email => {
    return expect.arrayContaining([expect.objectContaining( {Email: email})])
  }


  it('must filter CL_SALAR_LEAD_NOCOA_NOGROUP', async() => {
    const result=await computeWorkflowLists()
    expect(result.CL_SALAR_LEAD_NOCOA_NOGROUP.add).toEqual(emailContained(LEADONLY))
    expect(result.CL_SALAR_LEAD_NOCOA_NOGROUP.add).not.toEqual(emailContained(LEADUSER))
    expect(result.CL_SALAR_LEAD_NOCOA_NOGROUP.add).not.toEqual(emailContained(DIET))
  })

  it('must filter CL_SALAR_LEAD_NOCOA_GROUP', async() => {
    offer.groups_unlimited=true
    await offer.save()
    const result=await computeWorkflowLists()
    expect(result.CL_SALAR_LEAD_NOCOA_GROUP.add).toEqual(emailContained(LEADONLY))
    expect(result.CL_SALAR_LEAD_NOCOA_GROUP.add).not.toEqual(emailContained(LEADUSER))
    expect(result.CL_SALAR_LEAD_NOCOA_GROUP.add).not.toEqual(emailContained(DIET))
  })

  it('must filter CL_SALAR_LEAD_COA_NOGROUP', async() => {
    offer.coaching_credit=12
    await offer.save()
    const result=await computeWorkflowLists()
    expect(result.CL_SALAR_LEAD_COA_NOGROUP.add).toEqual(emailContained(LEADONLY))
    expect(result.CL_SALAR_LEAD_COA_NOGROUP.add).not.toEqual(emailContained(LEADUSER))
    expect(result.CL_SALAR_LEAD_COA_NOGROUP.add).not.toEqual(emailContained(DIET))
  })

  it('must filter CL_SALAR_LEAD_COA_GROUP', async() => {
    offer.groups_unlimited=true
    offer.coaching_credit=12
    await offer.save()
    const result=await computeWorkflowLists()
    expect(result.CL_SALAR_LEAD_COA_GROUP.add).toEqual(emailContained(LEADONLY))
    expect(result.CL_SALAR_LEAD_COA_GROUP.add).not.toEqual(emailContained(LEADUSER))
    expect(result.CL_SALAR_LEAD_COA_GROUP.add).not.toEqual(emailContained(DIET))
  })

  it('must filter CL_REGISTERED', async() => {
    const result=await computeWorkflowLists()
    expect(result.CL_REGISTERED).not.toEqual(emailContained(LEADONLY))
    expect(result.CL_REGISTERED.add).toEqual(emailContained(LEADUSER))
    expect(result.CL_REGISTERED.add).not.toEqual(emailContained(DIET))
  })

  it('must filter CL_SALAR_REGISTERED_COLL_CHALL', async() => {
    let challenge=await CollectiveChallenge.create({...COLLECTIVE_CHALLENGE_DATA, start_date: moment().add(29, 'days'), end_date: moment(), user:anyUser, company})
    const result=await computeWorkflowLists()
    expect(result.CL_SALAR_REGISTERED_COLL_CHALL.add).not.toEqual(emailContained(LEADONLY))
    expect(result.CL_SALAR_REGISTERED_COLL_CHALL.add).toEqual(emailContained(LEADUSER))
    expect(result.CL_SALAR_REGISTERED_COLL_CHALL.add).not.toEqual(emailContained(DIET))
  })

  it('must filter CL_SALAR_REGISTERED_FIRST_COA_APPT', async() => {
    const coaching=await Coaching.create({...COACHING_DATA, user: leadUser})
    await Appointment.create({...APPOINTMENT_DATA, appointment_type: appointmentType,
      start_date: moment().add(-3, 'hour'), end_date:moment().add(-2, 'hour'), coaching,
    })
    const result=await computeWorkflowLists()
    expect(result.CL_SALAR_REGISTERED_FIRST_COA_APPT.add).not.toEqual(emailContained(LEADONLY))
    expect(result.CL_SALAR_REGISTERED_FIRST_COA_APPT.add).toEqual(emailContained(LEADUSER))
    expect(result.CL_SALAR_REGISTERED_FIRST_COA_APPT.add).not.toEqual(emailContained(DIET))
  })

  it('must filter CL_ADHER_LEAD_COA_NOGROUP', async() => {
    offer.coaching_credit=12
    await offer.save()
    company.activity=COMPANY_ACTIVITY_ASSURANCE
    await company.save()
    const result=await computeWorkflowLists()
    expect(result.CL_ADHER_LEAD_COA_NOGROUP.add).toEqual(emailContained(LEADONLY))
    expect(result.CL_ADHER_LEAD_COA_NOGROUP.add).not.toEqual(emailContained(LEADUSER))
    expect(result.CL_ADHER_LEAD_COA_NOGROUP.add).not.toEqual(emailContained(DIET))
  })

  it('Must compute workflows list', async() => {
    const res=await computeWorkflowLists()
    const removed=Object.values(res).find(v => v.remove.length>0).remove
    const added=Object.values(res).find(v => v.remove.length>0).remove
    expect(added.every(item => lodash.isObject(item))).toBe(true)
    expect(removed.every(item => lodash.isObject(item))).toBe(true)
  })

  it('Must update workflows', async() => {
    const res=await updateWorkflows()
  })

  it('must add to list with parameters', async() => {
    const list=WORKFLOWS.CL_SALAR_LEAD_COA_NOGROUP.id
    //const properties={codeentreprise: 'Com hop12', credit_consult: 19, Client:'La compagnie', logo: 'hophophop'}
    const properties={codeentreprise: 'Com hop12', credit_consult: 19, client: 'compagnie', logo: false}
    const contacts=[mapContactToMailJet({email: 'hello+testeasninogroup@wappizy.com', properties})]
    await MAIL_HANDLER.addContactsToList({contacts, list})
  })

  it('Must display groups', async() => {
    const allLists=await MAIL_HANDLER.getContactsLists()
    //console.log(allLists.filter(l => /adh/i.test(l.Name)))
  })
})
