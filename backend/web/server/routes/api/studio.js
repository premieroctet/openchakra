const { FUMOIR_MEMBER } = require('../../plugins/fumoir/consts')
const moment = require('moment')
const path = require('path')
const zlib=require('zlib')
const {promises: fs} = require('fs')
const child_process = require('child_process')
const url = require('url')
const lodash=require('lodash')
const bcrypt = require('bcryptjs')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const { date_str, datetime_str } = require('../../../utils/dateutils')
const Payment = require('../../models/Payment')
const {
  HOOK_PAYMENT_FAILED,
  HOOK_PAYMENT_SUCCESSFUL,
} = require('../../plugins/payment/vivaWallet')
const {
  PAYMENT_FAILURE,
  PAYMENT_SUCCESS,
} = require('../../plugins/fumoir/consts')
const {
  callFilterDataUser,
  callPostCreateData,
  callPreCreateData,
  callPreprocessGet,
  retainRequiredFields,
} = require('../../utils/database')
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
    return bcrypt.compare(password, user.password).then(matched => {
      if (!matched) {
        throw new NotFoundError(`Email ou mot de passe invalide`)
      }
      return user
    })
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

router.get('/action-allowed/:action/:dataId', passport.authenticate('cookie', {session: false}), (req, res) => {
  const {action, dataId}=req.params
  const user=req.user

  return callAllowedAction({action, dataId, user})
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

// router.post('/scormupdate', passport.authenticate('cookie', {session: false}), (req, res) => {
router.post('/scormupdate', (req, res) => {
  const value = req.body
  const idRessource = req?.body?.cmi?.entry
  const user = req.user

  // console.log(value, idRessource, user)
  console.log(value)

  // const updateScorm = UserSessionData.findOneAndUpdate({
  //   user: user._id,
  // }, {
  //   user: user._id,
  // }, {
  //   upsert: true,
  //   new: true,
  // })
  //   .then(data => {
  //     const scormProgress = data?.modules_progress?.find(a => a.resource._id.toString() == idRessource.toString())
  //     if (scormProgress) {
  //       scormProgress.module_progress = value
  //     }
  //     else {
  //       data.modules_progress.push({
  //         resource: parent,
  //         module_progress: value,
  //       })
  //     }
  //     return data.save()
  //   })
  //   .catch(e => console.error(e))

  // return res.json(updateScorm)
  return res.json({})
})

router.get('/current-user', passport.authenticate('cookie', {session: false}), (req, res) => {
  return res.json(req.user)
})

router.post('/register', (req, res) => {
  const body=lodash.mapValues(req.body, v => JSON.parse(v))
  return ACTIONS.register(body)
    .then(result => res.json(result))
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

router.post('/:model', passport.authenticate('cookie', {session: false}), (req, res) => {
  const model = req.params.model
  let params=req.body
  const context= req.query.context
  const user=req.user

  params=model=='order' && context ? {...params, booking: context}:params
  params=model=='booking' ? {...params, booking_user: user}:params

  if (!model) {
    return res.status(HTTP_CODE.BAD_REQUEST).json(`Model is required`)
  }

  return callPreCreateData({model, params, user})
    .then(({model, params}) => {
      return mongoose.connection.models[model]
        .create([params], {runValidators: true})
        .then(([data]) => {
          return callPostCreateData({model, params, data})
        })
        .then(data => {
          return res.json(data)
        })
    })
})

router.put('/:model/:id', passport.authenticate('cookie', {session: false}), (req, res) => {
  const model = req.params.model
  const id = req.params.id
  let params=req.body
  const context= req.query.context
  params=model=='order' && context ? {...params, booking: context}:params

  if (!model || !id) {
    return res.status(HTTP_CODE.BAD_REQUEST).json(`Model and id are required`)
  }
  console.log(`Updating:${id} with ${JSON.stringify(params)}`)
  return mongoose.connection.models[model]
    .findByIdAndUpdate(id, params, {new: true, runValidators: true})
    .then(data => {
      return res.json(data)
    })
})

router.get('/:model/:id?', passport.authenticate('cookie', {session: false}), (req, res) => {
  const model = req.params.model
  let fields = req.query.fields?.split(',') || []
  const id = req.params.id
  const params = req.get('Referrer')
    ? {...url.parse(req.get('Referrer'), true).query}
    : {}
  const user = req.user

  console.log(`GET ${model}/${id} ${fields}`)

  callPreprocessGet({model, fields, id, user: req.user})
    .then(({model, fields, id, data}) => {
      console.log(`POSTGET ${model}/${id} ${fields}`)
      if (data) {
        return res.json(data)
      }
      return buildQuery(model, id, fields)
        .lean({virtuals: true})
        .then(data => {
          // Force duplicate children
          data = JSON.parse(JSON.stringify(data))
          // Remove extra virtuals
          data = retainRequiredFields({data, fields})
          if (id && data.length == 0) { throw new NotFoundError(`Can't find ${model}:${id}`) }
          return Promise.all(data.map(d => addComputedFields(user, params, d, model)))
        })
        .then(data => {
          //return id ? Promise.resolve(data) : callFilterDataUser({model, data, id, user: req.user})
          return callFilterDataUser({model, data, id, user: req.user})
        })
        .then(data => {
          if (['theme', 'resource'].includes(model) && !id) {
            data = data.filter(t => t.name)
          }
          if (id && model == 'resource' && data[0]?.status == RES_TO_COME) {
            throw new ForbiddenError(`Ressource non encore disponible`)
          }
          console.log(`GET ${model}/${id} ${fields}: data sent`)
          return res.json(data)
        })
    })
},
)

module.exports = router
