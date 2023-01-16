const lodash=require('lodash')
const mongoose=require('mongoose')

const {
  MONGOOSE_OPTIONS,
} = require('../server/utils/database')

const ChildSchema=mongoose.Schema({
  name: String,
})

const Child=mongoose.model('child', ChildSchema)

const TestSchema=mongoose.Schema({
  name: String,
  count: {
    type: Number,
    min: 0,
    max: 3,
  },
  children: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'child',
    }],
    validate: [arr => arr.length<=2, '2 max']
  }
})

const Test=mongoose.model('test', TestSchema)

describe.only('Mongoose validation tests', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
        .then(()=>mongoose.connection.dropDatabase())
  })

  test('Should not validate on query update', async () => {
    const children=await Promise.all(lodash.range(3).map(i => Child.create({name: `Name${i}`})))
    const children_id=children.map(c => c._id)
    const t=await Test.create({name:'T1'})
    const query=Test.updateOne({}, {$push:{children: {$each: children_id}}}, {runValidators: true})
    return expect(query).rejects.toThrow('2 max')
  })

  test('Should not validate on save', async () => {
    const children=await Promise.all(lodash.range(3).map(i => Child.create({name: `Name${i}`})))
    const children_id=children.map(c => c._id)
    const t3=await Test.create({})
    t3.children=children.map(c => c._id)
    return expect(t3.save()).rejects.toThrow('2 max')
  })


})
