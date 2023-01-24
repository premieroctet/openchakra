const {retainRequiredFields} = require('../server/utils/database')

describe('DB virtual tests', () => {
  test('Should retain first level attributes', async() => {
    const data = {name: 'name', address: 'address'}
    const cleaned = retainRequiredFields({data, fields: ['name']})
    return expect(Object.keys(cleaned)).toEqual(['name'])
  })

  test('Should retain second level attributes', async() => {
    const data = {
      _id: 12,
      name: 'name',
      address: {street: {name: 'street', number: 260}, city: 'city'},
      tag: 12,
    }
    const cleaned = retainRequiredFields({
      data,
      fields: ['name', 'address.street.number'],
    })
    return expect(cleaned).toMatchObject({
      _id: 12,
      name: 'name',
      address: {street: {number: 260}},
    })
  })
})
