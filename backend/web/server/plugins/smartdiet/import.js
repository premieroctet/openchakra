const fs=require('fs')
const lodash=require('lodash')
const {extractData, guessFileType, importData}=require('../../../utils/import')
const { guessDelimiter } = require('../../../utils/text')
const Company=require('../../models/Company')
require('../../models/User')

const computePseudo = record => {
  const letters=[record.firstname?.slice(0, 1), record.lastname?.slice(0, 2)].filter(v => !!v)
  return letters.join('').toUpperCase() || 'FAK'
}

const importUsers = async input_file => {
  const company=(await Company.update({name: 'Import'}, {name: 'Import'}, {upsert: true})).upserted[0]._id
  console.log(company)
  const MAPPING={
    email: 'emailCanonical',
    firstname: record => record.firstname || 'inconnu',
    lastname: record => record.lastname || 'inconnu',
    dataTreatmentAccepted: () => true,
    cguAccepted: () => true,
    password: () => 'DEFAULT',
    company: () => company,
    pseudo: record => computePseudo(record),
  }
  const contents=fs.readFileSync(input_file)
  return Promise.all([guessFileType(contents), guessDelimiter(contents)])
    .then(([format, delimiter]) => extractData(contents, {format, delimiter}))
    .then(({records}) => importData({model: 'user', data:records.slice(0, 1000), mapping:MAPPING}))
    .then(res => console.log(lodash(res).groupBy('status').mapValues(v => v.length).value()))
    .catch(console.error)
}

module.exports={
  importUsers
}