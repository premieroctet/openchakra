const mongoose = require('mongoose')
const Theme = require('../../models/Theme')
const Resource = require('../../models/Resource')
const Session = require('../../models/Session')
const TraineeResource = require('../../models/TraineeResource')
const {NotFoundError} = require('../errors')
const Program = require('../../models/Program')
const {
  addResourceToProgram,
  addResourceToSession,
  addResourceToTheme,
  addThemeToProgram,
  addThemeToSession,
  moveChildInParent,
  removeChildFromParent,
  getNext, getPrevious,
  getSession,
  getModel,
} = require('./aftral/functions')

const ACTIONS={

  put: ({parent, attribute, value}) => {
    console.log(`Putting ${parent} ${attribute} to ${value}`)
    return getModel(parent)
      .then(model => {
        return mongoose.connection.models[model].findByIdAndUpdate(parent, {[attribute]: value})
      })
      .then(res => {
        console.log(res)
        return res
      })
  },

  publish: ({id}) => {
    return Program.findOneAndUpdate(
      {_id: id},
      {published: true},
      {new: true},
    )
      .then(result => {
        console.log(`result publish ${JSON.stringify(result)}`)
        if (!result) {
          throw new NotFoundError(`Program ${id} not found`)
        }
        return result
      })
  },

  levelUp: ({parent, child}) => {
    return moveChildInParent(parent, child, true)
  },

  levelDown: ({parent, child}) => {
    return moveChildInParent(parent, child, false)
  },

  addSpentTime: ({id, duration}) => {
    console.log(`Duration ${duration} for ${id}`)
    return TraineeResource.findByIdAndUpdate(id, {$inc: {spent_time: duration}})
  },

  delete: ({parent, child}) => {
    return removeChildFromParent(parent, child)
  },

  addChild: ({parent, child}) => {
    return Promise.all([
      ...[Program, Session, Theme].map(model => model.findById(parent)),
      ...[Theme, Resource].map(model => model.findById(child)),
    ])
      .then(result => {
        const[program, session, theme, childTheme, childResource]=result
        if (program && childTheme) { return addThemeToProgram(program, childTheme) }
        else if (program && childResource) { return addResourceToProgram(program, childResource) }
        else if (session && childTheme) { return addThemeToSession(session, childTheme) }
        else if (session && childResource) { return addResourceToSession(session, childResource) }
        else if (theme && childResource) { return addResourceToTheme(theme, childResource) }

        return Promise.reject(`Unkown case ${result.map(r => !!r)}`)

      })
  },

  next: ({id}) => {
    return getNext(id)
  },

  previous: ({id}) => {
    return getPrevious(id)
  },

  session: ({id}) => {
    return getSession(id)
  },

}

module.exports={ACTIONS}
