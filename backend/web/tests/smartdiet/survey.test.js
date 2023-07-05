const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')
const {ROLE_ADMIN} = require('../../server/plugins/smartdiet/consts')

const moment=require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')

const Question=require('../../server/models/Question')
require('../../server/models/Key')

describe('Survey ', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must ensure question.order unicity', async() => {
    await Question.create({title: 'Title 1', order:1})
    await Question.create({title: 'Title 2', order: 2})
  })

})
