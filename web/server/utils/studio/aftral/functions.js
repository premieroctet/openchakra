const TraineeTheme = require('../../../models/TraineeTheme');
const TraineeResource = require('../../../models/TraineeResource');
const TraineeSession = require('../../../models/TraineeSession');
import Program from '../../../models/Program'
import Theme from '../../../models/Theme'
import Session from '../../../models/Session'

const addThemeToProgram = (program, theme)  => {
  return Program.findByIdAndUpdate(program._id, {$push: {themes: theme}})
}

const addResourceToProgram = (program, resource) => {
  return Theme.create({resources:[resource]})
    .then(th => {
      return addThemeToProgram(program, th)
    })
}

const createTraineeTheme = (theme) => {
  return Promise.all(theme.resources.map(r => {
    return TraineeResource.create({...r.toObject(), _id: undefined})
  }))
    .then(resources => {
      return TraineeTheme.create({...theme.toObject(), _id: undefined, resources: resources})
    })
}

const addThemeToTraineeSession = (traineeSession, theme) => {
  return createTraineeTheme(theme)
    .then(th => {
      return TraineeSession.update(traineeSession, {$push: {themes: th}})
    })
}

const addThemeToSession = (session, theme)  => {
  return Session.findByIdAndUpdate(session._id, {$push: {themes: theme}})
    .then(session => {
      return TraineeSession.find({session: session})
        .then(traineeSessions => {
          return Promise.all(traineeSessions.map(ts => {
            return addThemeToTraineeSession(ts, theme)
          }))
        })
    })
}

const addResourceToSession = (session, resource)  => {
  return Theme.create({resources:[resource]})
    .then(th => {
      return addThemeToSession(session, th)
    })
}

const addResourceToTheme = (theme, resource)  => {
  return Theme.findByIdAndUpdate(theme._id, {$push: {resources: resource}})
}

const removeResourceFromTheme = (theme, resource) => {
  return Theme.findByIdAndUpdate(theme._id, {$pull: {resources: resource._id}})
}


const moveItem = (itemId, items, up) => {
  const index=items.findIndex(i => i.toString()==itemId.toString())
  console.log(`Index:${index}`)
  if ((up && index==0) || (!up && index==items.length-1)) {
    return items
  }
  const delta=up ? -1 : 1
  const temp=items[index+delta]
  items[index+delta]=items[index]
  items[index]=temp
  return items
}

const moveThemeFromProgram=(program, childTheme, up) => {
  return Program.find(program._id)
    .then(res => {
      res.themes=moveItem(childTheme._id, res.themes, up)
      return Program.findByIdAndUpdate(program._id, {themes:res.themes})
    })
}

const moveResourceFromProgram=(program, childResource,  up) => {

}

const moveThemeFromSession=(session, childTheme,  up) => {

}

const moveResourceFromSession=(session, childResource,  up) => {

}

const moveResourceFromTheme=(theme, childResource,  up) => {
  return Theme.findById(theme._id)
    .then(th => {
      const modified=moveItem(childResource._id, th.resources, up)
      console.log(`Id:${childResource._id}, Before:${th.resources.map(i=>i)}, after:${modified.map(i=>i)}`)
      return Theme.findByIdAndUpdate(theme._id, {resources:modified})
    })

}

module.exports={addThemeToProgram, addThemeToSession, addResourceToSession,
  addResourceToProgram, addResourceToTheme,
  removeResourceFromTheme,
  moveResourceFromTheme,
}
