const ExcelJS = require('exceljs')
const lodash=require('lodash')

const loadGrounds = sheet => {

  const HARDNESS_ROW=2
  const HEADER_ROW=3
  const MACHINE_RE=/MACHINES/
  const TYPE_COL=1

  let grounds={}

  const header_row=sheet.getRow(HEADER_ROW)
  // Dureté du terrain
  const hardness_row=sheet.getRow(HARDNESS_ROW)
  const machineColumns=[]
  header_row.eachCell(c => {
    if (c.value && c.value.match(MACHINE_RE)) {
      machineColumns.push(c.col)
    }
  })
  sheet.getRows(HEADER_ROW+1, sheet.rowCount).forEach(row => {
    const type=row.getCell(1).value
    let machine=null
    row.eachCell(cell => {
      if (machineColumns.includes(cell.col)) {
        machine=cell.value
      }
      else if (cell.col!=TYPE_COL) {
        const ground=header_row.getCell(cell.col).value.replace(/[\r\n]/g, ' ')
        const hardness=hardness_row.getCell(cell.col).value
        const ref=cell.value
        const key=[type, machine, ground, hardness]
        grounds[key]=(grounds[key] || []).concat(ref)
      }
    })
  })
  return grounds
}

const loadThicknesses = sheets => {
  const HEADER_ROW=3
  const THICKNESS_COL=3

  let values=sheets.map(s => s.getRows(HEADER_ROW+1, s.rowCount).map(r => r.getCell(THICKNESS_COL).value))
  values=lodash(values).flattenDeep().uniq().filter(v => !!v).sort((a, b) => a-b)
  return values
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
      const power=parseFloat(row.getCell(POWER_COL).value) || null
      const weight=parseFloat(row.getCell(WEIGHT_COL).value) || null
      const family=row.getCell(FAMILY_COL).value || null
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

const loadAcccessories = wb => {

  const FAMILY_COL=2
  const THICKNESS_COL=3
  const HEADER_ROW=2

  const res={}
  'excavatrice chargeuse'.split(' ').forEach(type => {
    const sheet=wb.worksheets.find(s => s.name.match(new RegExp(`_${type}`, 'i')))
    if (!sheet) {
      return null
    }
    const header=sheet.getRow(HEADER_ROW).values.slice(THICKNESS_COL+1)
    sheet.getRows(HEADER_ROW+1, sheet.rowCount).forEach(row => {
      const values=row.values.map(v => v.result || v)
      const family=values[FAMILY_COL]
      const thickness=values[THICKNESS_COL]
      if (!family || !thickness) {
        return
      }
      const key=[type, family, thickness]
      const obj=Object.fromEntries(values.slice(THICKNESS_COL+1).filter((v, idx) => !!v && !!header[idx]).map((v, idx) => {
        return [header[idx], v]
      }))
      res[key]=(res[key]||[]).concat(obj)
    })
  })
  console.log(JSON.stringify(Object.entries(res).filter(e => e[0].includes('euse,TKN11,60')), null, 2))
}

const getDatabase = () => {
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook()
    workbook.xlsx.readFile(`${__dirname}/../../../static/assets/data/feurst_db.xlsx`)
      .then(wb => {
        const machines=loadMachines(wb.getWorksheet('Machines'))
        const thicknesses=loadThicknesses(['Matrice Ep LAME_Excavatrice', 'Matrice Ep LAME_Chargeuse'].map(s => wb.getWorksheet(s)))
        const grounds=loadGrounds(wb.getWorksheet('Matrice Dents développée'))
        const accessories=loadAcccessories(wb)
        resolve({
          machines: machines,
          thicknesses: thicknesses,
          grounds: grounds,
          accessories: accessories,
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getHardness = (database, data) => {
  const res=Object.keys(database.grounds).map(k => k.split(',')).filter(t => t[2]==data.ground).map(t => t[3]).find(t => !!t) || null
  return res
}

const getFamily = (database, data) => {
  const machine=database.machines.find(m => ['mark', 'model', 'power', 'weight'].every(att => m[att]==data[att]))
  if (!machine || !machine.reference) {
    console.log(`No machine or reference`)
    return null
  }
  if (data.hardness==null) {
    return null
  }
  const ref_hardness=machine.reference[data.hardness=='STANDARD' ? 'std':'xhd']
  return ref_hardness && ref_hardness.ref
}

const getAccessories = (database, data) => {
  return null
}

const computePrecos = data => {
  return new Promise((resolve, reject) => {
    getDatabase()
      .then(db => {
        data={...data, hardness: getHardness(db, data)}
        data={...data, family: getFamily(db, data)}
        data={...data, accessories: getAccessories(db, data)}
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports={getDatabase, computePrecos}
