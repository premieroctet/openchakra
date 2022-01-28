const ExcelJS = require('exceljs')

const getDatabase = () => {
  const MARK_COL=1
  const MODEL_COL=2
  const WEIGHT_COL=3
  const POWER_COL=4
  const STICK_STD_COL=11
  const STICK_XHD_COL=12
  const FAST_STD_COL=13
  const FAST_XHD_COL=14
  const TURN_STD_COL=15
  const TURN_XHD_COL=16

  const exclude_marks_re=new RegExp('hybrid pelle mining longue portée flèche articulé'.split(' ').join('|'), 'i')

  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook()
    workbook.xlsx.readFile(`${__dirname}/../../../static/assets/data/feurst_db.xlsx`)
      .then(wb => {
        const db=[]
        wb.eachSheet(sh => {
          const type=sh.name=='EXCAVATOR' ? 'pelleteuse' : 'chargeuse'
          let inside=false
          let mark=null
          sh.eachRow(row => {
            if (inside && row.getCell(MARK_COL).value!='CONSTRUCTEUR MANUFACTURER') {
              mark_value=row.getCell(MARK_COL).value
              if (mark_value && !mark_value.match(exclude_marks_re)) {
                mark = mark_value
              }
              model=row.getCell(MODEL_COL).value
              power=row.getCell(POWER_COL).value
              weight=row.getCell(WEIGHT_COL).value
              if (model) {
                const data={type: type, mark: mark, model: model, power: power, weight: weight,
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
