const {
  COACHING,
  QUOTATION_STATUS,
  QUOTATION_STATUS_ASKING,
  QUOTATION_STATUS_ASKING_ALLE,
  QUOTATION_STATUS_BILL_SENT,
  QUOTATION_STATUS_DISPUTE,
  QUOTATION_STATUS_FINISHED,
  QUOTATION_STATUS_JOB_FINISHED,
  QUOTATION_STATUS_QUOT_ACCEPTED,
  QUOTATION_STATUS_QUOT_REFUSED,
  QUOTATION_STATUS_QUOT_SENT,
  QUOTATION_STATUS_TI_REFUSED,
  QUOTATION_STATUS_TO_BILL,
  ROLE_TI
} = require('../../server/plugins/all-inclusive/consts')
const JobUser = require('../../server/models/JobUser')
const User = require('../../server/models/User')
const Quotation = require('../../server/models/Quotation')
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
    await Quotation.create({name: 'Devis', user})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_ASKING_ALLE)
    await Quotation.findOneAndUpdate({}, {$set: {job}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_ASKING_ALLE)
    await Quotation.findOneAndUpdate({}, {$set: {quotation_sent_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_QUOT_SENT)
    await Quotation.findOneAndUpdate({}, {$set: {ti_refuse_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_TI_REFUSED)
    await Quotation.findOneAndUpdate({}, {$set: {ti_refuse_date: null, quotation_sent_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_QUOT_SENT)
    await Quotation.findOneAndUpdate({}, {$set: {customer_refuse_quotation_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_QUOT_REFUSED)
    await Quotation.findOneAndUpdate({}, {$set: {customer_refuse_quotation_date: null, customer_accept_quotation_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_QUOT_ACCEPTED)
    await Quotation.findOneAndUpdate({}, {$set: {ti_finished_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_TO_BILL)
    await Quotation.findOneAndUpdate({}, {$set: {billing_sent_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_BILL_SENT)
    await Quotation.findOneAndUpdate({}, {$set: {customer_accept_billing_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_FINISHED)
    await Quotation.findOneAndUpdate({}, {$set: {customer_accept_billing_date: null, customer_refuse_billing_date: moment()}})
    expect((await Quotation.findOne()).status).toEqual(QUOTATION_STATUS_DISPUTE)
  })

})
