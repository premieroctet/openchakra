const {
  CUSTOMER_USER,
  QUOTATION,
  QUOTATION_DETAIL,
  TI_USER
} = require('./data/modelsBaseData')
const Quotation = require('../../server/models/Quotation')
const QuotationDetail = require('../../server/models/QuotationDetail')
const { loadFromDb } = require('../../server/utils/database')
const {
  BOOLEAN_NO,
  COACHING,
  MISSION_STATUS_ASKING,
  MISSION_STATUS_ASKING_ALLE,
  MISSION_STATUS_BILL_SENT,
  MISSION_STATUS_DISPUTE,
  MISSION_STATUS_FINISHED,
  MISSION_STATUS_JOB_FINISHED,
  MISSION_STATUS_QUOT_ACCEPTED,
  MISSION_STATUS_QUOT_REFUSED,
  MISSION_STATUS_QUOT_SENT,
  MISSION_STATUS_TI_REFUSED,
  MISSION_STATUS_TO_BILL,
  QUOTATION_STATUS,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const JobUser = require('../../server/models/JobUser')
const User = require('../../server/models/User')
const Mission = require('../../server/models/Mission')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
require('../../server/plugins/all-inclusive/functions')
require('../../server/utils/database')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(20000)

describe('Test missions quotations', () => {

  let ti, job, customer

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    ti=await User.create({...TI_USER})
    job=await JobUser.create({user:ti, name: 'Job'})
    customer=await User.create({...CUSTOMER_USER})
    const mis=await Mission.create({name: 'Mission', description: 'Description de la mission', user:customer, recurrent: BOOLEAN_NO, job})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must return status', async() => {
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_ASKING_ALLE)
    await Mission.findOneAndUpdate({}, {$set: {job}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_ASKING)
    await Mission.findOneAndUpdate({}, {$set: {quotation_sent_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_QUOT_SENT)
    await Mission.findOneAndUpdate({}, {$set: {ti_refuse_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_TI_REFUSED)
    await Mission.findOneAndUpdate({}, {$set: {ti_refuse_date: null, quotation_sent_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_QUOT_SENT)
    await Mission.findOneAndUpdate({}, {$set: {customer_refuse_quotation_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_QUOT_REFUSED)
    await Mission.findOneAndUpdate({}, {$set: {customer_refuse_quotation_date: null, customer_accept_quotation_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_QUOT_ACCEPTED)
    await Mission.findOneAndUpdate({}, {$set: {ti_finished_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_TO_BILL)
    await Mission.findOneAndUpdate({}, {$set: {bill_sent_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_BILL_SENT)
    await Mission.findOneAndUpdate({}, {$set: {customer_accept_bill_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_FINISHED)
    await Mission.findOneAndUpdate({}, {$set: {customer_accept_bill_date: null, customer_refuse_bill_date: moment()}})
    expect((await Mission.findOne()).status).toEqual(MISSION_STATUS_DISPUTE)
  })

  it.only('must compute proper mer', async() => {
    let mission=await Mission.findOne()
    let quotation=await Quotation.create({...QUOTATION, mission})
    await QuotationDetail.create({...QUOTATION_DETAIL, quotation})
    // Not qualified: mer must be null
    // quotation=(await loadFromDb({model: 'quotation', fields: ['mer']}))[0]
    // expect(quotation.mer).toBe(0)
    // mission=(await loadFromDb({model: 'mission', fields: ['mer']}))[0]
    // expect(quotation.mer).toBe(0)
    // Qualified: mer must be >0
    await User.updateMany({}, {qualified: true})
    // quotation=(await loadFromDb({model: 'quotation', fields: ['mer']}))[0]
    // expect(quotation.mer).toBeGreaterThan(0)
    mission=(await loadFromDb({model: 'mission', fields: ['mer']}))[0]
    expect(mission.mer).toBeGreaterThan(0)
  })
})
