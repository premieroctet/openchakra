const path=require('path')
const {fs} = require('file-system')
const mongoose = require('mongoose')
const lodash=require('lodash')
const {MONGOOSE_OPTIONS} = require('../server/utils/database')
const {getDatabaseUri} = require('../config/config')

const MODEL_NAME=process.argv[2]

if (!MODEL_NAME) {
  console.error(`Usage: ${process.argv.slice(0, 2).join(' ')}  MODEL`)
  process.exit(1)
}

console.log(`Checking model ${MODEL_NAME}`)

const model=require(`../server/models/${MODEL_NAME}`)

if (!model) {
  console.error(`Model ${MODEL_NAME} not found in code`)
  process.exit(1)
}
const getFolderFiles = folder => {
  const files=fs.readdirSync(folder, {withFileTypes: true})
    .filter(dirent => dirent.isFile())
    .map(dirent => path.join(folder, dirent.name))
  return files
}

const getCommonFolder = paths => {
  const folders=lodash.uniq(paths.map(p => path.dirname(p)))
  return folders.length==1 ? folders[0] : null
}

const stringAttributes=lodash.filter(model.schema.paths, {instance: 'String'}).map(p => p.path)
mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    return model.find({}, stringAttributes).lean()
  })
  .then(models => {
    stringAttributes.forEach(att => {
      const db_paths=lodash.uniq(models.map(m => m[att]).filter(v => String(v)?.includes('static/')))
      if (db_paths.length==0) {
        return
      }
      console.log(att)
      const folder=getCommonFolder(db_paths)
      console.log(folder)
      const folder_files=getFolderFiles(folder)
      const present=lodash.intersection(db_paths, folder_files)
      const db_only=lodash.difference(db_paths, folder_files)
      const folder_only=lodash.difference(folder_files, db_paths)
      // console.log(db_paths, folder_files, present, db_only, folder_only)
      console.log(`in DB:${db_paths.length},in folder:${folder_files.length},in both (==OK):${present.length},in DB only:${db_only.length},in folder only:${folder_only.length},`)
      console.log(`DB only:${db_only}`)
      if (present.length==db_paths.length) {
        console.log(`All db files ok, removing ${folder_only.length} extra files in folder ${folder}`)
        folder_only.forEach(f => fs.unlinkSync(f))
      }
      else {
        console.error(`${db_only.length} db files are not in folder: inconsistency => skipping!!`)
      }
    })
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
