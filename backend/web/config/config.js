const path=require('path')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)
const isEmpty = require('../server/validation/is-empty')
const pm2=require('pm2')
const lodash=require('lodash')

const SITE_MODES = {
  MARKETPLACE: 'marketplace',
  PLATFORM: 'platform',
}

const MODES = {
  PRODUCTION: 'production',
  VALIDATION: 'validation',
  DEVELOPMENT: 'development',
  DEVELOPMENT_NOSSL: 'development_nossl',
}

const PAYMENT_PLUGINS = {
  MANGOPAY: 'mangopay',
  STRIPE: 'stripe',
}

const getVivaWalletConfig = () => {
  return {
    production: process.env.VIVAWALLET_MODE=='production',
    apiId: process.env.VIVAWALLET_API_ID,
    apiKey: process.env.VIVAWALLET_API_KEY,
    clientId: process.env.VIVAWALLET_CLIENT_ID,
    clientSecret: process.env.VIVAWALLET_CLIENT_SECRET,
    sourceCode: process.env.VIVAWALLET_SOURCE_CODE,
  }
}

const getStripeConfig = () => {
  return {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  }
}

const getSmartAgendaConfig = () => {
  return {
    SMARTAGENDA_LOGIN: process.env.SMARTAGENDA_LOGIN,
    SMARTAGENDA_PASSWORD: process.env.SMARTAGENDA_PASSWORD,
    SMARTAGENDA_API_ID: process.env.SMARTAGENDA_API_ID,
    SMARTAGENDA_API_KEY: process.env.SMARTAGENDA_API_KEY,
    SMARTAGENDA_URL_PART: process.env.SMARTAGENDA_URL_PART,
  }
}

const paymentPlugin=process.env.PAYMENT_PLUGIN
  ? require(`../server/plugins/payment/${process.env.PAYMENT_PLUGIN}`)
  : null
paymentPlugin?.init(getStripeConfig())

const get_mode = () => {
  if (!Object.values(MODES).includes(process.env.MODE)) {
    console.error(
      `Incorrect startup mode ${process.env.MODE}, expecting ${Object.values(MODES)}`,
    )
    process.exit(-1)
  }
  return process.env.MODE
}

const isProduction = () => {
  return get_mode() == MODES.PRODUCTION
}

const isValidation = () => {
  return get_mode() == MODES.VALIDATION
}

const isDevelopment = () => {
  return (
    get_mode() == MODES.DEVELOPMENT || get_mode() == MODES.DEVELOPMENT_NOSSL
  )
}

const getProductionRoot = () => {
  return process.env.PRODUCTION_ROOT
}

const getProductionPort = () => {
  return process.env.FRONTEND_APP_PORT
}

const MONGO_BASE_URI = 'mongodb://localhost/'

const getChatURL = () => {
  return Boolean(process.env.TAWKTO_URL)
}

const getHostName = () => {
  if (isDevelopment()) {
    return process.env.HOSTDOMAIN || 'localhost'
  }
  if (!process.env.HOSTDOMAIN) {
    throw new Error(`HOSTDOMAIN config missing`)
  }
  return process.env.HOSTDOMAIN
}

const getPort = () => {
  if (isValidation() && isNaN(parseInt(process.env.BACKEND_PORT))) {
    throw new Error(`BACKEND_PORT config missing or not an integer`)
  }
  return process.env.BACKEND_PORT || 443
}

const mustDisplayChat = () => {
  return Boolean(process.env.TAWKTO_URL)
}

const isDevelopment_nossl = () => {
  return get_mode() == MODES.DEVELOPMENT_NOSSL
}

const isPlatform = () => {
  return process.env.SITE_MODE == SITE_MODES.PLATFORM
}

const isMarketplace = () => {
  return process.env.SITE_MODE == SITE_MODES.MARKETPLACE
}

const isMonoProvider = () => {
  return Boolean(process.env.MONO_PROVIDER)
}

const appName = 'myalfred'

const databaseName = process.env.DATABASE_NAME
const serverPort = process.env.BACKEND_PORT || 3122

const SERVER_PROD = isProduction() || isDevelopment()

const ENABLE_MAILING = isProduction()

const getHostUrl = page => {
  const protocol = 'https'
  const hostname = getHostName()
  const port = getPort()
  const includePort =
     (protocol == 'https' && port != 443) || (protocol == 'http' && port != 80)
  const host_url = `${protocol}://${hostname}${includePort ? `:${port}` : ''}/${page}`
  return host_url
}

const getProductionUrl = page => {
  const protocol = 'https'
  const hostname = getHostName()
  const port = process.env.FRONTEND_APP_PORT
  const portStr = isDevelopment() ? `:${port}`: ''
  const host_url = `${protocol}://${hostname}${portStr}/${page}`
  return host_url
}

const getWithingsConfig = () => {
  return {
    clientId: process.env.WITHINGS_CLIENT_ID,
    clientSecret: process.env.WITHINGS_CLIENT_SECRET,
  }
}

const completeConfig = {
  default: {
    appName,
    serverPort,
    databaseUrl:
      process.env.MONGODB_URI || `mongodb://localhost/${databaseName}`,
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

const getMailProvider = () => {
  return process.env.MAIL_PROVIDER
}

const getSibApiKey = () => {
  return process.env.SIB_APIKEY
}

const getMailjetConfig = () => {
  return {
    MAILJET_PUBLIC_KEY: process.env.MAILJET_PUBLIC_KEY,
    MAILJET_PRIVATE_KEY: process.env.MAILJET_PRIVATE_KEY,
  }
}

const canAlfredSelfRegister = () => {
  return !isMonoProvider() && !process.env.DISABLE_ALFRED_SELF_REGISTER
}

const canAlfredParticularRegister = () => {
  return !isMonoProvider() && !process.env.DISABLE_ALFRED_PARTICULAR_REGISTER
}

// TODO: remove muistDisplayChat
const displayConfig = () => {
  console.log(`Configuration is:\n\
\tMode:${get_mode()}\n\
\tProduction root:${getProductionRoot()}\n\
\tSite mode:${
    isPlatform() ? 'plateforme' : isMarketplace() ? 'marketplace' : 'inconnu'
  }\n\
\tDatabase:${databaseName}\n\
\tData model:${getDataModel()}\n\
\tServer prod:${SERVER_PROD}\n\
\tServer port:${getPort()}\n\
\tHost URL:${getHostUrl()}\n\
\tDisplay chat:${mustDisplayChat()} ${mustDisplayChat() ? getChatURL() : ''}\n\
\tSendInBlue actif:${ENABLE_MAILING}\n\
\tSendInBlue templates:${getDataModel()}\n\
Payment plugin:${process.env.PAYMENT_PLUGIN}:${!!paymentPlugin} keys is ${process.env.STRIPE_PUBLIC_KEY?.slice(0, 20)}...${process.env.STRIPE_PUBLIC_KEY?.slice(-6)}\n\
`)
}

const checkConfig = () => {
  return new Promise((resolve, reject) => {
    if (!Object.values(MODES).includes(process.env.MODE)) {
      reject(
        `MODE: ${process.env.MODE} inconnu, attendu ${JSON.stringify(
          Object.values(MODES),
        )}`,
      )
    }
    if (!Object.values(SITE_MODES).includes(process.env.SITE_MODE)) {
      reject(
        `SITE_MODE: ${process.env.SITE_MODE} inconnu, attendu ${JSON.stringify(
          Object.values(SITE_MODES),
        )}`,
      )
    }

    if (!isDevelopment() && !process.env.HOSTDOMAIN) {
      reject(`HOSTDOMAIN: obligatoire en mode ${process.env.MODE}`)
    }

    if (isValidation() && isNaN(parseInt(process.env.BACKEND_PORT))) {
      reject(`PORT: obligatoire en mode ${process.env.MODE}`)
    }

    if (isEmpty(process.env.DATABASE_NAME)) {
      reject(`DATABASE_NAME non renseigné`)
    }
    if (isEmpty(process.env.PRODUCTION_ROOT)) {
      reject(`PRODUCTION_ROOT non renseigné`)
    }
    if (isEmpty(process.env.FRONTEND_APP_PORT)) {
      reject(`env var FRONTEND_APP_PORT non renseigné`)
    }
    if (isEmpty(process.env.DATA_MODEL)) {
      reject(`DATA_MODEL non renseigné`)
    }
    if (isEmpty(process.env.S3_ID)) {
      reject(`S3_ID non renseigné`)
    }
    if (isEmpty(process.env.S3_SECRET)) {
      reject(`S3_SECRET non renseigné`)
    }
    if (isEmpty(process.env.S3_BUCKET)) {
      reject(`S3_BUCKET non renseigné`)
    }
    if (isEmpty(process.env.S3_REGION)) {
      reject(`S3_REGION non renseigné`)
    }
    if (isEmpty(process.env.S3_PROD_ROOTPATH)) {
      reject(`S3_PROD_ROOTPATH non renseigné`)
    }
    if (isEmpty(process.env.S3_STUDIO_ROOTPATH)) {
      reject(`S3_STUDIO_ROOTPATH non renseigné`)
    }
    if (!!getMailProvider() && !getMailProvider().split(',').every(mp => ['mailjet', 'sendInBlue', 'brevo'].includes(mp))) {
      reject(`Mail provider ${getMailProvider()} incorrect`)
    }

    displayConfig()
    resolve('Configuration OK')
  })
}

const getDatabaseUri = () => {
  return `${MONGO_BASE_URI}${process.env.DATABASE_NAME}`
}

const getDataModel = () => {
  return process.env.DATA_MODEL
}

// Hide application installation popup
const hideStoreDialog = () => {
  return !!process.env.HIDE_STORE_DIALOG
}

/**
ONLY DEV & VALIDATION MODES
Consider failed payment succeeded
*/
const skipFailedPayment = () => {
  return !isProduction() && !!process.env.SKIP_FAILED_PAYMENT
}

// DEV mode: allow https without certificate
if (isDevelopment()) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

const RANDOM_ID = new Date().getTime()

const DOC_PATH = `/static/assets/docs/${getDataModel()}`
const CGV_PATH = `${DOC_PATH}/cgv.pdf`
// CGV expires afeter. If null, does never expire
const CGV_EXPIRATION_DELAY = 365

const bookingUrl = (serviceUserId, extraParams = {}) => {
  let params = new URLSearchParams()
  let url = null
  if (getDataModel() == 'aftral') {
    url = `/training/${serviceUserId}`
  }
  else {
    url = '/userServicePreview'
    params.append('id', serviceUserId)
  }
  Object.entries(extraParams).forEach(([key, value]) => {
    params.append(key, value)
  })
  if ([...params].length > 0) {
    url = `${url}?${params.toString()}`
  }
  return url
}

let _isMaster=isDevelopment() ? true :  undefined

const isMaster = () => {
  return _isMaster
}

const setMasterStatus = () => {
  if (!lodash.isNil(_isMaster)) {
    console.log(`Master already set, leaving`)
    return
  }
  // Connect to the local PM2 instance
  pm2.connect(function (err) {
    if (err) {
      console.log(`No PM2: I'm the master`);
      _isMaster=true
      return
    }

    // Get the list of processes
    pm2.list(function (err, list) {
      if (err) {
        console.log(`No PM2 list: I'm the master`);
        _isMaster=true
        pm2.disconnect()
        return
      }

      const processName=`BACKEND-${process.env.DATA_MODEL}-${process.env.BACKEND_PORT}`.toUpperCase()
      const all_pids=lodash(list).filter(p => p.name==processName).map(p => p.pid)
      const lowest_group_pid=all_pids.min()
      console.log('master, my pid', process.pid, 'all pids', JSON.stringify(all_pids.value()), 'min pid', lowest_group_pid)
      if (!lowest_group_pid) {
        console.log(`No PM2 process ${processName}:I'm the master`)
        _isMaster=true
        return
      }
      _isMaster=process.pid==lowest_group_pid
      console.log(`PM2 processes found: I'm ${_isMaster ? '': 'not ' }the master ()`)
      pm2.disconnect();
    });
  })
}

// Delay master detection to ensure all PM2 processes have started
!isDevelopment() && setTimeout(setMasterStatus, 1000)

// Public API
module.exports = {
  databaseName: databaseName,
  config: {
    ...completeConfig.default,
    ...completeConfig[process.env.NODE_ENV],
  },
  completeConfig,
  SIRET,
  isProduction,
  isValidation,
  isDevelopment,
  isDevelopment_nossl,
  SERVER_PROD,
  getHostUrl,
  ENABLE_MAILING,
  mustDisplayChat,
  getChatURL,
  canAlfredSelfRegister,
  canAlfredParticularRegister,
  checkConfig,
  getDatabaseUri,
  hideStoreDialog,
  isPlatform,
  isMarketplace,
  isMonoProvider,
  getDataModel,
  skipFailedPayment,
  getSibApiKey,
  getPort,
  RANDOM_ID,
  displayConfig,
  DOC_PATH,
  CGV_PATH,
  CGV_EXPIRATION_DELAY,
  bookingUrl,
  getProductionRoot,
  getProductionPort,
  getVivaWalletConfig,
  getWithingsConfig,
  getHostName,
  paymentPlugin,
  getProductionUrl,
  getSmartAgendaConfig,
  getMailProvider,
  getMailjetConfig,
  isMaster,
}
