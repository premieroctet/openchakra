const fs=require('fs/promises')
const mongooose=require('mongoose')
const {JSON_TYPE, TEXT_TYPE, XL_TYPE} = require('../../utils/feurst/consts')
const {
  accountsImport,
  priceListImport,
  productsImport,
  shipRatesImport,
  stockImport,
} = require('../../server/utils/import')
const {MONGOOSE_OPTIONS}=require('../../server/utils/database')
const {getDatabaseUri}=require('../../config/config')

const [scriptName, actionName, filename]=process.argv.slice(1, 4)

const ACTIONS={
  companies: {
    fn: accountsImport,
    format: XL_TYPE,
    tab: 'DONNEES CLIENT FEURST',
  },
  prices: {
    fn: priceListImport,
    format: XL_TYPE,
    tab: 'Travail',
  },
  products: {
    fn: productsImport,
    format: XL_TYPE,
    tab: 'Travail',
  },
  shiprates: {
    fn: shipRatesImport,
    format: TEXT_TYPE,
    delimiter: ';',
  },
  stock: {
    fn: stockImport,
    format: JSON_TYPE,
  },
}

if (!actionName || !filename || !Object.keys(ACTIONS).includes(actionName)) {
  console.error(`Usage: node ${scriptName} <action> <filename>`)
  console.error(`<action> is of one ${Object.keys(ACTIONS)}`)
  process.exit(1)
}

const action=ACTIONS[actionName]

mongooose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return fs.readFile(filename)
  })
  .then(contents => {
    return action.fn(contents, action)
  })
  .then(result => {
    console.log('Import ok')
    console.log(JSON.stringify(result, null, 2))
  })
  .catch(err => {
    console.error(err)
  })
  .finally(() => {
    process.exit(0)
  })
