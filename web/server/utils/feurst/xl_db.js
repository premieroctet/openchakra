const ExcelJS = require('exceljs')

const getDatabase = () => {
  const MARK_COL=1
  const MODEL_COL=2
  const STICK_STD_COL=11
  const STICK_XHD_COL=12
  const FAST_STD_COL=13
  const FAST_XHD_COL=14
  const TURN_STD_COL=15
  const TURN_XHD_COL=16

  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook()
    workbook.xlsx.readFile(`${__dirname}/../../../static/assets/data/feurst_db.xlsx`)
      .then(wb => {
        const db=[]
        wb.eachSheet(sh => {
          const type=sh.name=='EXCAVATOR' ? 'pelleteuse' : 'chargeuse'
          let inside=false
          let mark=null
          sh.eachRow((row, rowIdx) => {
            if (inside && row.getCell(MARK_COL).value!='CONSTRUCTEUR MANUFACTURER') {
              mark=row.getCell(MARK_COL).value || mark
              model=row.getCell(MODEL_COL).value
              if (model) {
                const data={type: type, mark: mark, model: model,
                  stick: {std: row.getCell(STICK_STD_COL).value, xhd: row.getCell(STICK_XHD_COL).value},
                  fast: {std: row.getCell(FAST_STD_COL).value, xhd: row.getCell(FAST_XHD_COL).value},
                  turn: {std: row.getCell(TURN_STD_COL).value, xhd: row.getCell(TURN_XHD_COL).value},
                }
                db.push(data)
              }
            }
            if (row.getCell(1).value=='CONSTRUCTEUR MANUFACTURER') {
              inside=true
            }
          })
        })
        resolve(db)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports={getDatabase}
