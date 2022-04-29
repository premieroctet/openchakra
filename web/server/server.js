const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const passport = require('passport')
const glob = require('glob')
const cors = require('cors')
const SocketIo = require('socket.io')
const {checkConfig, getDatabaseUri} = require('../config/config')
const Service = require('./models/Service')
const Booking = require('./models/Booking')
const ServiceUser = require('./models/ServiceUser')
const Category = require('./models/Category')
const PriceList = require('./models/PriceList')
const {MONGOOSE_OPTIONS} = require('./utils/database')


require('console-stamp')(console, '[dd/mm/yy HH:MM:ss.l]')

const {is_production, is_validation, is_development, is_development_nossl} = require('../config/config')
const dev = process.env.NODE_DEV !== 'production' // true false
const prod = process.env.NODE_DEV === 'production' // true false
const nextApp = is_production() || is_validation() ? next({prod}) : next({dev})
const routes = require('./routes')
const routerHandler = routes.getRequestHandler(nextApp)
const {config, SERVER_PROD} = require('../config/config')
const http = require('http')
const https = require('https')
const fs = require('fs')
const authRoutes = require('./routes/api/authentication')
const users = require('./routes/api/users')
const companies = require('./routes/api/companies')
const groups = require('./routes/api/groups')
const category = Category && require('./routes/api/category')
const billing = require('./routes/api/billing')
const booking = Booking && require('./routes/api/booking')
const quotation = require('./routes/api/quotation')
const order = require('./routes/api/order')
const products = require('./routes/api/products')
const prices = PriceList && require('./routes/api/prices')
const shiprates = require('./routes/api/shiprates')
const equipment = require('./routes/api/equipment')
const filterPresentation = require('./routes/api/filterPresentation')
const job = require('./routes/api/job')
const message = require('./routes/api/message')
const newsletter = require('./routes/api/newsletter')
const service = Service && require('./routes/api/service')
const prestation = require('./routes/api/prestation')
const serviceUser = ServiceUser && require('./routes/api/serviceUser')
const shop = require('./routes/api/shop')
const reviews = require('./routes/api/reviews')
const availability = require('./routes/api/availability')
const performances = require('./routes/api/performances')
const payment = require('./routes/api/payment')
const chatRooms = require('./routes/api/chatRooms')
const admin = require('./routes/api/admin/dashboard')
const blog = require('./routes/api/blog')
const feurst = require('./routes/api/feurst/feurst')
const path = require('path')
const app = express()
const {serverContextFromRequest}=require('./utils/serverContext')

// checkConfig
checkConfig()
  .then(() => {
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  })
// Connect to MongoDB
  .then(() => {
    console.log(`MongoDB connecté: ${getDatabaseUri()}`)
    return nextApp.prepare()
  })
  .then(() => {

    // Body parser middleware
    app.use(bodyParser.urlencoded({extended: false}))
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
      serverContextFromRequest(req)
        .then(context => {
          req.context=context
          return next()
        })
        .catch(err => {
          console.error(err)
          return res.status(500).json(err)
        })
    })

    // Hide test pages
    app.use((req, res, next) => {
      if (!is_development() && req.url.match(/^\/test\//)) {
        return res.sendStatus(404)
      }
      return next()
    })

    app.use(cors())


    app.use('/myAlfred/api/users', users)
    app.use('/myAlfred/api/companies', companies)
    category && app.use('/myAlfred/api/category', category)
    app.use('/myAlfred/api/groups', groups)
    app.use('/myAlfred/api/billing', billing)
    booking && app.use('/myAlfred/api/booking', booking)
    app.use('/myAlfred/api/quotations', quotation)
    app.use('/myAlfred/api/orders', order)
    app.use('/myAlfred/api/products', products)
    app.use('/myAlfred/api/shiprates', shiprates)
    app.use('/myAlfred/api/equipment', equipment)
    app.use('/myAlfred/api/filterPresentation', filterPresentation)
    app.use('/myAlfred/api/job', job)
    app.use('/myAlfred/api/message', message)
    app.use('/myAlfred/api/newsletter', newsletter)
    service && app.use('/myAlfred/api/service', service)
    app.use('/myAlfred/api/prestation', prestation)
    prices && app.use('/myAlfred/api/prices', prices)
    serviceUser && app.use('/myAlfred/api/serviceUser', serviceUser)
    app.use('/myAlfred/api/shop', shop)
    app.use('/myAlfred/api/admin', admin)
    app.use('/myAlfred/api/reviews', reviews)
    app.use('/myAlfred/api/availability', availability)
    app.use('/myAlfred/api/chatRooms', chatRooms)
    app.use('/myAlfred/api/performances', performances)
    app.use('/myAlfred/api/payment', payment)
    app.use('/myAlfred/api/authentication', authRoutes)
    app.use('/blog', blog)
    app.use('/feurst/api', feurst)

    // const port = process.env.PORT || 5000;
    const rootPath = path.join(__dirname, '/..')
    glob.sync(`${rootPath}/server/api/*.js`).forEach(controllerPath => {
      if (!controllerPath.includes('.test.js')) {
      /* eslint-disable global-require */
        require(controllerPath)(app)
      /* eslint-enable global-require */
      }
    })
    app.use(express.static('static'))

    if (!is_development_nossl() && !is_development()) {
      app.use((req, res, next) => {
        if (!req.secure) {
          console.log(`'Redirecting to ${JSON.stringify(req.originalUrl)}`)
          res.redirect(302, `https://${req.hostname}${req.originalUrl}`)
        }
        next()
      })
    }
    app.get('*', routerHandler)

    if (SERVER_PROD || is_development()) {
      // HTTP only handling redirect to HTTPS
      http.createServer(app).listen(80)
      console.log('Created server on port 80')
    }
    // HTTPS server using certificates
    const httpsServer = https.createServer({
      cert: fs.readFileSync(`${process.env.HOME}/.ssh/Main.txt`),
      key: fs.readFileSync(`${process.env.HOME}/.ssh/Key.txt`),
      ca: fs.readFileSync(`${process.env.HOME}/.ssh/Intermediate.txt`),
    },
    app)
    const io = SocketIo(httpsServer)

    if (SERVER_PROD) {
      httpsServer.listen(443, () => console.log(`${config.appName} running on http://localhost:80/ and https://localhost:443/`))
    }
    else {
      httpsServer.listen(3122, () => console.log(`${config.appName} running on https://localhost:3122/`))
    }

    let roomName = ''
    let bookingName = ''

    io.on('connection', socket => {
    /* socket.on('chat message', msg => {
        io.emit('chat message', msg);
    })*/
      socket.on('room', room => {
        socket.join(room)
        roomName = room
      })
      socket.on('booking', booking => {
        socket.join(booking)
        bookingName = booking
      })
      socket.on('message', msg => {
        io.to(roomName).emit('displayMessage', msg)
      })
      socket.on('changeStatus', booking => {
        io.to(bookingName).emit('displayStatus', booking)
      })
    })

  })
  .catch(err => {
    console.error(`**** Démarrage impossible:${err}`)
    process.exit(1)
  })
