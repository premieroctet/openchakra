const csv_parse = require('csv-parse/lib/sync')
const lodash=require('lodash')
const ExcelJS = require('exceljs')
const {JSON_TYPE, TEXT_TYPE, XL_TYPE} = require('./consts')
const {bufferToString} = require('./text')
const mongoose=require('mongoose')
const { runPromisesWithDelay } = require('../server/utils/concurrency')
const NodeCache = require('node-cache')

const guessFileType = buffer => {
  return new Promise((resolve, reject) => {
    return new ExcelJS.Workbook().xlsx.load(buffer)
      .then(() => {
        return resolve(XL_TYPE)
      })
      .catch(() => {
        try {
          JSON.parse(buffer)
          return resolve(JSON_TYPE)
        }
        catch(err) {
          return Promise.reject(err)
        }
      })
      .catch(() => {
        return resolve(TEXT_TYPE)
      })
  })
}

const getTabs = buffer => {
  return new ExcelJS.Workbook().xlsx.load(buffer)
    .then(wb => {
      return wb.worksheets.map(w => w.name)
    })
}

const extractJSON=(bufferData, options) => {
  try {
    const data=JSON.parse(bufferData)
    if (options.columns) {
      const columns=lodash.flattenDeep(data.map(d => Object.keys(d)))
      return Promise.resolve({headers: columns, records: data})
    }
    const columns=lodash.flattenDeep(data.map(d => Object.keys(d)))
    const records=data.map(d => columns.map(c => d[c]))
    return Promise.resolve({headers: columns, records: records})
  }
  catch(err) {
    return Promise.reject(err)
  }
}

const extractCsv=(bufferData, options) => {
  if (!options.delimiter) {
    return Promise.reject(`CSV loading: missing options.delimiter`)
  }
  return new Promise((resolve, reject) => {
    const contents = bufferToString(bufferData)
    try {
      const opts={columns: true, bom: true, relax_column_count: true, ...options}
      const records=csv_parse(contents, opts)
      if (opts.columns) {
        const headers=Object.keys(records[0])
        resolve({headers: headers, records: records})
      }
      else {
        const headers=records[0]
        resolve({headers: headers, records: records.slice(1)})
      }
    }
    catch(err) {
      reject(err)
    }
  })
}

const extractXls=(bufferData, options) => {
  if (!options.tab) {
    return Promise.reject(`XLS loading: missing options.tab`)
  }
  return new ExcelJS.Workbook().xlsx.load(bufferData)
    .then(workbook => {
      const sheet=workbook.worksheets.find(w => w.name==options.tab)
      if (!sheet) {
        return Promise.reject(`XLS loading: sheet ${options.tab} not found`)
      }
      const first_line=options.from_line || 1
      const columnsRange=lodash.range(1, sheet.actualColumnCount+1)
      const rowsRange=lodash.range(first_line+1, sheet.actualRowCount+1)
      const headers=columnsRange.map(colIdx => sheet.getRow(first_line).getCell(colIdx).value)
      const records=rowsRange.map(rowIdx => columnsRange.map(colIdx => sheet.getRow(rowIdx).getCell(colIdx).value))
      if (!options.columns) {
        return {headers: headers, records: records}
      }
      let mappedRecords=records.map(r => Object.fromEntries(lodash.zip(headers, r)))
      return {headers: headers, records: mappedRecords}
    })
}

const extractData = (bufferData, options) => {
  const EXTRACTS={
    [XL_TYPE]: extractXls,
    [JSON_TYPE]: extractJSON,
    [TEXT_TYPE]: extractCsv,
  }
  if (!Object.keys(EXTRACTS).includes(options?.format)) {
    return Promise.reject(`Null or invalid options.format:${options?.format}`)
  }
  options={columns: true, ...options}
  return EXTRACTS[options.format](bufferData, options)
}

const extractSample = (rawData, options) => {
  return extractData(rawData, {...options, columns: false})
    .then(({headers, records}) => {
      return [headers, ...records.slice(0, 4)]
    })
}

const mapAttribute=({record, mappingFn}) => {
  if (typeof mappingFn=='string') {
    return record[mappingFn]
  }
 const res=mappingFn({record, cache:getCache})
 return res
}

const mapRecord = ({record, mapping}) => {
  const mappedArray=Object.entries(mapping).map(([k, v])=> [k, mapAttribute({record, mappingFn: v})])
  const mapped=Object.fromEntries(mappedArray)
  return mapped
}

const dataCache = new NodeCache()

const setCache = (model, migrationKey, destinationKey) => {
  if (lodash.isEmpty(destinationKey)) {
    throw new Error(`${model}:${migrationKey} dest key is empty`)
  }
  const key = `${model}/${migrationKey}`
  dataCache.set(key, destinationKey)
}

const getCache = (model, migrationKey) => {
  const key=`${model}/${migrationKey}`
  const res=dataCache.get(key)
  return res
}

function upsertRecord({model, record, identityKey, migrationKey}) {
  const identityFilter=computeIdentityFilter(identityKey, record)
  return model.findOne(identityFilter)
    .then(result => {
      if (!result) {
        return model.create({...record})
      }
      return model.updateOne({_id: result._id}, record, {/**runValidators:true, */ new: true})
        .then(() => ({_id: result._id}))
    })
    .then(result => {
      setCache(model.modelName, record[migrationKey], result._id)
      return result
    })
}

const computeIdentityFilter = (identityKey, record) => {
  return {$and: identityKey.map(key => ({[key]: record[key]}))}
}

const importData = ({model, data, mapping, identityKey, migrationKey, progressCb}) => {
  if (!model || lodash.isEmpty(data) || !lodash.isObject(mapping) || lodash.isEmpty(identityKey) || lodash.isEmpty(migrationKey)) {
    throw new Error(`Expecting model, data, mapping, identityKey, migrationKey`)
  }
  identityKey = Array.isArray(identityKey) ? identityKey : [identityKey]
  console.log(`Ready to insert ${model}, ${data.length} source records, identity key is ${identityKey}, migration key is ${migrationKey}`)
  const msg=`Inserted ${model}, ${data.length} source records`
  const mongoModel=mongoose.model(model)
  return Promise.all(data.map(record => mapRecord({record, mapping})))
    .then(mappedData => {
      const recordsCount=mappedData.length
      console.time(msg)
      return runPromisesWithDelay(mappedData.map((data, index) => () => {
        return upsertRecord({model: mongoModel, record: data, identityKey, migrationKey})
          // .catch(err => {console.error(err); throw err})
          .finally(() => progressCb && progressCb(index, recordsCount))
      }
      ))
      .then(results => {
          const createResult=(result, index) => ({
            index,
            success: result.status=='fulfilled',
            error: result.reason?.message || result.reason?._message || result.reason
          })
          return results.map((r, index) => createResult(r, index))
        })
    })
    .finally(()=> console.timeEnd(msg))
}

const prepareCache = () => {
  const MODELS=mongoose.modelNames()
  const promises=MODELS.map(modelName => {
    return mongoose.model(modelName).find({migration_id: {$ne: null}}, {migration_id:1})
      .then(data => {
        const msg=`Caching ${modelName} ${data.length}`
        console.time(msg)
        data.forEach(d => setCache(modelName, d.migration_id.toString(), d._id.toString()))
        console.timeEnd(msg)
        return true
      })
  })
  return Promise.all(promises)
}

module.exports={
  extractData, 
  guessFileType, 
  getTabs, 
  extractSample,
  importData,
  prepareCache,
}

