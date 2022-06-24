const fs=require('fs/promises')
const mongooose=require('mongoose')
const {XL_TYPE}=require('../utils/feurst/consts')
const {accountsImport}=require('../server/utils/import')
const {MONGOOSE_OPTIONS}=require('../server/utils/database')
const {getDatabaseUri}=require('../config/config')

const filename=process.argv[2]
if (!filename) {
  console.error('fichier attendu')
  process.exit(1)
}

mongooose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return fs.readFile(filename)
  })
  .then(contents => {
    return accountsImport(contents, {format: XL_TYPE, tab: 'DONNEES CLIENT FEURST'})
  })
  .then(result => {
    console.log(JSON.stringify(result))
  })
  .finally(() => {
    process.exit(0)
  })
