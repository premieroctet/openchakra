const {
  addResourceToProgram,
  addResourceToSession,
  addResourceToTheme,
  addThemeToProgram,
  addThemeToSession,
  removeResourceFromTheme,
  moveResourceFromTheme,
  moveThemeFromProgram,
} = require('./aftral/functions');
const Theme = require('../../models/Theme');
const Resource = require('../../models/Resource');
const Session = require('../../models/Session');
const TraineeResource = require('../../models/TraineeResource');
const { NotFoundError } = require('../errors');
const Program = require('../../models/Program');

const ACTIONS={
  publish: ({id}) => {
    return Program.findOneAndUpdate(
      {_id: id},
      {published: true},
      {new: true}
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
    return Promise.all([
      ...[Program, Session, Theme].map(model => model.findById(parent)),
      ...[Theme, Resource].map(model => model.findById(child)),
    ])
      .then(result => {
        const[program, session, theme, childTheme, childResource]=result
        if (program && theme) { return  moveThemeFromProgram(program, childTheme, true)}
        else if (program && childResource) { return moveResourceFromProgram(program, childResource, true)}
        else if (session && childTheme) { return moveThemeFromSession(session, childTheme, true)}
        else if (session && childResource) { return moveResourceFromSession(session, childResource, true)}
        else if (theme && childResource) { return  moveResourceFromTheme(theme, childResource, true)}
        else {
          return Promise.reject(`Unkown case ${result.map(r => !!r)}`)
        }
      })
  },

  levelDown: ({parent, child}) => {
    return Promise.all([
      ...[Program, Session, Theme].map(model => model.findById(parent)),
      ...[Theme, Resource].map(model => model.findById(child)),
    ])
      .then(result => {
        const[program, session, theme, childTheme, childResource]=result
        if (program && theme) { return  moveThemeFromProgram(program, childTheme,  false)}
        else if (program && childResource) { return moveResourceFromProgram(program, childResource,  false)}
        else if (session && childTheme) { return moveThemeFromSession(session, childTheme,  false)}
        else if (session && childResource) { return moveResourceFromSession(session, childResource,  false)}
        else if (theme && childResource) { return  moveResourceFromTheme(theme, childResource,  false)}
        else {
          return Promise.reject(`Unkown case ${result.map(r => !!r)}`)
        }
      })
  },

  addSpentTime: ({id, duration}) => {
    console.log(`Duration ${duration} for ${id}`)
    return TraineeResource.findByIdAndUpdate(id, {$inc: {spent_time: duration}})
  },

  delete: ({parent, child}) => {
    console.log(`Deleting ${child} from ${parent}`)
    return Promise.all([
      ...[Program, Session, Theme].map(model => model.findById(parent)),
      ...[Theme, Resource].map(model => model.findById(child)),
    ])
      .then(result => {
        const[program, session, theme, childTheme, childResource]=result
        if (program && theme) { return  removeThemeFromProgram(program, childTheme)}
        else if (program && childResource) { return  removeResourceFromProgram(program, childResource)}
        else if (session && childTheme) { return  removeThemeFromSession(session, childTheme)}
        else if (session && childResource) { return  removeResourceFromSession(session, childResource)}
        else if (theme && childResource) { return  removeResourceFromTheme(theme, childResource)}
        else {
          return Promise.reject(`Unkown case ${result.map(r => !!r)}`)
        }
      })
  },

  addChild: ({parent, child}) => {
    return Promise.all([
      ...[Program, Session, Theme].map(model => model.findById(parent)),
      ...[Theme, Resource].map(model => model.findById(child)),
    ])
      .then(result => {
        const[program, session, theme, childTheme, childResource]=result
        if (program && theme) { return addThemeToProgram(program, childTheme)}
        else if (program && childResource) { return addResourceToProgram(program, childResource)}
        else if (session && childTheme) { return addThemeToSession(session, childTheme)}
        else if (session && childResource) { return addResourceToSession(session, childResource)}
        else if (theme && childResource) { return addResourceToTheme(theme, childResource)}
        else {
          return Promise.reject(`Unkown case ${result.map(r => !!r)}`)
        }
      })
  }

}

module.exports={ACTIONS}
