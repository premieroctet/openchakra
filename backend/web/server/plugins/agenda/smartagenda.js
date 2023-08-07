/**
API DOC : https://www.smartagenda.fr/pro/smartdiet/api/help
*/

/**
INFOS:
- diets can be found in the pdo_agenda's only, no references elsewhere (i.e. no account)
- pdo_events.apilnk_client_id : pdo_client/client id
- pdo_events.apilnk_equipe_id: 'pdo_agenda/diet_id'
- appointments start & end dates must be rounded at 1/4h
*/
const axios = require('axios')
const config = require('../../../config/config')
const crypto=require('crypto')
const moment=require('moment')
require('moment-round')

const SMARTAGENDA_CONFIG={
  ...config.getSmartAgendaConfig(),
  SMARTAGENDA_SHA1_PASSWORD: crypto.createHash('sha1').update(config.getSmartAgendaConfig().SMARTAGENDA_PASSWORD).digest('hex'),
}

const MAX_RESULTS=1000

const ALL_DATA=//['pdo_type_indispo']
`pdo_client,pdo_agenda,pdo_groupe,pdo_type_rdv,pdo_events,pdo_events_ouverture,
pdo_events_supprime,pdo_type_indispo,pdo_agenda_type_rdv,pdo_ressource,pdo_form,
pdo_form_champ,pdo_form_type_rdv,pdo_surveillance,pdo_envoi,pdo_journal,pdo_groupement`.replace(/\n/g, '').split(',')

const TOKEN_URL='https://www.smartagenda.fr/pro/smartdiet/api/token'
const BASE_URL='https://www.smartagenda.fr/pro/smartdiet/api'
const ACCOUNT_URL='https://www.smartagenda.fr/pro/smartdiet/api/pdo_client'
const AGENDAS_URL='https://www.smartagenda.fr/pro/smartdiet/api/pdo_agenda'
const EVENTS_URL='https://www.smartagenda.fr/pro/smartdiet/api/pdo_events'

// returns moment rounded to the nearest 15 minutes
const momentToQuarter = m => {
  if (!m) { return m}
  const res=moment(m).round(15, 'minutes')
  return res
}

const SMARTDIET_DATE_FORMAT='YYYY-MM-DD HH:mm:00'
// moment => 2000-01-01 12:00:00
const momentToSmartDate = m => {
  if (!m) { return m}
  const res=momentToQuarter(m).format('YYYY-MM-DD HH:mm:00')
  return res
}

// moment => 2000-01-01 12:00:00
const smartDietToMoment = sm => {
  if (!sm) { return sm}
  if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(sm)) {
    throw new Error(`Incorrect format:${sm}`)
  }
  const res=moment(sm, SMARTDIET_DATE_FORMAT)
  if (!res.isValid()) {
    throw new Error(`Incorrect moment:${sm},moment.invalidatAt:${res.invalidAt()}`)
  }
  return res
}

const getToken = () => {
  const params={
    login: SMARTAGENDA_CONFIG.SMARTAGENDA_LOGIN,
    pwd: SMARTAGENDA_CONFIG.SMARTAGENDA_SHA1_PASSWORD,
    api_id: SMARTAGENDA_CONFIG.SMARTAGENDA_API_ID,
    api_key: SMARTAGENDA_CONFIG.SMARTAGENDA_API_KEY,
  }
  return axios.get(TOKEN_URL, {params:params})
    .then(res => res.data.token)
}

const getAccounts = (filter) => {
  let filters=filter?.email ? {
    'filter[0][field]': 'mail',
    'filter[0][comp]': 'LIKE',
    'filter[0][value]': `%${filter.email}%`,
  }: {}
  return getToken()
    .then(token => axios.get(ACCOUNT_URL, {params:{token, nbresults: MAX_RESULTS, ...filters}}))
    .then(res => res.data)
}

// I.e les diets
const getAgendas = () => {
  return getToken()
    .then(token => axios.get(AGENDAS_URL, {params:{token}}))
    .then(res => res.data)
}

const getEvents = () => {
  return getToken()
    .then(token => axios.get(EVENTS_URL, {params:{token}}))
    .then(res => res.data)
}

const getAllData = () => {
  return getToken()
    .then(token => Promise.allSettled(ALL_DATA.map(data =>
      axios.get(`${BASE_URL}/${data}`,  {params:{nbresults: MAX_RESULTS*100, token}}).then(r => r.data))))
    //.then(res => Object.entries(res.map((r, idx) => [ALL_DATA[idx], r.value])))
    .then(res => Object.fromEntries(res.map((r, idx) => [ALL_DATA[idx], r.value])))
}


const getDietAppointments = diet_id => {
  const filter={
    'filter[0][field]':'equipe_id',
    'filter[0][comp]': '=',
    'filter[0][value]': diet_id,
  }
  return getToken()
    .then(token => axios.get(EVENTS_URL+'?sortdesc', {params:{token, nbresults: MAX_RESULTS, ...filter, sortby: 'start_date'}}))
    .then(res => res.data)
}

const getDietUnavailabilities = diet_id => {
  const filter={
    'filter[0][field]':'equipe_id',
    'filter[0][comp]': '=',
    'filter[0][value]': diet_id,
    'filter[1][field]':'presta_id',
    'filter[1][comp]': '=',
    'filter[1][value]': -1,
  }
  return getToken()
    .then(token => axios.get(EVENTS_URL+'?sortdesc', {params:{token, nbresults: MAX_RESULTS, ...filter, sortby: 'start_date'}}))
    .then(res => res.data)
}

const getCustomerAppointments = customer_id => {
  const filter={
    'filter[0][field]':'client_id',
    'filter[0][comp]': '=',
    'filter[0][value]': customer_id,
  }
  return getToken()
    .then(token => axios.get(EVENTS_URL+'?sortdesc', {params:{token, nbresults: MAX_RESULTS, ...filter, sortby: 'start_date'}}))
    .then(res => res.data)
}

const createAppointment = (diet_id, client_id, start_date, end_date) => {
  const data={
    equipe_id: diet_id,
    client_id: client_id,
    presta_id: '0',
    text: 'Un rendez-vous',
    internet: 'App Smartdiet',
    start_date: momentToSmartDate(start_date),
    end_date: momentToSmartDate(end_date),}

  return getToken()
    .then(token => axios.post(`${EVENTS_URL}?token=${token}`, data))
    .then(res => res.data)
}

const deleteAppointment = app_id => {
  return getToken()
    .then(token => axios.delete(`${EVENTS_URL}?token=${token}&id=${app_id}`))
    .then(res => res.data)
}

module.exports={
  getToken,
  getAccounts,
  getAgendas,
  getEvents,
  getAllData,
  getDietAppointments,
  createAppointment,
  getCustomerAppointments,
  deleteAppointment,
  getDietUnavailabilities,
  smartDietToMoment,
}
