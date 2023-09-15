const {
  COACHING,
  QUOTATION_STATUS,
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
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const JobUser = require('../../server/models/JobUser')
const User = require('../../server/models/User')
const Mission = require('../../server/models/Mission')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(20000)

describe('Test quotations', () => {

  let user, job

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    user=await User.create({role: ROLE_TI, coaching: Object.keys(COACHING)[0],
      birthday: moment(), cguAccepted: true, password: 'hop', email:'tagada@a.com',
      firstname: 'Seb', lastname: 'Auvray',
    })
    job=await JobUser.create({user, name: 'Job'})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must return status', async() => {
    await Mission.create({name: 'Mission', description: 'Description de la mission', user})
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

})
