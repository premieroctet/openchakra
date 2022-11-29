const { MONGOOSE_OPTIONS } = require('../server/utils/database');
const mongoose = require('mongoose')
const lodash=require('lodash')

const MultipleLevelSchema=new mongoose.Schema({
  label: String,
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'multipleLevel',
    autopopulate: true,
    required: false
  }],
})

MultipleLevelSchema.virtual('string').get(function() {
  let res=this.label
  if (this.children?.length>0) {
    res=res+`,children:[${this.children.map(c => c.string)}]`
  }
  return res
})

MultipleLevelSchema.plugin(require('mongoose-autopopulate'))
const MultipleLevel=mongoose.model('multipleLevel', MultipleLevelSchema)

describe('Autopopulate', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => mongoose.connection.dropDatabase())
  })

  test('Should autopopulate multiple levels', async () => {
    const subchildren=await Promise.all(lodash.range(3).map(idx =>  MultipleLevel.create({label: `subchild${idx}`})))
    const children=await Promise.all(lodash.range(3).map(idx =>  MultipleLevel.create({label: `child${idx}`, children:subchildren})))
    const parent=await MultipleLevel.create({label: 'parent', children})

    const loadedParent=await MultipleLevel.findOne({label: 'parent'})
    console.log(loadedParent.string)
  })

})
