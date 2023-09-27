const path=require('path')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)
const lodash=require('lodash')

const MODES = {
  PRODUCTION: 'production',
  VALIDATION: 'validation',
  DEVELOPMENT: 'development',
  DEVELOPMENT_NOSSL: 'development_nossl',
}


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
  return process.env.FRONTEND_APP_PORT
}

const mustDisplayChat = () => {
  return Boolean(process.env.TAWKTO_URL)
}

const isDevelopment_nossl = () => {
  return get_mode() == MODES.DEVELOPMENT_NOSSL
}

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
  const port = getPort()
  const portStr = isDevelopment() ? `:${port}`: ''
  const host_url = `${protocol}://${hostname}${portStr}/${page}`
  return host_url
}

// TODO: remove muistDisplayChat
const displayConfig = () => {
  console.log(`Configuration is:\n\
\tMode:${get_mode()}\n\
\tProduction root:${getProductionRoot()}\n\
\tServer prod:${SERVER_PROD}\n\
\tServer port:${process.env.FRONTEND_APP_PORT}\n\
\tHost URL:${getHostUrl()}\n\
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
    if (!isDevelopment() && !process.env.HOSTDOMAIN) {
      reject(`HOSTDOMAIN: obligatoire en mode ${process.env.MODE}`)
    }

    if (isValidation() && isNaN(parseInt(process.env.BACKEND_PORT))) {
      reject(`PORT: obligatoire en mode ${process.env.MODE}`)
    }
    if (lodash.isEmpty(process.env.FRONTEND_APP_PORT)) {
      reject(`env var FRONTEND_APP_PORT non renseigné`)
    }
    displayConfig()
    resolve('Configuration OK')
  })
}

const getDatabaseUri = () => {
  return `${MONGO_BASE_URI}${process.env.DATABASE_NAME}`
}

// DEV mode: allow https without certificate
if (isDevelopment()) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

// Public API
module.exports = {
  checkConfig,
}
