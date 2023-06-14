const axios = require('axios')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const passport = require('passport')
const glob = require('glob')
const cors = require('cors')
const autoIncrement = require('mongoose-auto-increment')
const {
  RANDOM_ID,
  checkConfig,
  getDatabaseUri,
  getHostUrl,
  getPort,
} = require('../config/config')
const {HTTP_CODES, parseError} = require('./utils/errors')
require('./models/ResetToken')
require('./models/Program')
require('./models/Theme')
require('./models/Resource')
require('./models/Session')
require('./models/TrainingCenter')
require('./models/User')
require('./models/Contact')
require('./models/Message')
require('./models/LoggedUser')
require('./models/Post')
require('./models/Event')
require('./models/Company')
require('./models/Drink')
require('./models/Meal')
require('./models/Cigar')
require('./models/OrderItem')
require('./models/Booking')
require('./models/Guest')
require('./models/CigarCategory')
require('./models/DrinkCategory')
require('./models/MealCategory')
require('./models/Conversation')
require('./models/Measure')
require('./models/Reminder')
require('./models/Appointment')
require('./models/Payment')
require('./models/Accessory')
require('./models/AccessoryCategory')
require('./models/Review')
require('./models/Offer')
require('./models/Content')
require('./models/Key')
require('./models/Group')
require('./models/Target')
require('./models/PartnerApplication')
require('./models/Spoon')
require('./models/CollectiveChallenge')
require('./models/PartnerApplication')
require('./models/Gift')
require('./models/SpoonGain')
require('./models/Content')
require('./models/Menu')
require('./models/Webinar')
require('./models/IndividualChallenge')
require('./models/JobUser')
require('./models/Comment')
require('./models/Recommandation')
require('./models/Quotation')
require('./models/Skill')
require('./models/Activity')
require('./models/Experience')
require('./models/Request')
require('./models/Pip')
require('./models/Diploma')
require('./models/Photo')
require('./models/Mission')
require('./models/QuotationDetail')
require('./models/Contact')
require('./models/Recipe')
require('./models/Instrument')
require('./models/Ingredient')
require('./models/RecipeIngredient')
require('./models/AdminDashboard')
require('./models/Question')
require('./models/UserQuestion')
require('./models/UserSurvey')
require('./models/MenuRecipe')
require('./models/Team')
require('./models/Association')

const {MONGOOSE_OPTIONS} = require('./utils/database')

require('console-stamp')(console, '[dd/mm/yy HH:MM:ss.l]')

const {
  isProduction,
  isValidation,
  isDevelopment,
  isDevelopment_nossl,
} = require('../config/config')
const dev = process.env.NODE_DEV !== 'production' // true false
const prod = process.env.NODE_DEV === 'production' // true false
const nextApp =
  isProduction() || isValidation() ? next({prod}) : next({dev})
const routes = require('./routes')
const routerHandler = routes.getRequestHandler(nextApp)
const {config} = require('../config/config')
const http = require('http')
const https = require('https')
const fs = require('fs')
const studio = require('./routes/api/studio')
const withings = require('./routes/api/withings')
const path = require('path')
const app = express()
const {serverContextFromRequest} = require('./utils/serverContext')

// TODO Terminer les notifications
// throw new Error(`\n${'*'.repeat(30)}\n  TERMINER LES NOTIFICATIONS\n${'*'.repeat(30)}`)
// checkConfig
checkConfig()
  .then(() => {
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
      .then(conn => autoIncrement.initialize(conn))
  })
  // Connect to MongoDB
  .then(() => {
    console.log(`MongoDB connecté: ${getDatabaseUri()}`)
    return nextApp.prepare()
  })
  .then(() => {
    // Body parser middleware
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    // Body POST limit
    app.use(express.json({limit: '1mb'}))
    app.use(express.urlencoded({limit: '1mb'}))
    // Passport middleware
    app.use(passport.initialize())

    app.use(cookieParser())
    // Passport config
    /* eslint-disable global-require */
    require('./config/passport')
    /* eslint-enable global-require */

    // Context handling
    app.use((req, res, next) => {
      // console.log(`REQUEST:${req.method}, ${req.originalUrl}, ${JSON.stringify(req.body)}`)
      serverContextFromRequest(req)
        .then(context => {
          req.context = context
          return next()
        })
        .catch(err => {
          console.error(err)
          return res.status(500).json(err)
        })
    })

    // Hide test pages
    app.use((req, res, next) => {
      if (isProduction() && req.url.match(/^\/test\//)) {
        return res.sendStatus(HTTP_CODES.NOT_FOUND)
      }
      return next()
    })

    app.use(cors())

    // Check hostname is valid
    app.use('/testping', (req, res) => res.json(RANDOM_ID))
    app.use('/myAlfred/api/studio', studio)
    app.use('/myAlfred/api/withings', withings)

    // const port = process.env.PORT || 5000;
    const rootPath = path.join(__dirname, '/..')
    glob.sync(`${rootPath}/server/api/*.js`).forEach(controllerPath => {
      if (!controllerPath.includes('.test.js')) {
        /* eslint-disable global-require */
        require(controllerPath)(app)
        /* eslint-enable global-require */
      }
    })

    if (!isDevelopment_nossl() && !isDevelopment()) {
      app.use((req, res, next) => {
        if (!req.secure) {
          console.log(`'Redirecting to ${JSON.stringify(req.originalUrl)}`)
          res.redirect(302, `https://${req.hostname}${req.originalUrl}`)
        }
        next()
      })
    }
    app.get('*', routerHandler)

    // Single error handler.YEAAAAAHHHHHH !!!
    app.use((err, req, res, next) => {
      console.error(err)
      const {status, body}=parseError(err)
      return res.status(status).json(body)
    })

    // HTTP only handling redirect to HTTPS
    // http.createServer((req, res) => {
    //   res.writeHead(301, {'Location': `https://${ req.headers.host }${req.url}`})
    //   res.end()
    // }).listen(80)
    // console.log('Created server on port 80')

    // HTTPS server using certificates
    const httpsServer = https.createServer(
      {
        cert: fs.readFileSync(`${process.env.HOME}/.ssh/fullchain.pem`),
        key: fs.readFileSync(`${process.env.HOME}/.ssh/privkey.pem`),
      },
      app,
    )

    httpsServer.listen(getPort(), () => {
      console.log(`${config.appName} running on ${getHostUrl()}`)
      console.log(`Checking correct hostname`)
      !isDevelopment() && axios
        .get(new URL('/testping', getHostUrl()).toString())
        .then(({data}) => {
          if (data != RANDOM_ID) {
            throw new Error(`Host ${getHostUrl()} is wrong`)
          }
          console.log(`Checked correct hostname OK`)
        })
        .catch(err => {
          console.error(err)
          process.exit(1)
        })
    })
  })
  .catch(err => {
    console.error(`**** Démarrage impossible:${err}`)
    process.exit(1)
  })
