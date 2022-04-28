const lodash=require('lodash')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS} = require('../../../../server/utils/database')

const UserSchema = require('../../../../server/models/feurst/UserSchema')

const User=mongoose.model('user', UserSchema)

describe('Feurst User test', () => {

  const USER={firstname: 'firstname', name: 'name', password: 'tagada', email: 'fake@email.com'}

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => {
        return User.create(USER)
      })
  })

  afterAll(() => {
    return mongoose.connect('mongodb://localhost/test')
      .then(() => {
        mongoose.connection.db.dropDatabase()
      })
  })

  test('Avatar letters', () => {
    return User.findOne()
      .then(user => {
        return expect(user.avatar_letters).toBe('FN')
      })
  })

  test('Reject duplicate email creation', () => {
    return expect(User.create(USER)).rejects.not.toBeNull()
  })

  test('Reject duplicate email update', () => {
    return User.create({...USER, email: 'hop'})
      .then(() => {
        return expect(User.updateMany({}, {email: USER.email})).rejects.not.toBeNull()
      })
  })

  const ATT_CASES='firstname,name,email,password'.split(',').map(a => ({user: USER, attribute: a}))

  test.each(ATT_CASES)(
    'User without $attribute must reject',
    ({user, attribute}) => {
      return expect(User.create(lodash.omit(user, [attribute]))).rejects.not.toBeNull()
    })

})
