const {
  createAppointment,
  deleteAppointment,
  getAccounts,
  getAgendas,
  getAllData,
  getCustomerAppointments,
  getDietAppointments,
  getDietUnavailabilities,
  getEvents,
  getToken,
  smartDietToMoment,
} = require('../../server/plugins/agenda/smartagenda')
const axios = require('axios')
const { PERIOD } = require('../../server/plugins/smartdiet/consts')
const moment = require('moment')
const lodash=require('lodash')
const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

const mongoose = require('mongoose')

jest.setTimeout(1000000)

const PAULINE_ID=56
const SEB_ID=7996

describe('SmartAgenda test ', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must get a token', async() => {
    const token=await getToken()
    expect(token).toBeTruthy()
  })

  it('must get accounts', async() => {
    const accounts=await getAccounts({email: 'sebastien.auvray@wappizy.com'})
    console.log(accounts)
    expect(accounts).toBeTruthy()
  })

  it('must get agenda', async() => {
    const agendas=await getAgendas()
    console.log(agendas.map(a => a.mail))
    expect(agendas.length).toBeGreaterThan(0)
  })

  it.skip('must get all data', async() => {
    const events=await getAllData()
    console.log(JSON.stringify(events, null, 2))
    expect(events).toBeTruthy()
  })

  it('must get PAULINE diet appointments', async() => {
    const events=(await getDietAppointments(PAULINE_ID))
      .map(c => lodash.omitBy(c, (v, k) => /^(c|montant)/.test(k)))
    console.log(JSON.stringify(events[0], null, 2))
  })

  it('must get SEB customer appointments', async() => {
    const events=(await getCustomerAppointments(SEB_ID))
    .map(c => lodash.omitBy(c, (v, k) => /^(c|montant)/.test(k)))
    console.log(JSON.stringify(events, null, 2))
  })

  it('must create then delete an appointment', async() => {
    const diet_id=PAULINE_ID
    const customer_id=SEB_ID

    return createAppointment(diet_id, customer_id, moment(), moment().add(4, 'hour'))
      .then(app => deleteAppointment(app.id))
      .catch(console.error)
  })

  it('must find non availabilities', async() => {
    const events=(await getDietUnavailabilities(PAULINE_ID))
      .map(c => lodash.omitBy(c, (v, k) => /^(c|montant)/.test(k)))
      .map(c => lodash.omitBy(c, (v, k) => /^apilnk/.test(k)))
      .map(c => lodash.omitBy(c, (v, k) => /^date_/.test(k)))
    console.log(JSON.stringify(events, null, 2))
  })

  it('must convert date', async() => {
    expect(() => smartDietToMoment('2023-01-09 30:23:15')).toThrow(/Incorrect moment/)
    expect(smartDietToMoment('2023-01-09 12:23:15').date()).toEqual(9)
  })

})
