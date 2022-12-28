const mongoose = require('mongoose')
const lodash=require('lodash')
const {MONGOOSE_OPTIONS} = require('../server/utils/database')
const {getDatabaseUri} = require('../config/config')
const Category=require('../server/models/Category')
const {depthSync}=require('tree-traversal')

const treeDisplay = {
    subnodesAccessor: (node) => node.children,
    //onNode: (node, userdata) => { console.log(`${'-'.repeat(node.getDepth())}:${node.name}`) },
    userdataAccessor: (node, userdata) => {
      const depth=node.getDepth()
      const [dBefore, dAfter]=[depth?(depth-1)*2:0, depth ? 1:0]
      userdata.lines.push(`${' '.repeat(dBefore)}${depth?'+':''}${' '.repeat(dAfter)}${node.name}`)
      return userdata
    },
    userdata: {lines:[]},
}

describe('Autopopulate', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => mongoose.connection.dropDatabase())
  })

  test('Should autopopulate multiple levels', async() => {
    const subwine=await Promise.all('Bordeaux Alsace Sud-Ouest Beaujolais'.split(' ').map(name => Category.create({name})))
    const subspirit=await Promise.all('Whisky Vodka Gin Rhum Tequila'.split(' ').map(name => Category.create({name})))
    const subchampagne=await Promise.all('Blanc Rosé'.split(' ').map(name => Category.create({name})))
    const subsoft=await Promise.all('Jus Soda Eau'.split(' ').map(name => Category.create({name})))
    const childrenGroups=[subwine, subspirit, subchampagne, subsoft]
    const children=await Promise.all('Vin Spiritueux Champagne Soft'.split(' ').map((name, idx) => Category.create({name, children: childrenGroups[idx]})))
    const parent=await Category.create({name: 'Boissons', children})

    console.time('Loading')
    const loadedParent=await Category.findOne({name: 'Boissons'})
    console.timeEnd('Loading')
    console.time('Displaying')
    console.log(loadedParent.children[0].parent)
    /**
    depthSync(loadedParent, treeDisplay)
    console.log(treeDisplay.userdata.lines.join('\n'))
    */
    return console.timeEnd('Displaying')
  })

})
