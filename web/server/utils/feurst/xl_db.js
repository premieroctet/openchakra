const ExcelJS = require('exceljs')
const lodash=require('lodash')

const loadGrounds = sheet => {

  const GROUND_ROW=3
  const EXCLUDES=[/TAILLE/, /MACHINES/]
  let grounds=[]

  sheet.getRow(GROUND_ROW).eachCell(cell => {
    if (!EXCLUDES.map(re => cell.value.match(re)).some(v => !!v)) {
      grounds.push(cell.value)
    }
  })
  return grounds
}

const loadThicknesses = sheets => {

  const THICKNESS_COL=3

  let thicknesses=[]

  sheets.forEach(sheet => {
    let inside=false
    sheet.eachRow(row => {
      if (inside && row.getCell(THICKNESS_COL).value) {
        thicknesses.push(row.getCell(THICKNESS_COL).value)
      }
      if (row.getCell(1)=='TAILLE') {
        inside=true
      }
    })
  })
  thicknesses=lodash.uniq(thicknesses.filter(v => !!v)).sort((a, b) => a-b)
  return thicknesses
}

const loadMachines = sheet => {

  const TYPE_COL=1
  const MARK_COL=2
  const MODEL_COL=3
  const WEIGHT_COL=4
  const POWER_COL=5
  const FAMILY_COL=11
  const STD_REF_COL=12
  const STD_TEETH_COL=13
  const XHD_REF_COL=14
  const XHD_TEETH_COL=15

  const machines=[]
  let inside=false
  sheet.eachRow(row => {
    if (inside) {
      const type=`${row.getCell(TYPE_COL).value}`=='EXCAVATRICE' ? 'excavator' : 'loader'
      const mark=`${row.getCell(MARK_COL).value}`
      const model=`${row.getCell(MODEL_COL).value}`
      const power=parseInt(row.getCell(POWER_COL).value) || null
      const weight=parseInt(row.getCell(WEIGHT_COL).value) || null
      const family=parseInt(row.getCell(FAMILY_COL).value) || null
      if (mark && model) {
        const data={type: type.trim(), mark: mark.trim(), model: model.trim(), power: power, weight: weight, family: family && family.trim()}
        if (family) {
          data.reference= {
            std: {
              ref: row.getCell(STD_REF_COL).value, teeth: row.getCell(STD_TEETH_COL).value,
            },
            xhd: {
              ref: row.getCell(XHD_REF_COL).value, teeth: row.getCell(XHD_TEETH_COL).value,
            },
          }
        }
        machines.push(data)
      }
    }
    if (row.getCell(1).value=='TYPE DE MACHINE') {
      inside=true
    }
  })
  return machines
}

const getDatabase = () => {
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook()
    console.time('Loading workbook')
    workbook.xlsx.readFile(`${__dirname}/../../../static/assets/data/feurst_db.xlsx`)
      .then(wb => {
        console.timeEnd('Loading workbook')
        const machines=loadMachines(wb.getWorksheet('Machines'))
        const thicknesses=loadThicknesses(['Matrice Ep LAME_Excavatrice', 'Matrice Ep LAME_Chargeuse'].map(s => wb.getWorksheet(s)))
        const grounds=loadGrounds(wb.getWorksheet('Matrice Dents développée'))
        resolve({
          machines: machines,
          thicknesses: thicknesses,
          grounds: grounds,
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports={getDatabase}
