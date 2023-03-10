const { capitalize } = require('../../utils/text')
const { FUMOIR_MEMBER } = require('../../server/plugins/fumoir/consts')

const axios = require('axios')
const https=require('https')
const {promises: fs} = require('fs')
const mongoose = require('mongoose')
const lodash=require('lodash')
const exceljs=require('exceljs')

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
})

const MAPPING=['role', 'lastname', 'firstname', 'email', 'phone', 'subscription_start',
 'subscription_end', 'locker', 'subscription_price']

const [filename, sheetname]=process.argv.slice(2,4)

if (!filename || !sheetname) {
  console.error('Attendu: <xlsx_filename> <sheet_name>')
  process.exit(1)
}

const importLine = values => {
  let params=Object.fromEntries(lodash.zip(MAPPING, values))
  console.log(JSON.stringify(params))
  params.role=params.role=='membre' ? FUMOIR_MEMBER: params.role
  params.email=params.email?.toLowerCase()
  params.phone=params.phone?.toString().replace(/[ \t]/g, '')
  params.firstname=capitalize(params.firstname)
  params.lastname=capitalize(params.lastname)
  //const encodedparams=lodash(params).mapValues(v => JSON.stringify(v)).value()
  const encodedparams=params

  //return axiosInstance.post('https://localhost/myAlfred/api/studio/register', encodedparams)
  return axiosInstance.post('https://localhost/myAlfred/api/studio/user', encodedparams)
    .then(() => console.log(`${params.email}: compte créé`))
    .catch(err => console.error(`${params.email}: erreur ${err}`))
}

const importSheet = sheet => {
  console.log(`Importing sheet rows ${sheet.actualRowCount} columns ${sheet.actualColumnCount}`)
  return Promise.allSettled(lodash.range(2, sheet.actualRowCount+1).map(row => {
    values = sheet.getRow(row).values.slice(1).map(v => v.text || v)
    return importLine(values)
  }))
}

new exceljs.Workbook().xlsx.readFile(filename)
  .then(wb => wb.getWorksheet(sheetname))
  .then(sheet => sheet ? importSheet(sheet):Promise.reject('pas de feuille'))
  .catch(err => {
    console.error(err)
  })
  .finally(()=> {
    process.exit(0)
  })
