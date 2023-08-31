const { bufferToString, guessDelimiter } = require('../../../utils/text')
const { BadRequestError, NotFoundError } = require('../../utils/errors')
const Company = require('../../models/Company')
const Lead = require('../../models/Lead')
const { extractData, guessFileType } = require('../../../utils/import')
const lodash=require('lodash')

const MAPPING={
  'Prénom': 'firstname',
  'Nom': 'lastname',
  'Email': 'email',
  'ID': 'identifier',
  'Code entreprise': 'company_code',
  'Source': 'source',
  'Téléphone': 'phone',
}

const MANDATORY_COLUMNS=Object.keys(MAPPING)

const mapData = (input, mapping)  => {
  let output={}
  Object.entries(mapping).forEach(([src, dst])=> {
    output[dst]=input[src]
  })
  return output
}

const importLead = leadData => {
  console.log(`Handling ${leadData.email}`)
  const company_code_re=new RegExp(`^${leadData.company_code}$`, 'i')
  return Company.exists({code: company_code_re})
    .then(exists => {
      if (!exists) {return Promise.reject(`Aucune compagnie avec le code ${leadData.company_code}`)}
      return Lead.updateOne(
        {email: leadData.email},
        {...leadData},
        {upsert: true}
      )
    })
}

const importLeads= buffer => {
  return guessFileType(buffer)
    .then(type => {
      const delim=guessDelimiter(bufferToString(buffer))
      console.log(`GUessed delimiter:'${delim}',type ${type}`)
      return extractData(buffer, {format: type, delimiter:delim})
    })
    .then(data => {
      console.log(`Import leads: got ${data.records.length}, columns ${data.headers.join('/')}`)
      const missingColumns=lodash.difference(MANDATORY_COLUMNS, data.headers)
      if (!lodash.isEmpty(missingColumns)) {
        return [`Colonnes manquantes:${missingColumns.join(',')}`]
      }
      const mappedData=data.records.map(input => mapData(input, MAPPING))
      return Promise.allSettled(mappedData.map(importLead))
        .then(result => {
          return result.map((r, index) => {
            let msg=''
            if (r.status=='rejected') {
              msg=`Erreur:${r.reason}`
            }
            else {
              const mongo_result=r.value
              msg=mongo_result.upserted? `Prospect ajouté`: `Prospect mis à jour`
            }
            return `Ligne ${index+2}: ${msg}`
          })
        })
    })
}

module.exports={
  importLeads
}
