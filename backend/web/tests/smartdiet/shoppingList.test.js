const moment=require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')

const {forceDataModelSmartdiet}=require('../utils')

forceDataModelSmartdiet()
require('../../server/plugins/smartdiet/functions')
const Menu = require('../../server/models/Menu')
require('../../server/models/Target')
require('../../server/models/Category')
require('../../server/models/Key')
require('../../server/models/Association')
require('../../server/models/Question')
require('../../server/models/RecipeIngredient')
require('../../server/models/Ingredient')
require('../../server/models/Recipe')
require('../../server/models/MenuRecipe')
require('../../server/models/UserQuizz')
require('../../server/models/Quizz')


describe('Shopping list computation', () => {

  beforeAll(async() => {
    //await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    await mongoose.connect(`mongodb://localhost/smartdiet`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    //await mongoose.connection.close()
  })

  it('must compute shopping list for x people', async() => {
    const [menu]=await loadFromDb({model: 'menu', fields: ['shopping_list']})
    const peopleBefore=menu.people_count
    const ingsBefore=Object.fromEntries(menu.shopping_list.map(e => [e.ingredient.name, e.quantity]))
    const [computedMenu]=await loadFromDb({model: 'menu', fields: ['shopping_list'], params:{people_count: peopleBefore*2}})
    const peopleAfter=computedMenu.people_count
    const ingsAfter=Object.fromEntries(computedMenu.shopping_list.map(e => [e.ingredient.name, e.quantity]))

    const ratio=peopleAfter/peopleBefore
    Object.entries(ingsBefore).forEach(([ingName, qty]) => {
      expect(ingsAfter[ingName]).toEqual(qty*ratio)
    });

  })

})
