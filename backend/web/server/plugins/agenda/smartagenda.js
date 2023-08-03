/**
API DOC : https://www.smartagenda.fr/pro/smartdiet/api/help
*/

/**
INFOS:
- diets can be found in the pdo_agenda's only, no references elsewhere (i.e. no account)
- pdo_events.apilnk_client_id : pdo_client/client id
- pdo_events.apilnk_equipe_id: 'pdo_agenda/diet_id'
*/
const axios = require('axios')
const config = require('../../../config/config')
const crypto=require('crypto')

const SMARTAGENDA_CONFIG={
  ...config.getSmartAgendaConfig(),
  SMARTAGENDA_SHA1_PASSWORD: crypto.createHash('sha1').update(config.getSmartAgendaConfig().SMARTAGENDA_PASSWORD).digest('hex'),
}

const ALL_DATA=
`pdo_client,pdo_agenda,pdo_groupe,pdo_type_rdv,pdo_events,pdo_events_ouverture,
pdo_events_supprime,pdo_type_indispo,pdo_agenda_type_rdv,pdo_ressource,pdo_form,
pdo_form_champ,pdo_form_type_rdv,pdo_surveillance,pdo_envoi,pdo_journal,pdo_groupement`.replace(/\n/g, '').split(',')

const TOKEN_URL='https://www.smartagenda.fr/pro/smartdiet/api/token'
const BASE_URL='https://www.smartagenda.fr/pro/smartdiet/api'
const ACCOUNT_URL='https://www.smartagenda.fr/pro/smartdiet/api/pdo_client'
const AGENDAS_URL='https://www.smartagenda.fr/pro/smartdiet/api/pdo_agenda'
const EVENTS_URL='https://www.smartagenda.fr/pro/smartdiet/api/pdo_events'

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

const getAccounts = () => {
  return getToken()
    .then(token => axios.get(ACCOUNT_URL, {params:{token}}))
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
      axios.get(`${BASE_URL}/${data}`,  {params:{nbresults:100000, token}}).then(r => r.data))))
    .then(res => res.map((r, idx) => [ALL_DATA[idx], r.value]))
}


const getDietAppointments = diet_id => {
  const filter={
    'filter[0][field]':'equipe_id',
    'filter[0][comp]': '=',
    'filter[0][value]': diet_id,
    'filter[1][field]':'client_id',
    'filter[1][comp]': '<>',
    'filter[1][value]': 0,
  }
  return getToken()
    .then(token => axios.get(EVENTS_URL+'?sortdesc', {params:{token, nbresults:10000, ...filter, sortby: 'start_date'}}))
    .then(res => res.data)
}

module.exports={
  getToken,
  getAccounts,
  getAgendas,
  getEvents,
  getAllData,
  getDietAppointments,
}
