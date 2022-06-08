const isEmpty = require('../server/validation/is-empty')
const {MODE, TAWKTO_URL, DISABLE_ALFRED_SELF_REGISTER, DISABLE_ALFRED_PARTICULAR_REGISTER,
  SIB_TEMPLATES, DATABASE_NAME, HIDE_STORE_DIALOG, MANGOPAY_CLIENTID, MANGOPAY_APIKEY, DATA_MODEL, SKIP_FAILED_PAYMENT,
  SIB_APIKEY, HOSTNAME, PORT}=require('../mode')

const MODES={
  PRODUCTION: 'production',
  VALIDATION: 'validation',
  DEVELOPMENT: 'development',
  DEVELOPMENT_NOSSL: 'development_nossl',
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

const MONGO_BASE_URI='mongodb://localhost/'

const getChatURL = () => {
  return TAWKTO_URL
}

const getHostName= () => {
  if (is_development()) {
    return 'localhost'
  }
  if(!HOSTNAME) {
    throw new Error(`HOSTNAME config missing`)
  }
  return HOSTNAME
}

const getPort = () => {
  if (is_validation() && isNaN(parseInt(PORT))) {
    throw new Error(`PORT config missing or not an integer`)
  }
  return PORT || 443
}

const mustDisplayChat = () => {
  return Boolean(TAWKTO_URL)
}

const is_development_nossl = () => {
  return get_mode()==MODES.DEVELOPMENT_NOSSL
}

const appName = 'myalfred'

const databaseName = DATABASE_NAME
const serverPort = process.env.PORT || 3122

const SERVER_PROD = is_production() || is_development()

const ENABLE_MAILING = is_production()

const getHostUrl = () => {
  const protocol='https'
  const hostname=getHostName()
  const port=getPort()
  const includePort=(protocol=='https' && port!=443) || (protocol=='http' && port!=80)
  const host_url=`${protocol}://${hostname}${includePort ? `:${port}` : ''}/`
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
\tServer port:${getPort()}\n\
\tHost URL:${getHostUrl()}\n\
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

    if (!is_development() && !HOSTNAME) {
      reject(`HOSTNAME: obligatoire en mode ${MODE}`)
    }

    if (is_validation() && isNaN(parseInt(PORT))) {
      reject(`PORT: obligatoire en mode ${MODE}`)
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
    if (isEmpty(DATA_MODEL)) {
      reject(`DATA_MODEL non renseigné`)
    }
    if (isEmpty(SIB_APIKEY)) {
      reject(`SIB_APIKEY non renseigné`)
    }
    displayConfig()
    resolve('Configuration OK')
  })
}

const getDatabaseUri = () => {
  return `${MONGO_BASE_URI}${DATABASE_NAME}`
}

const getDataModel = () => {
  return DATA_MODEL
}

// Hide application installation popup
const hideStoreDialog = () => {
  return !!HIDE_STORE_DIALOG
}

const skipFailedPayment = () => {
  return !is_production() && !!SKIP_FAILED_PAYMENT
}

// DEV mode: allow https without certificate
if (is_development()) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

// Public API
module.exports = {
  databaseName: databaseName,
  config: {...completeConfig.default, ...completeConfig[process.env.NODE_ENV]},
  completeConfig,
  SIRET,
  is_production, is_validation, is_development, is_development_nossl, SERVER_PROD,
  getHostUrl, MANGOPAY_CONFIG,
  ENABLE_MAILING,
  mustDisplayChat, getChatURL,
  canAlfredSelfRegister, canAlfredParticularRegister,
  getSibTemplates, checkConfig, getDatabaseUri, hideStoreDialog,
  getDataModel, skipFailedPayment, getSibApiKey, getPort,
}
