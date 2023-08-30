const { NotFoundError } = require('../../utils/errors')

const Company = require('../../models/Company')
const Lead = require('../../models/Lead')
const { extractData, guessFileType } = require('../../../utils/import')
const { guessDelimiter } = require('../../../utils/text')

const MAPPING={
  'Prénom': 'firstname',
  'Nom': 'lastname',
  'Email': 'email',
  'Code entreprise': 'company_code',
  'Source': 'source',
  'Téléphone': 'phone',
}
const mapData = (input, mapping)  => {
  let output={}
  Object.entries(mapping).forEach(([src, dst])=> {
    output[dst]=input[src]
  })
  return output
}

const importLead = leadData => {
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

const importLeads= text => {
  return guessFileType(text)
    .then(type => {
      const delim=guessDelimiter(text)
      return extractData(text, {format: type, delimiter:delim})
    })
    .then(data => {
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
