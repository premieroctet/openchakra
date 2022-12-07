const mongoose = require('mongoose')
const lodash=require('lodash')
const {MONGOOSE_OPTIONS} = require('../server/utils/database')

const CategorySchema=new mongoose.Schema({
  label: String,
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    autopopulate: true,
    required: false,
  }],
}, {virtual: true})

CategorySchema.virtual('string').get(function() {
  let res=`${this.label}`
  if (this.children?.length>0) {
    res=`${res}[${this.children.map(c => c.string)}]`
  }
  return res
})

CategorySchema.virtual('parent', {
  ref: 'category', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'children', // is equal to foreignField
  justOne: true,
  autopopulate: true,
})

CategorySchema.plugin(require('mongoose-autopopulate'))
const MultipleLevel=mongoose.model('category', CategorySchema)

describe('Autopopulate', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => mongoose.connection.dropDatabase())
  })

  test('Should autopopulate multiple levels', async() => {
    const subwine=await Promise.all('Bordeaux Alsace Sud-Ouest Beaujolais'.split(' ').map(label => MultipleLevel.create({label})))
    const subspirit=await Promise.all('Whisky Vodka Gin Rhum Tequila'.split(' ').map(label => MultipleLevel.create({label})))
    const subchampagne=await Promise.all('Blanc Rosé'.split(' ').map(label => MultipleLevel.create({label})))
    const subsoft=await Promise.all('Jus Soda Eau'.split(' ').map(label => MultipleLevel.create({label})))
    const childrenGroups=[subwine, subspirit, subchampagne, subsoft]
    const children=await Promise.all('vin spiritueux champagne soft'.split(' ').map((label, idx) => MultipleLevel.create({label, children: childrenGroups[idx]})))
    const parent=await MultipleLevel.create({label: 'Boissons', children})

    const loadedParent=await MultipleLevel.findOne({label: 'Boissons'})
    console.log(loadedParent.string)
  })

})
