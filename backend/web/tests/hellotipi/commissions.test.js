const {
  getModel,
  getModels,
  loadFromDb
} = require('../../server/utils/database')
const { BOOLEAN_NO } = require('../../server/plugins/all-inclusive/consts')
const JobUser = require('../../server/models/JobUser')
const Mission = require('../../server/models/Mission')

const { CUSTOMER_USER, QUOTATION, TI_USER } = require('./data/modelsBaseData')
const Quotation = require('../../server/models/Quotation')
const QuotationDetail = require('../../server/models/QuotationDetail')

const User = require('../../server/models/User')
require('../../server/models/Comment')

const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
require('../../server/plugins/all-inclusive/functions')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

describe('Compute commissions tests', () => {

  let mission, quotation

  beforeAll(async () => {
    mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const ti=await User.create({...TI_USER, qualified:true})
    const client=await User.create({...CUSTOMER_USER})
    const job=await JobUser.create({user: ti, name: 'Job'})
    mission=await Mission.create({job, user: client, recurrent: BOOLEAN_NO, name: 'Mission', description: 'Description'})
    quotation=await Quotation.create({...QUOTATION, mission})
    await QuotationDetail.create({quotation, vat:20, ht_price:10, quantity:1, label: 'Ligne 1'})
    await QuotationDetail.create({quotation, vat:20, ht_price:10, quantity:1, label: 'Ligne 1'})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it("Must compute quotation billings", async() => {
    const models=await getModels()
    const quotation_fields=Object.keys(models.quotation.attributes).filter(f => !f.includes('.'))
    const [loaded_quotation]=await loadFromDb({model: 'quotation', id: quotation._id, fields:quotation_fields})
    expect(loaded_quotation.gross_ht).toEqual(20)
    expect(loaded_quotation.gross_vat).toEqual(4)
    expect(loaded_quotation.gross_total).toEqual(24)
    // Customer
    expect(loaded_quotation.mer_ht).toEqual(3)
    expect(loaded_quotation.mer_vat).toBeCloseTo(0.6)
    expect(loaded_quotation.mer_total).toEqual(3.6)
    expect(loaded_quotation.customer_ht).toEqual(23)
    expect(loaded_quotation.customer_vat).toEqual(4.6)
    expect(loaded_quotation.customer_total).toEqual(27.6)
    // TI
    expect(loaded_quotation.aa_ht).toEqual(3)
    expect(loaded_quotation.aa_vat).toBeCloseTo(0.6)
    expect(loaded_quotation.aa_total).toEqual(3.6)
    expect(loaded_quotation.ti_vat).toEqual(4.6)
    expect(loaded_quotation.ti_total).toEqual(20.4)
  })

  it("Must compute mission billings", async() => {
    const models=await getModels()
    const mission_fields=Object.keys(models.mission.attributes).filter(f => !f.includes('.'))
    const [loaded_mission]=await loadFromDb({model: 'mission', id: mission._id, fields:mission_fields})
    expect(loaded_mission.gross_ht).toEqual(20)
    expect(loaded_mission.gross_vat).toEqual(4)
    expect(loaded_mission.gross_total).toEqual(24)
    // Customer
    expect(loaded_mission.mer_ht).toEqual(3)
    expect(loaded_mission.mer_vat).toBeCloseTo(0.6)
    expect(loaded_mission.mer_total).toEqual(3.6)
    expect(loaded_mission.customer_ht).toEqual(23)
    expect(loaded_mission.customer_vat).toEqual(4.6)
    expect(loaded_mission.customer_total).toEqual(27.6)
    // TI
    expect(loaded_mission.aa_ht).toEqual(3)
    expect(loaded_mission.aa_vat).toBeCloseTo(0.6)
    expect(loaded_mission.aa_total).toEqual(3.6)
    expect(loaded_mission.ti_vat).toEqual(4.6)
    expect(loaded_mission.ti_total).toEqual(20.4)
  })

  const fieldsValues=[['aa_ht',3], ['aa_total',3.6], ['aa_vat',0.6], ['customer_total',27.6],
  ['customer_vat',4.6], ['gross_ht',20], ['gross_total',24], ['gross_vat',4],
  ['mer_ht',3], ['mer_total',3.6], ['mer_vat',0.6], ['ti_total',20.4], ['ti_vat',4.6]]

  test.each(fieldsValues)('%s equals %d', async (field, expected) => {
    const [loaded_mission]=await loadFromDb({model: 'mission', id: mission._id, fields:[field]})
    return expect(loaded_mission[field]).toBeCloseTo(expected)
  });

})
