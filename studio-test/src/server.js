require('dotenv').config()
const express = require('express');
const next = require('next')
const bodyParser = require('body-parser')
const nextApp = next({prod:true})
const routes = require('./routes')
const routerHandler = routes.getRequestHandler(nextApp)
const glob = require('glob')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const app = express()
const util=require('util')
const path=require('path')


const port = parseInt(process.env.PORT, 10) || 7777;

nextApp.prepare().then(() => {

  // Body parser middleware
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  app.use(cors())

  const rootPath = path.join(__dirname, '/..')
  glob.sync(`${rootPath}/server/api/*.js`).forEach(controllerPath => {
    if (!controllerPath.includes('.test.js')) {
      /* eslint-disable global-require */
      require(controllerPath)(app)
      /* eslint-enable global-require */
    }
  })
  app.use(express.static('static'))

  app.get('*', routerHandler)

  // HTTPS server using certificates
  const httpsServer = https.createServer({
    cert: fs.readFileSync(`${process.env.HOME}/.ssh/fullchain.pem`),
    key: fs.readFileSync(`${process.env.HOME}/.ssh/privkey.pem`),
  },
  app)

  httpsServer.listen(port, () => console.log(`running on https://localhost:${port}/`))

})
