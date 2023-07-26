const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')
forceDataModelAllInclusive()

const { loadFromDb } = require('../../server/utils/database')
require('../../server/plugins/all-inclusive/functions')
const {MONGOOSE_OPTIONS, getExposedModels} = require('../../server/utils/database')
require('../../server/models/JobUser')
require('../../server/models/Activity')
require('../../server/models/Recommandation')
require('../../server/models/Photo')
require('../../server/models/Experience')

jest.setTimeout(20000)

describe('Test DB', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/all-inclusive`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.close()
  })

  const FIELDS='user.picture,user.firstname,user.lastname,name,city,activities.name,activities,description,recommandations.title,recommandations.comment,recommandations,photos,photos.picture,experiences.picture,experiences.function,experiences.company,experiences,experiences.contract_type,location_str,experiences.city,experiences.start_date,experiences.end_date,experiences.description,recommandations.firstname,recommandations.creation_date'.split(',')

  it('must return a jobUser skills', async() => {
    for (const field of FIELDS) {
      const data=await loadFromDb({
        model:'jobUser',
        fields: [field],
        id: '64635a7eb128e6b4abc2bf4e',
      })
      console.log(`Test for ${field} : ${JSON.stringify(data)}`)
      expect(data.length).toEqual(1)
    }
  })

})
