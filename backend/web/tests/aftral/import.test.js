const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelAftral}=require('../utils')
forceDataModelAftral()
const {importTrainees, importTrainers} = require('../../server/utils/aftral_studio/import')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const Program=require('../../server/models/Program')

jest.setTimeout(20000)

describe('XLSX imports', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('should do sthg', async() => {
    await Program.create({'code': 'ACWW03'})
    const query=importTrainers('tests/data/aftral_studio/Session_Formateur.csv')
      .then(() => importTrainees('tests/data/aftral_studio/Apprenant.csv'))
    return expect(query).resolves.not.toThrowError()
  })

})
