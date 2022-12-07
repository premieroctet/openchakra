const { getDatabaseUri } = require('../../config/config');
const {
  importTrainees,
  importTrainers
} = require('../../server/utils/aftral_studio/import');
const {XL_TYPE} = require('../../utils/consts')
const util = require('util')

const exec = util.promisify(require('child_process').exec)
const mongoose = require('mongoose')
const {databaseName} = require('../../config/config')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

describe('XLSX imports', () => {

  beforeAll(() => {
    /**
    return exec('rm -rf dump', {cwd: '/tmp'})
      .then(() => {
        console.log('mongodump')
        return exec(`mongodump --db=${databaseName}`, {cwd: '/tmp'})
      })
      .then(() => {
        console.log('mv')
        return exec(`mv dump/${databaseName} dump/test`, {cwd: '/tmp'})
      })
      .then(() => {
        console.log('mongorestore')
        return exec(`mongorestore --drop`, {cwd: '/tmp'})
      })
      .then(() => {
        console.log('connect')
        return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      })
      */
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  }, 30000)

  it('should do sthg', () => {
    return importTrainers('tests/data/aftral_studio/Session_Formateur.csv')
      .then(res => {
        return importTrainees('tests/data/aftral_studio/Apprenant.csv')
      })
  }, 20000)

})
