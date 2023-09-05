const {
  createAccount,
  createAppointment,
  deleteAppointment,
  getAccount,
  getAccounts,
  getAgenda,
  getAgendas,
  getAllData,
  getAppointmentTypes,
  getAvailabilities,
  getCustomerAppointments,
  getDietAppointments,
  getDietUnavailabilities,
  getEvents,
  getToken,
  smartDietToMoment,
  upsertAccount,
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

  it('must get accouonnts', async() => {
    const accounts=await getAccounts({email: 'sebastien.auvray@wappizy.com'})
    console.log(accounts)
    expect(accounts).toBeTruthy()
  })

  it('must get agenda', async() => {
    const agendas=await getAgendas()
    //console.log(agendas.map(a => a.mail))
    console.log(agendas)
    expect(agendas.length).toBeGreaterThan(0)
  })

  it('must get WA agenda', async() => {
    const agenda=await getAgenda('wilfrid.albersdorfer@wappizy.com')
    console.log(agenda)
    expect(agenda).toBeTruthy()
  })

  it('must upsert account', async() => {
    //const mail=`tugudu${moment().valueOf()}@mail.com`
    const mail=`tugudu@mail.com`
    const firstname=`First`
    const lastname=`Last`
    const account=await getAccount(mail)
    console.log(`Got account ${account}`)
    const id=account || undefined
    const createdAccount=await upsertAccount({id, email: mail, firstname, lastname}).catch(console.error)
    console.log(createdAccount)
  })

  it('must get all data', async() => {
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

  it('must find diet', async() => {
    const diet=await getAgenda('diet@test.com')
    console.log(diet)
  })

  it('must get availabilities', async() => {
    const diet=await getAgenda({email:'solene.vanuxem+dietext@wappizy.com'})
    console.log(diet)
    console.time('getAvailabilities')
    const avails=await getAvailabilities({diet_id: diet, from:moment(), to:moment().add(7, 'days')}).catch(console.error)
    console.timeEnd('getAvailabilities')
    const today_avails=avails.filter(a => a.dj=="2023-09-06")
    console.log(JSON.stringify(avails,null,2))
  })

  it('must get appointment types', async() => {
    const app_types=await getAppointmentTypes()
     expect(app_types).not.toHaveLength(0)
  })

})
