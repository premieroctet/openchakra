const {getDataModel}=require('../../config/config')

let SIB_IDS=require(`./sib_templates/${getDataModel()}`)

module.exports = SIB_IDS
