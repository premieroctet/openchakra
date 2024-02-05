const { updateWorkflows } = require('./workflows')
const { sendLeadOnboarding } = require('./mailing')
const { bufferToString, guessDelimiter } = require('../../../utils/text')
const { BadRequestError, NotFoundError } = require('../../utils/errors')
const Company = require('../../models/Company')
const Lead = require('../../models/Lead')
const { extractData, guessFileType } = require('../../../utils/import')
const lodash=require('lodash')
const { CALL_STATUS, CALL_STATUS_CALL_1, CALL_DIRECTION, CALL_DIRECTION_IN_CALL, CALL_DIRECTION_OUT_CALL } = require('./consts')

const VALID_CALLS={'Entrant': CALL_DIRECTION_IN_CALL, 'Sortant': CALL_DIRECTION_OUT_CALL}
const VALID_CONSENT={'Oui': true, 'Non': false}

const MAPPING={
  'Prénom': 'firstname',
  'Nom': 'lastname',
  'Email': 'email',
  'ID': 'identifier',
  'Code entreprise': 'company_code',
  'Source': 'source',
  'Téléphone': 'phone',
  'Statut': {
    attribute: 'call_status', 
    validate: v => !v || [CALL_STATUS.CALL_STATUS_TO_CALL, CALL_STATUS.CALL_STATUS_TO_RENEW].includes(v?.trim()),
    convert: v => lodash.findKey(CALL_STATUS, label => label==v?.trim()),
  },
  'Campagne': 'campain',
  'Appel entrant/sortant': {
    attribute: 'call_direction', 
    validate: v => !v || Object.keys(VALID_CALLS).includes(v?.trim()),
    convert: v => v ? VALID_CALLS[v?.trim()] : v,
  },
  'Consentement': {
    attribute: 'consent', 
    validate: v => !v || Object.keys(VALID_CONSENT).includes(v?.trim()),
    convert: v => v ? VALID_CALLS[v?.trim()] : v,
  },

}

// TODO mandatory for in/out calls
//const MANDATORY_COLUMNS=Object.keys(MAPPING)
// TODO mandatory for simple leads
const MANDATORY_COLUMNS=['Prénom', 'Nom', 'Email']

const VALID = () => true
const IDENTITY = v => lodash.isEmpty(v) ? null : v

const mapData = (input, mapping)  => {
  let output={}
  try {
  Object.entries(mapping).forEach(([src, dst])=> {
    const validate = dst.validate || VALID
    const convert=dst.convert || IDENTITY
    const attribute=dst.attribute || dst
    
    const value=input[src]
    if (!validate(value)) {
      throw new Error(`Valeur ${src} '${value}' invalide`)
    }
    let converted=convert(value)

    // console.log(src, '=>', attribute, converted)

    output[attribute]=lodash.isEmpty(converted) ? null : converted
  })
  // console.log(input, "=>", output)
  // console.log('return')
  return Promise.resolve(output)
  }
  catch(error){
    return Promise.reject(error)
  }
}

const importLead = leadData => {
  console.log(`Handling ${JSON.stringify(leadData)}`)
  const company_code_re=new RegExp(`^${leadData.company_code}$`, 'i')
  return Company.exists({code: company_code_re})
    .then(exists => {
      // console.log('exists', exists)
      if (!exists) {return Promise.reject(`Aucune compagnie avec le code ${leadData.company_code}`)}
      return Lead.updateOne(
        {email: leadData.email},
        {...leadData},
        {upsert: true, runValidators: true}
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
      return Promise.allSettled(data.records.map(input => {
        return mapData(input, MAPPING)
          .then(mappedData => {
            //console.log('mapped is', mappedData)
            return importLead(mappedData)
          })
      }))
    })
    .then(result => {
      console.log('*******', result)
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
          //console.log(`Import result:${res}`)
          return res
        })
    })
    .catch(console.error)
}

module.exports={
  importLeads
}
