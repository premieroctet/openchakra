const axios = require('axios')
const {
  getAccounts,
  getAgendas,
  getAllData,
  getDietAppointments,
  getEvents,
  getToken,
} = require('../../server/plugins/agenda/smartagenda')
const { PERIOD } = require('../../server/plugins/smartdiet/consts')
const moment = require('moment')
const lodash=require('lodash')
const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

const mongoose = require('mongoose')

jest.setTimeout(1000000)

describe('SmartAgenda test ', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must get a token', async() => {
    const token=await getToken()
    expect(token).toBeTruthy()
  })

  it('must get acounts', async() => {
    const accounts=await getAccounts()
    console.log(accounts.length)
    expect(accounts).toBeTruthy()
  })

  it('must get agenda', async() => {
    const agendas=await getAgendas()
    console.log(agendas.length)
    expect(agendas).toBeTruthy()
  })

  it('must get all data', async() => {
    const events=await getAllData()
    console.log(JSON.stringify(events, null, 2))
    expect(events).toBeTruthy()
  })

  it.only('must get diet app', async() => {
    const events=(await getDietAppointments(8))
      .map(c => lodash.pick(c, 'start_date,text,client_prenom,client_nom,client_infos'.split(',')))
    console.log(JSON.stringify(events, null, 2))
  })

})
