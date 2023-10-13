const { updateWorkflows } = require('./workflows')
const { sendLeadOnboarding } = require('./mailing')
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
  let leadsBefore=null
  return guessFileType(buffer)
    .then(type => {
      const delim=guessDelimiter(bufferToString(buffer))
      return Promise.all([Lead.find().lean(), extractData(buffer, {format: type, delimiter:delim})])
    })
    .then(([leads, data]) => {
      leadsBefore=leads
      console.log(`Import leads: got ${data.records.length}, columns ${data.headers.join('/')}`)
      const missingColumns=lodash.difference(MANDATORY_COLUMNS, data.headers)
      if (!lodash.isEmpty(missingColumns)) {
        return [`Colonnes manquantes:${missingColumns.join(',')}`]
      }
      const mappedData=data.records.map(input => mapData(input, MAPPING))
      return Promise.allSettled(mappedData.map(importLead))
    })
    .then(result => {
      return Lead.find()
        .lean()
        .then(leadsAfter => {
          const newLeads=leadsAfter.filter(l => !leadsBefore.map(l => l.email).includes(l.email))
          //return Promise.allSettled(newLeads.map(lead => sendLeadOnboarding({lead})))
          updateWorkflows()
        })
        .then(res => {
          return result.map((r, index) => {
            if (!r.status) {return r}
            const msg=r.status=='rejected' ? `Erreur:${r.reason}` :
              r.value.upserted ? `Prospect ajouté`: `Prospect mis à jour`
              return `Ligne ${index+2}: ${msg}`
            })
        })
        .then(res => {
          console.log(`Import result:${res}`)
          return res
        })
    })
}

module.exports={
  importLeads
}
