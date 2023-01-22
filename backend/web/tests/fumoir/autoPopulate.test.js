const mongoose = require('mongoose')
const moment=require('moment')
const {forceDataModelFumoir}=require('../utils')
forceDataModelFumoir()

const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const Category=require('../../server/models/Category')
require('../../server/models/Product')

/**
const {depthSync}=require('tree-traversal')

const treeDisplay = {
  subnodesAccessor: node => node.children,
  // onNode: (node, userdata) => { console.log(`${'-'.repeat(node.getDepth())}:${node.name}`) },
  userdataAccessor: (node, userdata) => {
    const depth=node.getDepth()
    const [dBefore, dAfter]=[depth?(depth-1)*2:0, depth ? 1:0]
    userdata.lines.push(`${' '.repeat(dBefore)}${depth?'+':''}${' '.repeat(dAfter)}${node.name}`)
    return userdata
  },
  userdata: {lines: []},
}
*/

describe('Autopopulate', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
  })

  test('Should autopopulate multiple levels', async() => {
    const subwine=await Promise.all('Bordeaux Alsace Sud-Ouest Beaujolais'.split(' ').map(name => Category.create({name})))
    const subspirit=await Promise.all('Whisky Vodka Gin Rhum Tequila'.split(' ').map(name => Category.create({name})))
    const subchampagne=await Promise.all('Blanc Rosé'.split(' ').map(name => Category.create({name})))
    const subsoft=await Promise.all('Jus Soda Eau'.split(' ').map(name => Category.create({name})))
    const childrenGroups=[subwine, subspirit, subchampagne, subsoft]
    const children=await Promise.all('Vin Spiritueux Champagne Soft'.split(' ').map((name, idx) => Category.create({name, children: childrenGroups[idx]})))
    await Category.create({name: 'Boissons', children})
    await Category.findOne({name: 'Boissons'})
  })

})
