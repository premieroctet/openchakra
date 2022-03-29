const {bufferToString} = require('../../utils/text')
const csv_parse = require('csv-parse/lib/sync')
const lodash=require('lodash')

const toFloat = value => {
  try {
    return value.replace(',', '.')
  }
  catch(err) {
    console.error(err)
    return value
  }
}

const mapRecord=(record, mapping) => {
  let newRecord=lodash.fromPairs(Object.keys(mapping).map(dbKey => [dbKey, record[mapping[dbKey]]]))
  newRecord=newRecord.price ? {...newRecord, price: toFloat(newRecord.price)} : newRecord
  return newRecord
}

const dataImport=(model, headers, records, mapping, options) => {
  const updateOnly=!!options.update
  const uniqueKey=options.key
  return new Promise((resolve, reject) => {
    const modelObj = model.schema.obj
    const modelFields=Object.keys(modelObj)
    const mandatoryFields = updateOnly ? [uniqueKey] : modelFields.filter(f => !!modelObj[f].required)
    const fileMandatoryFields=mandatoryFields.map(f => mapping[f])

    // Check missing columns
    const missingColumns=fileMandatoryFields.filter(f => !headers.includes(f))
    if (!lodash.isEmpty(missingColumns)) {
      console.error(`Missing: ${missingColumns}`)
      return reject({imported: 0, warnings: [], errors: missingColumns.map(f => `Colonne ${f} manquante`)})
    }

    // Check empty mandatory fields in records
    const warnings=[]
    records.forEach((record, idx) => {
      const missingFields=fileMandatoryFields.filter(mandField => lodash.isEmpty(record[mandField]))
      if (!lodash.isEmpty(missingFields)) {
        warnings.push(`Ligne ${idx+2}: Valeur(s) vide(s) pour ${missingFields.join(',')}`)
      }
    })

    if (!lodash.isEmpty(warnings)) {
      return reject({imported: 0, warnings: warnings, errors: null})
    }

    const formattedRecords=records.map(record => {
      return mapRecord(record, mapping)
    })

    const promises=formattedRecords.map(record =>
      model.update({[uniqueKey]: record[uniqueKey]}, record, {upsert: !updateOnly && true}),
    )

    Promise.allSettled(promises)
      .then(res => {
        const fulfilled=res.filter(r => r.status=='fulfilled').map(r => r.value)
        const updated=lodash.sum(fulfilled.map(f => f.nModified))
        const created=lodash.sum(fulfilled.map(f => (f.upserted ? f.upserted.length : 0)))
        const result={updated: updated, created: created, warnings: null, errors: null}
        return resolve(result)
      })
  })
}

const extractCsv=bufferData => {
  return new Promise((resolve, reject) => {
    const contents = bufferToString(bufferData)
    try {
      const records=csv_parse(contents, {columns: true, delimiter: ';'})
      const input_fields = Object.keys(records[0]).sort()
      resolve({headers: input_fields, records: records})
    }
    catch(err) {
      reject(err)
    }
  })
}

const csvImport= (model, bufferData, mapping, options) => {
  return new Promise((resolve, reject) => {
    // data buffer to CSV
    extractCsv(bufferData, options)
      .then(({headers, records}) => {
        return dataImport(model, headers, records, mapping, options)
      })
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        resolve({errors: [err]})
      })
  })
}

module.exports={csvImport}
