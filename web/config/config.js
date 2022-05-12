const isEmpty = require('../server/validation/is-empty')
const {MODES, LOCAL_HOST, AMAZON_HOST}=require('../utils/consts')
const {MODE, TAWKTO_URL, DISABLE_ALFRED_SELF_REGISTER, DISABLE_ALFRED_PARTICULAR_REGISTER,
  SIB_TEMPLATES, DATABASE_NAME, HIDE_STORE_DIALOG, MANGOPAY_CLIENTID, MANGOPAY_APIKEY,
  SKIP_FAILED_PAYMENT, SIB_APIKEY}=require('../mode')

const MONGO_BASE_URI='mongodb://localhost/'

const getChatURL = () => {
  return TAWKTO_URL
}

const mustDisplayChat = () => {
  return Boolean(TAWKTO_URL)
}

const get_mode = () => {
  if (!Object.values(MODES).includes(MODE)) {
    console.error(`Incorrect startup mode ${MODE}, expecting ${Object.values(MODES)}`)
    process.exit(-1)
  }
  return MODE
}

const is_production = () => {
  return get_mode()==MODES.PRODUCTION
}

const is_validation = () => {
  return get_mode()==MODES.VALIDATION
}

const is_development = () => {
  return get_mode()==MODES.DEVELOPMENT || get_mode()==MODES.DEVELOPMENT_NOSSL
}

const is_development_nossl = () => {
  return get_mode()==MODES.DEVELOPMENT_NOSSL
}

const appName = 'myalfred'

const databaseName = DATABASE_NAME
const serverPort = process.env.PORT || 3122

const SERVER_PROD = is_production() || is_development()

const ENABLE_MAILING = is_production()

const get_host_url = () => {
  const protocol='https'
  const hostname=is_development() ? LOCAL_HOST : AMAZON_HOST
  const port=is_validation() ? ':3122' : ''
  const host_url=`${protocol}://${hostname}${port}/`
  return host_url
}

const MANGOPAY_CONFIG = {
  clientId: MANGOPAY_CLIENTID,
  clientApiKey: MANGOPAY_APIKEY,
  sandbox: !is_production(),
}

if (is_production()) {
  MANGOPAY_CONFIG.baseUrl='https://api.mangopay.com'
}

const completeConfig = {

  default: {
    appName,
    serverPort,
    databaseUrl: process.env.MONGODB_URI || `mongodb://localhost/${databaseName}`,
    jsonOptions: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  },

  development: {
    appUrl: `http://localhost:${serverPort}`,
  },

  production: {
    appUrl: `http://localhost:${serverPort}`,
  },

}

// TODO computeUrl (req, path) => https://hostname/path
const computeUrl = req => {
  return `https://${req.headers.host}`
}

const SIRET = {
  token: 'ca27811b-126c-35db-aaf0-49aea431706e',
  siretUrl: 'https://api.insee.fr/entreprises/sirene/V3/siret',
  sirenUrl: 'https://api.insee.fr/entreprises/sirene/V3/siren',
}

const getSibApiKey = () => {
  return SIB_APIKEY
}

const canAlfredSelfRegister = () => {
  return !DISABLE_ALFRED_SELF_REGISTER
}

const canAlfredParticularRegister = () => {
  return !DISABLE_ALFRED_PARTICULAR_REGISTER
}

const getSibTemplates = () => {
  return SIB_TEMPLATES || null
}

const displayConfig = () => {

  if (!getSibTemplates()) {
    console.error('Undefined SIB_TEMPLATES in mode.js, stopping')
    process.exit(1)
  }

  console.log(`Configuration is:\n\
\tMode:${get_mode()}\n\
\tDatabase:${databaseName}\n\
\tServer prod:${SERVER_PROD}\n\
\tServer port:${SERVER_PROD ? '80/443':'3122'}\n\
\tHost URL:${get_host_url()}\n\
\tDisplay chat:${mustDisplayChat()} ${getChatURL()}\n\
\tSendInBlue actif:${ENABLE_MAILING}\n\
\tSendInBlue templates:${SIB_TEMPLATES}\n\
\tMangopay clientId:${MANGOPAY_CONFIG.clientId}\
`)
}

const checkConfig = () => {
  return new Promise((resolve, reject) => {
    if (!Object.values(MODES).includes(MODE)) {
      reject(`MODE: ${MODE} inconnu, attendu dans ${Object.values(MODES)}`)
    }
    if (isEmpty(DATABASE_NAME)) {
      reject(`DATABASE_NAME non renseigné`)
    }
    // TODO check database name correctness
    if (isEmpty(SIB_TEMPLATES)) {
      reject(`SIB_TEMPLATES non renseigné`)
    }
    // TODO check database name correctness
    if (isEmpty(SIB_APIKEY)) {
      reject(`SIB_APIKEY non renseigné`)
    }
    if (isEmpty(MANGOPAY_CLIENTID)) {
      reject(`MANGOPAY_CLIENTID non renseigné`)
    }
    if (isEmpty(MANGOPAY_APIKEY)) {
      reject(`MANGOPAY_APIKEY non renseigné`)
    }
    displayConfig()
    resolve('Configuration OK')
  })
}

const getDatabaseUri = () => {
  return `${MONGO_BASE_URI}${DATABASE_NAME}`
}

// Hide application installation popup
const hideStoreDialog = () => {
  return !!HIDE_STORE_DIALOG
}

const skipFailedPayment = () => {
  return !is_production() && !!SKIP_FAILED_PAYMENT
}
// Public API
module.exports = {
  databaseName: databaseName,
  config: {...completeConfig.default, ...completeConfig[process.env.NODE_ENV]},
  completeConfig,
  computeUrl,
  SIRET,
  is_production, is_validation, is_development, is_development_nossl, SERVER_PROD,
  get_host_url, MANGOPAY_CONFIG,
  ENABLE_MAILING,
  mustDisplayChat, getChatURL,
  canAlfredSelfRegister, canAlfredParticularRegister,
  getSibTemplates, checkConfig, getDatabaseUri, hideStoreDialog,
  skipFailedPayment,
  getSibApiKey,
}
