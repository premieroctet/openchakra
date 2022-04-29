const util=require('util')
const lodash=require('lodash')
const {extractData} = require('../../utils/import')
const {MAX_WEIGHT} = require('../../utils/feurst/consts')
const ShipRate = require('../models/ShipRate')
const {addItem, updateShipFee} = require('./commands')

const getMissingColumns = (mandatory, columns) => {
  const missingColumns=mandatory.filter(f => !columns.includes(f))
  return missingColumns
}

const mapRecord=(record, mapping) => {
  let newRecord={}
  // Apply tranforms if any
  Object.entries(mapping).forEach(([key, dest]) => {
    let column=lodash.isString(dest) ? dest : dest.column
    let transform = lodash.isObject(dest) && dest.transform || lodash.identity
    newRecord[key]=transform(record[column])
  })
  return newRecord
}

const dataImport=(model, headers, records, mapping, options) => {
  const updateOnly=!!options.update
  const uniqueKey=options.key
  const result={created: 0, updated: 0, warnings: [], errors: []}
  return new Promise((resolve, reject) => {
    const modelObj = model.schema.obj
    const modelFields=Object.keys(modelObj)
    const mandatoryFields = updateOnly ? [uniqueKey] : modelFields.filter(f => !!modelObj[f].required)
    const fileMandatoryFields=mandatoryFields.map(f => mapping[f].column || mapping[f])

    // Check missing columns
    const missingColumns=getMissingColumns(fileMandatoryFields, headers)
    if (!lodash.isEmpty(missingColumns)) {
      console.error(`Missing: ${missingColumns}`)
      result.errors=missingColumns.map(f => `Colonne ${f} manquante`)
      return resolve(result)
    }

    // Check empty mandatory fields in records
    records.forEach((record, idx) => {
      const missingFields=fileMandatoryFields.filter(mandField => !record[mandField])
      if (!lodash.isEmpty(missingFields)) {
        result.warnings.push(`Ligne ${idx+2}: Valeur(s) vide(s) pour ${missingFields.join(',')}`)
        return resolve(result)
      }
    })

    const formattedRecords=records.map(record => {
      return mapRecord(record, mapping)
    })

    // Check duplicates keys
    if (options.key) {
      const duplicates=lodash(formattedRecords).groupBy(options.key).pickBy(x => x.length > 1).keys().value()
      if (!lodash.isEmpty(duplicates)) {
        return reject(`Valeurs dupliquées dans la colonne '${mapping[options.key]}':${duplicates.join(', ')}`)
      }
    }

    const promises=formattedRecords.map(record =>
      model.updateOne({[uniqueKey]: record[uniqueKey]}, record, {upsert: true, new: true}),
    )

    console.log(JSON.stringify(promises.length))

    Promise.allSettled(promises)
      .then(res => {
        const fulfilled=res.filter(r => r.status=='fulfilled').map(r => r.value)
        const rejected=res.filter(r => r.status=='rejected').map(r => r.reason)
        result.updated=lodash.sum(fulfilled.map(f => f.modifiedCount))
        result.created=lodash.sum(fulfilled.map(f => f.upsertedCount))
        result.errors.push(...rejected.map(r => r.message))
        return resolve(result)
      })
      .catch(err => {
        result.errors.push(err)
        return resolve(result)
      })
  })
}

const fileImport= (model, bufferData, mapping, options) => {
  return extractData(bufferData, options)
    .then(({headers, records}) => {
      return dataImport(model, headers, records, mapping, options)
    })
    .catch(err => {
      return ({created: 0, updated: 0, errors: [String(err)], warnings: []})
    })
}

const shipRatesImport = (buffer, options) => {
  return new Promise((resolve, reject) => {
    let shiprates=[]
    extractData(buffer, {...options, columns: false})
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
        return resolve({updated: 0, created: result.length, warnings: [], errors: []})
      })
      .catch(err => {
        reject(err)
      })
  })
}

const lineItemsImport = (model, buffer, mapping, options) => {
  return new Promise((resolve, reject) => {
    const importResult={created: 0, updated: 0, warnings: [], errors: []}
    extractData(buffer, options)
      .then(data => {
        const headers=data.headers
        const mandatoryColumns=Object.values(mapping)
        const missingColumns=getMissingColumns(mandatoryColumns, headers)
        if (!lodash.isEmpty(missingColumns)) {
          console.error(`Missing: ${missingColumns}`)
          importResult.errors=missingColumns.map(f => `Colonne ${f} manquante`)
          return Promise.reject('break')
        }
        data.records=data.records.map(r => mapRecord(r, mapping))
        const promises=data.records.map(r => addItem(model, null, r.reference, parseInt(r.quantity)))
        return Promise.allSettled(promises)
      })
      .then(res => {
        importResult.created+=res.filter(r => r.status=='fulfilled').length
        importResult.warnings.push(...res.filter(r => r.status=='rejected').map(r => r.reason))
      })
      .then(() => {
        return updateShipFee(model)
      })
      .then(model => {
        return model.save()
      })
      .then(() => {
        return resolve(importResult)
      })
      .catch(err => {
        console.error(err)
        return err=='break' ? resolve(importResult) : reject(err)
      })
  })
}

const priceListImport = (model, buffer, mapping, options) => {
  let importResult={created: 0, updated: 0, errors: [], warnings: []}
  return new Promise((resolve, reject) => {
    extractData(buffer, {...options, columns: false})
      .then(({headers, records}) => {
        const keyIdx=0
        const firstListIdx=headers.findIndex(i => i=='PVCDIS')
        const listsRange=lodash.range(firstListIdx, headers.length+1)
        const lists=records.map(records => {
          return listsRange.map(idx => (
            {reference: records[keyIdx], name: headers[idx], price: records[idx]}
          ))
        })
        const prices=lodash.flattenDeep(lists).filter(a => !!a.name && !!a.price)
        const promises=prices.map(p => model.findOneAndUpdate({reference: p.reference, name: p.name}, p, {upsert: true}))
        Promise.allSettled(promises)
          .then(res => {
            importResult.created +=res.filter(r => r.status=='fulfilled').length
            importResult.warnings.push(...res.filter(r => r.status=='rejected').map(r => r.reason))
            return resolve(importResult)
          })
      })
  })
}

module.exports={fileImport, shipRatesImport, lineItemsImport,
  priceListImport}
