const {sendUsersList} = require('../../server/plugins/all-inclusive/functions')
const path=require('path')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)
const { getDataModel } = require('../../config/config')
const {
  getUsersList
} = require('../../server/plugins/all-inclusive/functions')
const mongoose = require('mongoose')
const {forceDataModelAllInclusive}=require('../utils')

forceDataModelAllInclusive()
require('../../server/plugins/all-inclusive/functions')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

describe('Tests users extraction', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/${getDataModel()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.close()
  })

  it("Must export users list", async() => {
    const list=await getUsersList()
    const linesCount=list.split(`\n`).length
    const headerCount=list.split(`\n`)[0].split(`;`).length
    expect(headerCount).toEqual(12)
    expect(linesCount).toBeGreaterThan(100)
  })


  it("Must send users list", () => {
    return sendUsersList({email: 'hello+test@wappizy.com'})
  })
})
