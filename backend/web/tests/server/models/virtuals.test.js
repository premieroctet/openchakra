const mongoose=require('mongoose')
const moment=require('moment')
const {MONGOOSE_OPTIONS} = require('../../../server/utils/database')
const { schemaOptions } = require('../../../server/utils/schemas')

const Schema = mongoose.Schema;

describe('Virtuals test', () => {

  let Parent, Child, GrandChild

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
      const ParentSchema=new Schema({name: String}, schemaOptions)
      ParentSchema.virtual('grandChildren', {
        ref: "grandChild", // The Model to use
        localField: "_id", // Find in Model, where localField
        foreignField: "parent.parent" // is equal to foreignField
      })
      const ChildSchema=new Schema({
        name: String,
        parent: {
          type: Schema.Types.ObjectId,
          ref: "parent",
          required: true,
        },
      }, schemaOptions)
      const GrandChildSchema=new Schema({
        parent: {
          type: Schema.Types.ObjectId,
          ref: "child",
          required: true,
        },
      })
      Parent=mongoose.model('parent', ParentSchema)
      Child=mongoose.model('child', ChildSchema)
      GrandChild=mongoose.model('grandChild', GrandChildSchema)
      const parent=await Parent.create({name:'parent'})
      const child=await Child.create({name: 'child', parent:parent})
      const grandChild=await GrandChild.create({parent:child})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  test('Load complex virtual', async () => {
    console.log(await (Parent.findOne().populate({path: 'grandChildren.parent'})))
    console.log(await Child.findOne())
    console.log(await GrandChild.findOne())
  })

})
