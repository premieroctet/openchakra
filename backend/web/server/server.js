const axios = require("axios");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const passport = require("passport");
const glob = require("glob");
const cors = require("cors");
const {
  RANDOM_ID,
  checkConfig,
  getDatabaseUri,
  getHostUrl,
  getPort
} = require("../config/config");
const { HTTP_CODES } = require("./utils/errors");
require("./models/ResetToken");
require("./models/Program");
require("./models/Theme");
require("./models/Resource");
require("./models/Session");
require("./models/TrainingCenter");
require("./models/User");
require("./models/Contact");
require("./models/Message");
require("./models/LoggedUser");
require("./models/Post");
require("./models/Subscription");
require("./models/Event");
require("./models/Company");
require("./models/Drink");
require("./models/Meal");
require("./models/Cigar");
require("./models/Order");
require("./models/Booking");

const { MONGOOSE_OPTIONS } = require("./utils/database");

require("console-stamp")(console, "[dd/mm/yy HH:MM:ss.l]");

const {
  is_production,
  is_validation,
  is_development,
  is_development_nossl
} = require("../config/config");
const dev = process.env.NODE_DEV !== "production"; // true false
const prod = process.env.NODE_DEV === "production"; // true false
const nextApp =
  is_production() || is_validation() ? next({ prod }) : next({ dev });
const routes = require("./routes");
const routerHandler = routes.getRequestHandler(nextApp);
const { config } = require("../config/config");
const http = require("http");
const https = require("https");
const fs = require("fs");
const studio = require("./routes/api/studio");
const path = require("path");
const app = express();
const { serverContextFromRequest } = require("./utils/serverContext");

// TODO Terminer les notifications
// throw new Error(`\n${'*'.repeat(30)}\n  TERMINER LES NOTIFICATIONS\n${'*'.repeat(30)}`)
// checkConfig
checkConfig()
  .then(() => {
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS);
  })
  // Connect to MongoDB
  .then(() => {
    console.log(`MongoDB connecté: ${getDatabaseUri()}`);
    return nextApp.prepare();
  })
  .then(() => {
    // Body parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Passport middleware
    app.use(passport.initialize());

    app.use(cookieParser());
    // Passport config
    /* eslint-disable global-require */
    require("./config/passport");
    /* eslint-enable global-require */

    // Context handling
    app.use((req, res, next) => {
      // console.log(`REQUEST:${req.method}, ${req.originalUrl}, ${JSON.stringify(req.body)}`)
      serverContextFromRequest(req)
        .then(context => {
          req.context = context;
          return next();
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json(err);
        });
    });

    // Hide test pages
    app.use((req, res, next) => {
      if (is_production() && req.url.match(/^\/test\//)) {
        return res.sendStatus(HTTP_CODES.NOT_FOUND);
      }
      return next();
    });

    app.use(cors());

    // Check hostname is valid
    app.use("/testping", (req, res) => res.json(RANDOM_ID));
    app.use("/myAlfred/api/studio", studio);

    // const port = process.env.PORT || 5000;
    const rootPath = path.join(__dirname, "/..");
    glob.sync(`${rootPath}/server/api/*.js`).forEach(controllerPath => {
      if (!controllerPath.includes(".test.js")) {
        /* eslint-disable global-require */
        require(controllerPath)(app);
        /* eslint-enable global-require */
      }
    });
    app.use(express.static("static"));

    if (!is_development_nossl() && !is_development()) {
      app.use((req, res, next) => {
        if (!req.secure) {
          console.log(`'Redirecting to ${JSON.stringify(req.originalUrl)}`);
          res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
        }
        next();
      });
    }
    app.get("*", routerHandler);

    // HTTP only handling redirect to HTTPS
    // http.createServer((req, res) => {
    //   res.writeHead(301, {'Location': `https://${ req.headers.host }${req.url}`})
    //   res.end()
    // }).listen(80)
    // console.log('Created server on port 80')

    // HTTPS server using certificates
    const httpsServer = https.createServer(
      {
        cert: fs.readFileSync(`${process.env.HOME}/.ssh/Main.txt`),
        key: fs.readFileSync(`${process.env.HOME}/.ssh/Key.txt`),
        ca: fs.readFileSync(`${process.env.HOME}/.ssh/Intermediate.txt`)
      },
      app
    );

    httpsServer.listen(getPort(), () => {
      console.log(`${config.appName} running on ${getHostUrl()}`);
      console.log(`Checking correct hostname`);
      axios
        .get(new URL("/testping", getHostUrl()).toString())
        .then(res => {
          const result = res.data;
          const expected = RANDOM_ID;
          console.log(`Result:${res.data}, expected:${RANDOM_ID}`);
          if (result != expected) {
            throw new Error(`Got different test values`);
          }
        })
        .catch(err => {
          console.error(`Host ${getHostUrl()} seems incorrect:${err.message}`);
          process.exit(1);
        });
    });
  })
  .catch(err => {
    console.error(`**** Démarrage impossible:${err}`);
    process.exit(1);
  });
