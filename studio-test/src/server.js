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
const path=require('path')


const API_PATH = '/myAlfred/api'
const port = parseInt(process.env.STUDIO_TEST_PORT, 10) || 7777;
const isSecure = process.env.MODE === 'production'

nextApp.prepare().then(() => {

  app.use(
    API_PATH, 
    createProxyMiddleware({ 
      target: `https://localhost:${process.env.BACKEND_PORT || '443'}`,
      changeOrigin: true, 
      pathFilter: API_PATH, 
      secure: isSecure
    })
  );

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
