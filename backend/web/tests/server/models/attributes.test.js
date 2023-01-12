const mongoose = require('mongoose')
const {
  MONGOOSE_OPTIONS,
  attributesComparator,
} = require('../../../server/utils/database')
require('../../../server/models/Appointment')

describe('Attributes order test', () => {

  beforeAll(async() => {
    await mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
    await mongoose.connection.dropDatabase()
  })

  test('Sort simple attributes', () => {
    const attributes=['name', 'firstname', 'birthday', 'aaaa']
    let sorted=[...attributes].sort(attributesComparator)
    expect(sorted).toStrictEqual([...attributes.sort()])
  })

  test('Sort complex attributes', () => {
    const attributes=['user.full_name', 'name.test', 'youyou', 'user.birthday']
    let sorted=attributes.sort(attributesComparator)
    expect(sorted).toStrictEqual(['youyou', 'name.test', 'user.birthday', 'user.full_name'])
  })

  test.only('Test schema extra attribute', async() => {
    const schema=mongoose.model('appointment').schema.paths.type.options.suggestions
    console.log(schema)
  })

})
