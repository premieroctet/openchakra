const path=require('path')
const {fs} = require('file-system')
const mongoose = require('mongoose')
const lodash=require('lodash')
const {MONGOOSE_OPTIONS} = require('../server/utils/database')
const {getDatabaseUri} = require('../config/config')

const loadModels = () => {
  const modelFiles=fs.readdirSync('server/models', {withFileTypes: true})
    .filter(ent => ent.isFile())
    .map(ent => ent.name.replace(/\.js$/, ''))
    .filter(f => !/Schema$/.test(f))
  modelFiles.forEach(f => require(`../server/models/${f}`))
  return Object.values(mongoose.models)
}

const getPaths = data => {
  if (/^static\//.test(String(data))) {
    return data
  }
  if (lodash.isArray(data) || lodash.isObject(data)) {
    return Object.values(data).map(d => getPaths(d))
  }
  return []
}

const getFolderFiles = folder => {
  const files=fs.readdirSync(folder, {withFileTypes: true})
    .filter(dirent => dirent.isFile())
    .map(dirent => path.join(folder, dirent.name))
  return files
}

mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => {
    const models=loadModels()
    return Promise.all(models.map(m => m.find({}).lean()))
  })
  .then(result => {
    const allData=lodash.flatten(result)
    const paths=[...lodash(getPaths(allData)).flattenDeep().filter(v => !!v).uniq().sort()]
    console.log(paths.length)
    const grouped=lodash.groupBy(paths, p => path.dirname(p))
    Object.entries(grouped).forEach(([folder, db_paths]) => {
      console.log(`${'*'.repeat(20)}\nCleaning folder ${folder}`)
      const folder_files=getFolderFiles(folder)
      const present=lodash.intersection(db_paths, folder_files)
      const db_only=lodash.difference(db_paths, folder_files)
      const folder_only=lodash.difference(folder_files, db_paths)
      // console.log(db_paths, folder_files, present, db_only, folder_only)
      console.log(`in DB:${db_paths.length},in folder:${folder_files.length},in both (==OK):${present.length},in DB only:${db_only.length},in folder only:${folder_only.length},`)
      if (present.length==db_paths.length) {
        console.log(`All db files ok, removing ${folder_only.length} extra files in folder ${folder}`)
        folder_only.forEach(f => fs.unlinkSync(f))
      }
      else {
        console.error(`${db_only.length} db files are not in folder: inconsistency => skipping!!`)
        console.error(`You should touch theses files:\n${db_only.map(f => `touch "${f}"`).join('\n')}`)
      }
    })
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
