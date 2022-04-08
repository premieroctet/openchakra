const {MAX_WEIGHT} = require('../../utils/feurst/consts')
const ShipRate = require('../models/ShipRate')
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

const extractCsv=(bufferData, options) => {
  return new Promise((resolve, reject) => {
    const contents = bufferToString(bufferData)
    try {
      const records=csv_parse(contents, {columns: true, delimiter: ';', ...options})
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

const shipRatesImport = buffer => {
  return new Promise((resolve, reject) => {
    let shiprates=[]
    extractCsv(buffer, {columns: false, from_line: 4})
      .then(result => {
        const records=result.records
        records.forEach(r => {
          const zipcode=parseInt(r[0])
          const province=r[1]
          const base_0_30_exp=parseFloat(r[2].replace(',', '.'))
          const perkg_0_30_exp=parseFloat(r[3].replace(',', '.'))
          const base_0_30=parseFloat(r[4].replace(',', '.'))
          const perkg_0_30=parseFloat(r[5].replace(',', '.'))
          const base_30_99=parseFloat(r[6].replace(',', '.'))
          const perkg_30_99=parseFloat(r[7].replace(',', '.'))
          const coef_30_99=parseFloat(r[8].replace(',', '.'))
          const base_99_=parseFloat(r[9].replace(',', '.')) || 0
          const perkg_99_=parseFloat(r[10].replace(',', '.'))
          const coef_99_=parseFloat(r[11].replace(',', '.'))
          if (base_0_30_exp && perkg_0_30_exp) {
            shiprates.push({province: province, zipcode: zipcode, express: true, min_weight: 0, max_weight: 30, fixed_price: base_0_30_exp, per_kg_price: perkg_0_30_exp})
          }
          if (base_0_30 || perkg_0_30) {
            shiprates.push({province: province, zipcode: zipcode, express: false, min_weight: 0, max_weight: 30, fixed_price: base_0_30, per_kg_price: perkg_0_30})
          }
          if (base_30_99 || perkg_30_99) {
            shiprates.push({province: province, zipcode: zipcode, express: false, min_weight: 30, max_weight: 99, fixed_price: base_30_99, per_kg_price: perkg_30_99})
          }
          if ((base_30_99 || perkg_30_99) && coef_30_99) {
            shiprates.push({province: province, zipcode: zipcode, express: true, min_weight: 30, max_weight: 99, fixed_price: base_30_99*coef_30_99, per_kg_price: perkg_30_99*coef_30_99})
          }
          if (base_99_ || perkg_99_) {
            shiprates.push({province: province, zipcode: zipcode, express: false, min_weight: 99, max_weight: MAX_WEIGHT, fixed_price: base_99_, per_kg_price: perkg_99_})
          }
          if ((base_99_ || perkg_99_) && coef_99_) {
            shiprates.push({province: province, zipcode: zipcode, express: true, min_weight: 99, max_weight: MAX_WEIGHT, fixed_price: base_99_*coef_99_, per_kg_price: perkg_99_*coef_99_})
          }
        })

        return ShipRate.deleteMany()
      })
      .then(() => {
        return ShipRate.insertMany(shiprates)
      })
      .then(result => {
        resolve({updated: 0, created: result.length, warnings: null, errors: null})
      })
      .catch(err => {
        reject(err)
      })
  })
}


module.exports={csvImport, extractCsv, shipRatesImport}
