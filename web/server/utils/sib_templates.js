const {getDataModel}=require('../../config/config')

let SIB_IDS=require(`./sib_templates/others`)

try {
  const DM_IDS=require(`./sib_templates/${getDataModel()}`)
  SIB_IDS={...SIB_IDS, ...DM_IDS}
  console.log(`Loaded SIB ids for ${getDataModel()}`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  console.log(`No extra SIB ids for ${getDataModel()}`)
}

module.exports = SIB_IDS
