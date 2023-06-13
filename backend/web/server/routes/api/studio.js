const {
  FUMOIR_MEMBER,
  PAYMENT_FAILURE,
  PAYMENT_SUCCESS
} = require('../../plugins/fumoir/consts')
const {
  callFilterDataUser,
  callPostCreateData,
  callPostPutData,
  callPreCreateData,
  callPreprocessGet,
  loadFromDb,
  retainRequiredFields,
} = require('../../utils/database')
const path = require('path')
const zlib=require('zlib')
const {promises: fs} = require('fs')
const child_process = require('child_process')
const url = require('url')
const moment = require('moment')
const lodash=require('lodash')
const bcrypt = require('bcryptjs')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const {date_str, datetime_str} = require('../../../utils/dateutils')
const Payment = require('../../models/Payment')
const {
  HOOK_PAYMENT_FAILED,
  HOOK_PAYMENT_SUCCESSFUL,
} = require('../../plugins/payment/vivaWallet')
const {callAllowedAction} = require('../../utils/studio/actions')
const {
  getDataModel,
  getProductionPort,
  getProductionRoot,
} = require('../../../config/config')

try {
  require(`../../plugins/${getDataModel()}/functions`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {throw err}
  console.warn(`No functions module for ${getDataModel()}`)
}

try {
  require(`../../plugins/${getDataModel()}/actions`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') { throw err }
  console.warn(`No actions module for ${getDataModel()}`)
}
const User = require('../../models/User')

let ROLES={}
try{
  ROLES=require(`../../plugins/${getDataModel()}/consts`).ROLES
  RES_TO_COME=require(`../../plugins/${getDataModel()}/consts`).RES_TO_COME
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {throw err}
  console.warn(`No consts module for ${getDataModel()}`)
}

const {sendCookie} = require('../../config/passport')
const {
  HTTP_CODES,
  NotFoundError,
  ForbiddenError,
} = require('../../utils/errors')
const {getExposedModels} = require('../../utils/database')
const {ACTIONS} = require('../../utils/studio/actions')
const {buildQuery, addComputedFields} = require('../../utils/database')
const {getWebHookToken} = require('../../plugins/payment/vivaWallet')

const router = express.Router()

const PRODUCTION_ROOT = getProductionRoot()
const PRODUCTION_PORT = getProductionPort()


const login = (email, password) => {
  console.log(`Login with ${email} and ${password}`)
  return User.findOne({email}).then(user => {
    if (!user) {
      console.error(`No user with email ${email}`)
      throw new NotFoundError(`Email ou mot de passe invalide`)
    }
    // TODO move in fumoir
    if (user.role==FUMOIR_MEMBER) {
      if (!user.subscription_start) {
        throw new ForbiddenError(`Votre abonnement n'est pas valide`)
      }
      if (user.subscription_start && moment().isBefore(moment(user.subscription_start))) {
        throw new ForbiddenError(`Votre abonnement débute le ${date_str(user.subscription_start)}`)
      }
      // TODO move in fumoir
      if (user.subscription_end && moment().isAfter(moment(user.subscription_end))) {
        throw new ForbiddenError(`Votre abonnement s'est terminé le ${date_str(user.subscription_end)}`)
      }
    }
    if (user.active===false) {
      console.error(`Deactived user ${email}`)
      throw new NotFoundError(`Ce compte est désactivé`)
    }
    console.log(`Comparing ${password} and ${user.password}`)
    const matched=bcrypt.compareSync(password, user.password)
    if (!matched) {
      throw new NotFoundError(`Email ou mot de passe invalide`)
    }
    return user
  })
}

router.get('/models', (req, res) => {
  const allModels = getExposedModels()
  return res.json(allModels)
})

router.get('/roles', (req, res) => {
  console.log()
  return res.json(ROLES)
})

router.get('/action-allowed/:action', passport.authenticate('cookie', {session: false}), (req, res) => {
  const {action}=req.params
  const query=lodash.mapValues(req.query, v => {try{return JSON.parse(v)} catch(e) {return v}})
  const user=req.user

  return callAllowedAction({action, user, ...query})
    .then(allowed => res.json(allowed))
})

router.post('/file', (req, res) => {
  const {projectName, filePath, contents} = req.body
  if (!(projectName && filePath && contents)) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }
  const destpath = path.join(PRODUCTION_ROOT, projectName, 'src', filePath)
  const unzippedContents=zlib.inflateSync(new Buffer(contents, 'base64')).toString()
  console.log(`Copying in ${destpath}`)
  return fs
    .writeFile(destpath, unzippedContents)
    .then(() => {
      return res.json()
    })
})

router.post('/clean', (req, res) => {
  const {projectName, fileNames} = req.body
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }
  const keepFileNames=[...fileNames, 'App.js']
  const destpath = path.join(PRODUCTION_ROOT, projectName, 'src')
  return fs.readdir(destpath)
    .then(files => {
      const diskFiles=files.filter(f => /[A-Z].*\.js$/.test(f))
      const extraFiles=lodash(diskFiles)
        .difference(keepFileNames)
        .map(f => path.join(destpath, f))
        .map(f => fs.unlink(f))
      return Promise.allSettled(extraFiles)
    })
    .then(() => res.json())
})

router.post('/install', (req, res) => {
  const {projectName} = req.body
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }

  const destpath = path.join(PRODUCTION_ROOT, projectName)
  const result = child_process.execSync(
    'yarn install',
    {
      cwd: destpath,
    },
    (error, stdout, stderr) => {
      console.log(`Error:${error}`)
      console.log(`Stdout:${stdout}`)
      console.log(`stderr:${stderr}`)
      if (error) {
        return res.status(HTTP_CODES.SYSTEM_ERROR).json(error)
      }
      return res.json()
    },
  )
  console.log(`Install result:${result}`)
  return res.json(result)
})

router.post('/build', (req, res) => {
  const {projectName} = req.body
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }

  const destpath = path.join(PRODUCTION_ROOT, projectName)
  const result = child_process.execSync(
    'yarn build',
    {
      cwd: destpath,
    },
    (error, stdout, stderr) => {
      console.log(`Error:${error}`)
      console.log(`Stdout:${stdout}`)
      console.log(`stderr:${stderr}`)
      if (error) {
        return res.status(HTTP_CODES.SYSTEM_ERROR).json(error)
      }
      return res.json()
    },
  )
  console.log(`Build result:${result}`)
  return res.json(result)
})

router.post('/start', (req, res) => {
  const {projectName} = req.body
  if (!projectName) {
    return res.status(HTTP_CODES.BAD_REQUEST).json()
  }

  const destpath = path.join(PRODUCTION_ROOT, projectName)
  const result = child_process.exec(
    `serve -p ${PRODUCTION_PORT} build/`,
    {
      cwd: destpath,
    },
    (error, stdout, stderr) => {
      console.log(`Error:${error}`)
      console.log(`Stdout:${stdout}`)
      console.log(`stderr:${stderr}`)
    },
  )
  console.log(`Start result:${result}`)
  return res.json(result)
})

router.post('/action', passport.authenticate('cookie', {session: false}), (req, res) => {
  const action = req.body.action
  const actionFn = ACTIONS[action]
  if (!actionFn) {
    console.error(`Unkown action:${action}`)
    return res.status(404).json(`Unkown action:${action}`)
  }

  return actionFn(req.body, req.user, req.get('Referrer'))
    .then(result => {
      return res.json(result)
    })
})

router.post('/anonymous-action', (req, res) => {
  const action = req.body.action
  const actionFn = ACTIONS[action]
  if (!actionFn) {
    console.error(`Unkown action:${action}`)
    return res.status(404).json(`Unkown action:${action}`)
  }

  return actionFn(req.body, null, req.get('Referrer'))
    .then(result => {
      return res.json(result)
    })
})

router.post('/login', (req, res) => {
  const {email, password} = req.body

  return login(email, password)
    .then(user => {
      return sendCookie(user, res).json(user)
    })
})

router.get('/current-user', passport.authenticate('cookie', {session: false}), (req, res) => {
  return res.json(req.user)
})

router.post('/register', (req, res) => {
  const ip=req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const body={register_ip:ip, ...lodash.mapValues(req.body, v => JSON.parse(v))}
  console.log(`Registering  on ${ip} with body ${JSON.stringify(body)}`)
  return ACTIONS.register(body)
    .then(result => res.json(result))
})

router.post('/register-and-login', (req, res) => {
  const ip=req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const body={register_ip:ip, ...lodash.mapValues(req.body, v => JSON.parse(v))}
  console.log(`Registering & login on ${ip} with body ${JSON.stringify(body)}`)
  return ACTIONS.register(body)
    .then(result => {
      const {email, password}=body
      return login(email, password)
        .then(user => {
          return sendCookie(user, res).json(user)
        })
    })
})

// Validate webhook
router.get('/payment-hook', (req, res) => {
  return getWebHookToken()
    .then(token => {
      return res.set('test-header', 'value').json({key: token})
    })
})

router.post('/payment-hook', (req, res) => {
  const params=req.body
  console.log(`Payment hook called with params ${JSON.stringify(params)}`)
  if (params.EventTypeId==HOOK_PAYMENT_SUCCESSFUL) {
    return Payment.updateOne({orderCode: params.EventData.OrderCode}, {status: PAYMENT_SUCCESS})
      .then(() => res.json)
  }
  else if (params.EventTypeId==HOOK_PAYMENT_FAILED) {
    return Payment.updateOne({orderCode: params.EventData.OrderCode}, {status: PAYMENT_FAILURE})
      .then(() => res.json)
  }
  console.error(`Hook was not handled`)
  return res.json()
})

// Not protected to allow external recommandations
router.post('/recommandation', (req, res) => {
  let params=req.body
  const context= req.query.context
  const user=req.user
  const model = 'recommandation'
  params.model=model

  if (!model) {
    return res.status(HTTP_CODES.BAD_REQUEST).json(`Model is required`)
  }

  return callPreCreateData({model, params, user})
    .then(({model, params}) => {
      return mongoose.connection.models[model]
        .create([params], {runValidators: true})
        .then(([data]) => {
          return callPostCreateData({model, params, data})
        })
        .then(data => res.json(data))
    })
})

router.get('/statTest', (req, res) => {
  const data=lodash.range(360)
    .map(v => {
      const rad=v*Math.PI/180.0
      const cos=Math.cos(rad)
      return ({x:v, y:cos})
    })
  return res.json(data)
})

router.post('/:model', passport.authenticate('cookie', {session: false}), (req, res) => {
  const model = req.params.model
  let params=req.body
  const context= req.query.context
  const user=req.user

  params=model=='order' && context ? {...params, booking: context}:params
  params=model=='booking' ? {...params, booking_user: user}:params

  if (!model) {
    return res.status(HTTP_CODES.BAD_REQUEST).json(`Model is required`)
  }

  return callPreCreateData({model, params, user})
    .then(({model, params}) => {
      return mongoose.connection.models[model]
        .create([params], {runValidators: true})
        .then(([data]) => {
          return callPostCreateData({model, params, data})
        })
        .then(data => res.json(data))
    })
})

router.put('/:model/:id', passport.authenticate('cookie', {session: false}), (req, res) => {
  const model = req.params.model
  const id = req.params.id
  let params=req.body
  const context= req.query.context
  const user=req.user
  params=model=='order' && context ? {...params, booking: context}:params

  if (!model || !id) {
    return res.status(HTTP_CODES.BAD_REQUEST).json(`Model and id are required`)
  }
  console.log(`Updating:${id} with ${JSON.stringify(params)}`)
  return mongoose.connection.models[model]
    .findByIdAndUpdate(id, params, {new: true, runValidators: true})
    .then(data => callPostPutData({model, params, data, user}))
    .then(data => res.json(data))
})


const loadFromRequest = (req, res) => {
  const model = req.params.model
  let fields = req.query.fields?.split(',') || []
  const id = req.params.id
  const params = req.get('Referrer')
    ? {...url.parse(req.get('Referrer'), true).query}
    : {}
  const user = req.user

  console.log(`GET ${model}/${id} ${fields}`)

  return loadFromDb({model, fields, id, user, params})
    .then(data => {
      console.log(`GET ${model}/${id} ${fields}: data sent`)
      res.json(data)
    })
}

router.get('/jobUser/:id?', passport.authenticate(['cookie', 'anonymous'], {session: false}), (req, res) => {
  req.params.model='jobUser'
  return loadFromRequest(req, res)
})

router.get('/:model/:id?', passport.authenticate('cookie', {session: false}), (req, res) => {
  return loadFromRequest(req, res)
})

module.exports = router
