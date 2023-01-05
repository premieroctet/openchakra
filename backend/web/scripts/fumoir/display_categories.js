const mongoose=require('mongoose')
const {getDatabaseUri}=require('../../config/config')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const MealCategory=require('../../server/models/MealCategory')
const DrinkCategory=require('../../server/models/DrinkCategory')
const CigarCategory=require('../../server/models/CigarCategory')
require('../../server/models/Product')

const printTree = require('print-tree');

const printNode = node => node.node.name

const getChildren = node => {
  const children=node.node.children?.map(child => ({model: node.model, node: child})) || []
  const products=node.node.products?.map(child => ({model: node.model, node: child})) || []
  const result= [...children, ...products]
  return result
}

const run = async () => {
  await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  const models=[MealCategory, DrinkCategory, CigarCategory]
  for (const currModel of models) {
    console.log(`Arbres ${currModel.modelName}`)
    const heads=await currModel.find({parent: null})
    for (const head of heads) {
      printTree({model:currModel, node: head}, printNode, getChildren)
    }
    console.log(`\n\n`)
  }
}

run()
