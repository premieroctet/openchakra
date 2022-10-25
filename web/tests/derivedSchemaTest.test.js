const { MONGOOSE_OPTIONS } = require('../server/utils/database');
const mongoose = require('mongoose')
const lodash=require('lodash')
const options = { discriminatorKey: 'kind' };

const themeSchema = new mongoose.Schema({ name: String }, options)
const Theme = mongoose.model('Theme', themeSchema)

const ProgramTheme = Theme.discriminator('program',
  new mongoose.Schema({ordered: Boolean}, options));

const SessionTheme = Theme.discriminator('session',
  new mongoose.Schema({ordered: Boolean}, options));

const cloneData = (data, model, props={}) => {
  return new model({...lodash.omit(data.toObject(), ['_id', 'kind']), ...props})
}
describe('Schema inheritance tests', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
  })

  afterAll(() => {
    return mongoose.connection.dropDatabase()
  })

  test('Should return attributes', () => {
    let theme=null
    return Theme.create({name: 'Thème 1'})
      .then(result => {
        theme=result
        return cloneData(theme, ProgramTheme, {ordered: true}).save()
      })
      .then(programTheme => {
        return cloneData(programTheme, SessionTheme).save()
      })
      .then(()=> {
        return Theme.find()
      })
      .then(themes=> {
        return console.log(themes)
      })
  })

})
