const isEmpty = require('../server/validation/is-empty')
const {
  SIB_TEMPLATES,
  HIDE_STORE_DIALOG,
  HOSTNAME,
  MONO_PROVIDER,
  VIVAWALLET_BASE_URL,
  VIVAWALLET_API_ID,
  VIVAWALLET_API_KEY,
  VIVAWALLET_CLIENT_ID,
  VIVAWALLET_CLIENT_SECRET,
  VIVAWALLET_MODE,
  VIVAWALLET_SOURCE_CODE,
  WITHINGS_CLIENT_ID,
  WITHINGS_CLIENT_SECRET,
  PAYMENT_PLUGIN,
  STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY,
} = require('../mode')

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
    production: VIVAWALLET_MODE=='production',
    baseUrl: VIVAWALLET_BASE_URL,
    apiId: VIVAWALLET_API_ID,
    apiKey: VIVAWALLET_API_KEY,
    clientId: VIVAWALLET_CLIENT_ID,
    clientSecret: VIVAWALLET_CLIENT_SECRET,
    sourceCode: VIVAWALLET_SOURCE_CODE,
  }
}

const getStripeConfig = () => {
  return {
    STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY,
  }
}

const paymentPlugin=PAYMENT_PLUGIN ? require(`../server/plugins/payment/${PAYMENT_PLUGIN}`) : null
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
  return process.env?.PRODUCTION_ROOT
}

const getProductionPort = () => {
  return process.env?.FRONTEND_APP_PORT
}

const MONGO_BASE_URI = 'mongodb://localhost/'

const getChatURL = () => {
  return Boolean(process.env?.TAWKTO_URL)
}

const getHostName = () => {
  if (isDevelopment()) {
    return HOSTNAME || 'localhost'
  }
  if (!HOSTNAME) {
    throw new Error(`HOSTNAME config missing`)
  }
  return HOSTNAME
}

const getPort = () => {
  if (isValidation() && isNaN(parseInt(process.env?.BACKEND_PORT))) {
    throw new Error(`BACKEND_PORT config missing or not an integer`)
  }
  return process.env?.BACKEND_PORT || 443
}

const mustDisplayChat = () => {
  return Boolean(process.env?.TAWKTO_URL)
}

const isDevelopment_nossl = () => {
  return get_mode() == MODES.DEVELOPMENT_NOSSL
}

const isPlatform = () => {
  return process.env?.SITE_MODE == SITE_MODES.PLATFORM
}

const isMarketplace = () => {
  return process.env?.SITE_MODE == SITE_MODES.MARKETPLACE
}

const isMonoProvider = () => {
  return MONO_PROVIDER
}

const appName = 'myalfred'

const databaseName = process.env?.DATABASE_NAME
const serverPort = process.env?.BACKEND_PORT || 3122

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
  const port = process.env?.FRONTEND_APP_PORT
  const portStr = isDevelopment() ? `:${port}`: ''
  const host_url = `${protocol}://${hostname}${portStr}/${page}`
  return host_url
}

const getWithingsConfig = () => {
  return {
    clientId: WITHINGS_CLIENT_ID,
    clientSecret: WITHINGS_CLIENT_SECRET,
  }
}

const completeConfig = {
  default: {
    appName,
    serverPort,
    databaseUrl:
      process.env?.MONGODB_URI || `mongodb://localhost/${databaseName}`,
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
  return process.env?.SIB_APIKEY
}

const canAlfredSelfRegister = () => {
  return !isMonoProvider() && !process.env?.DISABLE_ALFRED_SELF_REGISTER
}

const canAlfredParticularRegister = () => {
  return !isMonoProvider() && !process.env?.DISABLE_ALFRED_PARTICULAR_REGISTER
}

const displayConfig = () => {
  console.log(`Configuration is:\n\
\tMode:${get_mode()}\n\
\tProduction root:${getProductionRoot()}\n\
\tSite mode:${
    isPlatform() ? 'plateforme' : isMarketplace() ? 'marketplace' : 'inconnu'
  }\n\
\tDatabase:${databaseName}\n\
\tData model:${process.env?.DATA_MODEL}\n\
\tServer prod:${SERVER_PROD}\n\
\tServer port:${getPort()}\n\
\tHost URL:${getHostUrl()}\n\
\tDisplay chat:${mustDisplayChat()} ${mustDisplayChat() ? getChatURL() : ''}\n\
\tSendInBlue actif:${ENABLE_MAILING}\n\
\tSendInBlue templates:${process.env?.DATA_MODEL}\n\
Payment plugin:${PAYMENT_PLUGIN}:${!!paymentPlugin} keys is ${STRIPE_PUBLIC_KEY?.slice(0, 20)}...${STRIPE_PUBLIC_KEY?.slice(-6)}\n\
`)
}

const checkConfig = () => {
  return new Promise((resolve, reject) => {
    if (!Object.values(MODES).includes(process.env.MODE)) {
      reject(
        `MODE: ${process.env.MODE} inconnu, attendu ${JSON.stringiffy(
          Object.values(MODES),
        )}`,
      )
    }
    if (!Object.values(SITE_MODES).includes(process.env?.SITE_MODE)) {
      reject(
        `SITE_MODE: ${process.env?.SITE_MODE} inconnu, attendu ${JSON.stringify(
          Object.values(SITE_MODES),
        )}`,
      )
    }

    if (!isDevelopment() && !HOSTNAME) {
      reject(`HOSTNAME: obligatoire en mode ${process.env.MODE}`)
    }

    if (isValidation() && isNaN(parseInt(process.env?.BACKEND_PORT))) {
      reject(`PORT: obligatoire en mode ${process.env.MODE}`)
    }

    if (isEmpty(process.env?.DATABASE_NAME)) {
      reject(`DATABASE_NAME non renseigné`)
    }
    if (isEmpty(process.env?.PRODUCTION_ROOT)) {
      reject(`PRODUCTION_ROOT non renseigné`)
    }
    if (isEmpty(process.env?.FRONTEND_APP_PORT)) {
      reject(`env var FRONTEND_APP_PORT non renseigné`)
    }
    // Deprecated
    if (SIB_TEMPLATES) {
      console.warn(
        `** deprecated SIB_TEMPLATE, using DATA_MODEL instead:remove it in configuration file`,
      )
    }
    // TODO check database name correctness
    if (isEmpty(process.env?.SIB_APIKEY)) {
      reject(`SIB_APIKEY non renseigné`)
    }
    if (isEmpty(process.env?.DATA_MODEL)) {
      reject(`DATA_MODEL non renseigné`)
    }
    displayConfig()
    resolve('Configuration OK')
  })
}

const getDatabaseUri = () => {
  return `${MONGO_BASE_URI}${process.env?.DATABASE_NAME}`
}

const getDataModel = () => {
  return process.env?.DATA_MODEL
}

// Hide application installation popup
const hideStoreDialog = () => {
  return !!HIDE_STORE_DIALOG
}

/**
ONLY DEV & VALIDATION MODES
Consider failed payment succeeded
*/
const skipFailedPayment = () => {
  return !isProduction() && !!process.env?.SKIP_FAILED_PAYMENT
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
}
