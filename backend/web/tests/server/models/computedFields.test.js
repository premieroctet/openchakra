const { splitRemaining } = require('../../../utils/text')
const mongoose=require('mongoose')
const moment=require('moment')
const lodash=require('lodash')

const Schema = mongoose.Schema;
const {MONGOOSE_OPTIONS} = require('../../../server/utils/database')
const { schemaOptions } = require('../../../server/utils/schemas')

const { forceDataModelSmartdiet } = require('../../utils')
forceDataModelSmartdiet()
require('../../../server/plugins/smartdiet/functions')

const User = require('../../../server/models/User')
require('../../../server/models/Target')
require('../../../server/models/Category')
require('../../../server/models/Association')
require('../../../server/models/Key')
require('../../../server/models/Question')
require('../../../server/models/Menu')

const { loadFromDb } = require('../../../server/utils/database')

jest.setTimeout(50000)

describe('Computed fields test', () => {

  beforeAll(() => {
    return mongoose.connect(`mongodb://localhost/smartdiet`, MONGOOSE_OPTIONS)
  })

  afterAll(() => {
    return mongoose.connection.close()
  })

  // Before enhancement: 416Ko, [3.2s, 3.3s, 3.2s]
  // After enhancement:
  test('Load loggedUser with groups', () => {
    const FIELDS=`pinned_contents.likes_count,pinned_contents.comments_count,contents,picture,pinned_contents.key.picture,pinned_contents.picture,pinned_contents.name,pinned_contents.duration,pinned_contents,contents.key.picture,contents.picture,contents.likes_count,contents.comments_count,contents.name,contents.duration,contents.search_text,pinned_contents.search_text,contents.key.name`.split(',')
    return User.findOne({email: /hello\+user/})
      .then(user => {
        console.time('Loading')
        return loadFromDb({model: 'loggedUser', fields:FIELDS, user})
          .then(res => {
            console.timeEnd('Loading')
            console.log(`Size:${JSON.stringify(res).length/1024} Ko`)
          })
      })
    })

})
