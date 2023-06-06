const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')

forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')

const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')

const Recipe = require('../../server/models/Recipe')
require('../../server/models/RecipeIngredient')
require('../../server/models/Ingredient')

describe('Measure model ', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/smartdiet`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
  })

  it('must display ingredients', async() => {
    return Recipe.findOne()
      .populate({path: 'ingredients', populate: 'ingredient'})
      .then(recipe => {
        console.log(JSON.stringify(recipe, null, 2))
      })
  })

})
