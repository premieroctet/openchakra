const TraineeResource = require('../../models/TraineeResource');
const { NotFoundError } = require('../errors');
const lodash=require('lodash')
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

  levelUp: ({id}) => {
    return Program.find()
      .populate('themes')
      .then(result => {
        if (!result) {
          throw new NotFoundError(`Program ${id} not found`)
        }
        const p=result.find(p => p.themes.find(t => t.resources.find(r => r._id.toString()==id)))
        return p
      })
  },

  addSpentTime: ({id, duration}) => {
    console.log(`Duration ${duration} for ${id}`)
    return TraineeResource.findByIdAndUpdate(id, {$inc: {spent_time: duration}})
  }

}

module.exports={ACTIONS}
