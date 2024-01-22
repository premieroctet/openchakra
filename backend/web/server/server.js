const path = require('path')
const https = require('https')
const fs = require('fs')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)
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
  isProduction,
  isValidation,
  isDevelopment,
  isDevelopment_nossl,
  config,
  getDataModel,
} = require('../config/config')
const {HTTP_CODES, parseError} = require('./utils/errors')
require('./models/Answer')
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
require('./models/Gift')
require('./models/SpoonGain')
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
require('./models/ChartPoint')
require('./models/TeamMember')
require('./models/ChallengePip')
require('./models/Coaching')
require('./models/Consultation')
require('./models/CoachingQuestion')
require('./models/UserCoachingQuestion')
require('./models/Network')
require('./models/DietComment')
require('./models/FoodDocument')
require('./models/Quizz')
require('./models/QuizzQuestion')
require('./models/UserQuizz')
require('./models/UserQuizzQuestion')
require('./models/Item')
require('./models/Range')
require('./models/Availability')
require('./models/LogbookDay')
require('./models/CoachingLogbook')
require('./models/Lead')
require('./models/AppointmentType')
require('./models/GraphData')
require('./models/Issue')
require('./models/Project')
require('./models/UserProject')
require('./models/Module')
require('./models/Article')
require('./models/BestPractices')
require('./models/Tip')
require('./models/Emergency')
require('./models/Step')
require('./models/DeclineReason')
require('./models/Interest')
require('./models/Job')
require('./models/NutritionAdvice')
require('./models/JoinReason')

const {MONGOOSE_OPTIONS} = require('./utils/database')

require('console-stamp')(console, '[dd/mm/yy HH:MM:ss.l]')

const dev = process.env.NODE_DEV !== 'production' // true false
const prod = process.env.NODE_DEV === 'production' // true false
const nextApp =
  isProduction() || isValidation() ? next({prod}) : next({dev})
const routes = require('./routes')
const routerHandler = routes.getRequestHandler(nextApp)
const studio = require('./routes/api/studio')
const withings = getDataModel()=='dekuple' ? require('./routes/api/withings') : null
const app = express()
const {serverContextFromRequest} = require('./utils/serverContext')
let custom_router=null
try {
  custom_router=require(`./plugins/${getDataModel()}/routes`).router
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') { throw err }
  console.warn(`No custom routes for ${getDataModel()}`)
}

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
    app.use('/myAlfred/api/studio', studio)
    !!withings && app.use('/myAlfred/api/withings', withings)
    !!custom_router && app.use(`/myAlfred/api/${getDataModel()}`, custom_router)

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
      console.log(`Server started OK`)
    })
  })
  .catch(err => {
    console.error(`**** Démarrage impossible:${err}`)
    process.exit(1)
  })
