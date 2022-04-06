/**
SUPPOSITIONS:
- terrains: un terrain STANDARD donne une qualité standard, tout autre donne une qualité XHD
     (lien entre utilisation standard ou utilisation XHD dans Machines et type de terrain dans Matrice Dents Développée)
- on suppose qu'un bouclier centre est un bouclier interdent
- les calculs de quantités par nombre de dents sont à vérifier
- une lame semi-delta est à considérer comme une lame delta
- lames possibles:
   - excavatrice : droite ou semi-delta
   - chargeuse : droite ou delta
*/
const {
  BLADE_SHAPES,
  FIX_TYPES,
  MACHINE_TYPES,
  PIN,
  SOLD,
} = require('../../../utils/consts')
const ExcelJS = require('exceljs')
const lodash=require('lodash')

const UNKNOWN_TEETH='nb de dents'

const GROUPS= (teeth, bladeShape, borderShieldFixType, teethShieldFixType) => {

  const delta= /delta/i.test(bladeShape)

  const config={
    'Porte-dents': {
      'ADAPTEUR': teeth || UNKNOWN_TEETH,
      "CHAPEAU D'USURE": teeth || UNKNOWN_TEETH,
      'CLAVETTE': teeth || UNKNOWN_TEETH,
      'FOURREAU': teeth || UNKNOWN_TEETH,
      'CLE DENT': 1,
    },
    Dents: {

    },
    'Boucliers inter-dents': teethShieldFixType==PIN ? {
      'BASE A SOUDER': teeth-1,
      'BOUCLIER A CLAVETER CENTRE': teeth-(delta ? 3 : 1),
      'BOUCLIER A CLAVETER DROITE': delta ? 1 : 0,
      'BOUCLIER A CLAVETER GAUCHE': delta ? 1 : 0,
      'CLE BOUCLIER': 1,
    }: teethShieldFixType==SOLD ?
      {
        'BOUCLIER A SOUDER': teeth-1,
        'BOUCLIER A SOUDER DROITE': delta ? 1 : 0,
        'BOUCLIER A SOUDER GAUCHE': delta ? 1 : 0,
      }:
      {},
    'Bouclier flanc': {
      [borderShieldFixType==PIN ? 'BOUCLIER DE FLANC': undefined]: '2 ou 4',
      [borderShieldFixType==PIN ? 'BOUCLIER DE FLANC A CLAVETER' : borderShieldFixType==SOLD ?'BOUCLIER DE FLANC A SOUDER' : undefined]: '2 ou 4',
      [borderShieldFixType==PIN ? 'BASE A SOUDER': undefined]: '2 ou 4',
    },
    'Bouclier talon': {
      'BOUCLIER DE TALON DE GODET': 10,
    },
  }

  return config
}

const checkXLFormat = workbook => {
  const errors=[]
  const EXPECTED={
    // NOM d'onglet: {ligne: valeurs, ligne: valeurs}
    Machines: {1: 'TYPE DE MACHINE,CONSTRUCTEURMANUFACTURER,MACHINE\n MODEL,POIDS\nWEIGHT,KW,B.O.F. Mini (kN),B.O.F Maxi (kN),PNEU,CHENILLE,SHOVEL,Famille\nProduit,Utilisation\nSTANDARD,Nb de dent du godet,Utilisation\nXHD,Nb de dent du godet'.split(',')},
    'Matrice Ep LAME_Excavatrice': {2: "TAILLE,TYPE,EPAISSEUR LAME,TYPE LAME,ADAPTEUR,CHAPEAU D'USURE,CLAVETTE,FOURREAU,CLE DENT,BOUCLIER A SOUDER,BOUCLIER A SOUDER DROITE,BOUCLIER A SOUDER GAUCHE,BASE A SOUDER,BOUCLIER A CLAVETER CENTRE,BOUCLIER A CLAVETER DROITE,BOUCLIER A CLAVETER GAUCHE,CLAVETTE BOUCLIER,BOUCLIER DE FLANC,CLE BOUCLIER,BOUCLIER DE FLANC A CLAVETER,BOUCLIER DE FLANC A SOUDER,BOUCLIER DE TALON DE GODET".split(',')},
    'Matrice Ep LAME_Chargeuse': {2: "TAILLE,TYPE,EPAISSEUR LAME,TYPE DE LAME,ADAPTEUR,CHAPEAU D'USURE,CLAVETTE,FOURREAU,CLE DENT,BOUCLIER A SOUDER,BOUCLIER A SOUDER DROITE,BOUCLIER A SOUDER GAUCHE,BASE A SOUDER,BOUCLIER A CLAVETER CENTRE,BOUCLIER A CLAVETER DROITE,BOUCLIER A CLAVETER GAUCHE,CLAVETTE BOUCLIER,BOUCLIER DE FLANC,CLE BOUCLIER,BOUCLIER DE FLANC A CLAVETER,BOUCLIER DE FLANC A SOUDER,BOUCLIER DE TALON DE GODET".split(',')},
    'Matrice Dents développée': {
      2: ',,STANDARD,STANDARD,STANDARD,STANDARD,STANDARD,STANDARD,,DUR,DUR,DUR,,TRES DUR,TRES DUR,TRES DUR,,ABRASIF,ABRASIF,ABRASIF,,TRES ABRASIF,TRES ABRASIF,TRES ABRASIF'.split(','),
      3: 'TAILLE / TYPE,MACHINES,TERRE\n (terre pierre),SABLE,GRAVIER,CHARBON,CRAIE,MINERAIS (Peu Abrasif),MACHINES,CALCAIRE,BASALTE,SCHISTE,MACHINES,AMPHIBOLITE,LEPTYNITE,RHYOLITE,MACHINES,QUARTZ,SILICE,POUZOLLANE,MACHINES,GRANITES,GNEISS,PORPHYRE'.split(','),
    },
  }

  Object.entries(EXPECTED).forEach(([sheetName, constants]) => {
    const sheet=workbook.getWorksheet(sheetName)
    if (!sheet) {
      return errors.push(`Missing worksheet:${sheetName}`)
    }
    Object.entries(constants).map(([row, expectedValues]) => {
      const rowValues=sheet.getRow(row)
      expectedValues.map((expectedValue, idx) => {
        const cellValue=rowValues.getCell(idx+1).value || ''
        if (cellValue!=expectedValue) {
          return errors.push(`Onglet ${sheetName}, ligne ${row} colonne ${idx+1}: valeur ${cellValue}, attendu ${expectedValue}`)
        }
      })
    })
  })

  return errors
}

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
  header_row.eachCell({includeEmpty: true}, c => {
    if (c.value && c.value.match(MACHINE_RE)) {
      machineColumns.push(c.col)
    }
  })
  sheet.getRows(HEADER_ROW+1, sheet.rowCount).forEach(row => {
    const type=row.getCell(1).value
    let machine=null
    row.eachCell({includeEmpty: true}, cell => {
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
      const type=row.getCell(TYPE_COL).value
      const mark=`${row.getCell(MARK_COL).value}`
      const model=`${row.getCell(MODEL_COL).value}`
      const power=parseFloat(row.getCell(POWER_COL).value) || null
      const weight=parseFloat(row.getCell(WEIGHT_COL).value) || null
      const family=row.getCell(FAMILY_COL).value || null
      if (mark && model) {
        const data={type: type.trim(), mark: mark.trim(), model: model.trim(), power: power, weight: weight, family: family && family.trim()}
        if (family) {
          data.reference= {
            STANDARD: {
              ref: row.getCell(STD_REF_COL).value, teeth: row.getCell(STD_TEETH_COL).value,
            },
            XHD: {
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

const loadAccessories = wb => {

  const FAMILY_COL=2
  const THICKNESS_COL=3
  const BLADESHAPE_COL=4
  const HEADER_ROW=2

  const res={}
  Object.keys(MACHINE_TYPES).forEach(type => {
    const sheet=wb.worksheets.find(s => s.name.match(new RegExp(`_${type}`, 'i')))
    if (!sheet) {
      return null
    }
    const header=sheet.getRow(HEADER_ROW)
    sheet.getRows(HEADER_ROW+1, sheet.rowCount).forEach(row => {
      const family=row.getCell(FAMILY_COL).text
      const thickness=row.getCell(THICKNESS_COL).text
      const bladeShape=row.getCell(BLADESHAPE_COL).text
      if (!family || !thickness || !bladeShape) {
        return
      }
      const key=[type, family, thickness, bladeShape]
      const config={}
      row.eachCell({includeEmpty: true}, c => {
        if (c.col>BLADESHAPE_COL && c.text && header.getCell(c.col).text) {
          const key2=header.getCell(c.col).text
          config[key2]=c.text
        }
      })
      res[key]=(res[key]||[])
      res[key].push(config)
    })
  })
  return res
}

let cached_database=null

const getDatabase = () => {
  return new Promise((resolve, reject) => {
    if (cached_database!=null) {
      return resolve(cached_database)
    }
    const workbook = new ExcelJS.Workbook()
    workbook.xlsx.readFile(`${__dirname}/../../../static/assets/data/feurst_db.xlsx`)
      .then(wb => {
        const errors=checkXLFormat(workbook)
        if (errors.length>0) {
          console.error(`Invalid Feurst database:${JSON.stringify(errors)}`)
          return reject(errors)
        }
        console.log(`Feurst database OK`)
        const machines=loadMachines(wb.getWorksheet('Machines'))
        const thicknesses=loadThicknesses(['Matrice Ep LAME_Excavatrice', 'Matrice Ep LAME_Chargeuse'].map(s => wb.getWorksheet(s)))
        const grounds=loadGrounds(wb.getWorksheet('Matrice Dents développée'))
        const accessories=loadAccessories(wb)
        cached_database={
          machines: machines,
          thicknesses: thicknesses,
          grounds: grounds,
          accessories: accessories,
        }
        resolve(cached_database)
      })
      .catch(err => {
        console.error(`Error:${err}`)
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
    console.log(`Missing hardness`)
    return null
  }
  const ref_hardness=machine.reference[data.hardness=='STANDARD' ? 'STANDARD':'XHD']
  if (!ref_hardness) {
    console.log(`No refhardness`)
  }
  return ref_hardness && ref_hardness.ref
}

const getTeethRef = (database, data) => {
  const groundKeyRe=new RegExp(`${data.family},(${data.type}|TOUTES),${data.ground}`, 'i')
  const teeth_ref=Object.entries(database.grounds).filter(e => e[0].match(groundKeyRe)).map(e => e[1])
  return lodash.flattenDeep(teeth_ref)
}

const getTeethCount = (database, data) => {
  const machine=database.machines.find(m => ['mark', 'model', 'power', 'weight'].every(att => m[att]==data[att]))
  if (machine && data.hardness && machine.reference) {
    const use=data.hardness=='STANDARD' ? 'STANDARD' : 'XHD'
    return machine.reference[use] && machine.reference[use].teeth
  }
  return null
}

const getAccessories = (database, data) => {
  const key=[data.type, data.family, data.bladeThickness, data.bladeShape]
  const acc=database.accessories[key]
  console.log(`Configuration for ${key}:${!!acc}`)
  if (!acc) {
    return null
  }
  let res={}
  const groups=GROUPS(data.teeth_count, data.bladeShape, data.borderShieldFixType, data.teethShieldFixType)
  Object.entries(groups).forEach(entity => {
    const key=entity[0]
    res[key]={}
    const g=entity[1]
    let sub=lodash.uniqBy(acc.map(ac => lodash.pick(ac, Object.keys(g))), JSON.stringify)
    sub=sub.map(obj => Object.fromEntries(Object.entries(obj).map(ent => [ent[0], [ent[1], g[ent[0]]]])))
    sub=sub.filter(v => !lodash.isEmpty(v))
    res[key]=sub
  })
  res.Dents=data.teeth_ref.map(ref => ({'Dent': [ref, data.teeth_count]}))

  return res
}

const computePrecos = data => {
  return new Promise((resolve, reject) => {
    getDatabase()
      .then(db => {
        data={...data, hardness: getHardness(db, data)}
        data={...data, family: getFamily(db, data)}
        data={...data, teeth_ref: getTeethRef(db, data)}
        data={...data, teeth_count: getTeethCount(db, data)}
        data={...data, accessories: getAccessories(db, data)}
        resolve(lodash.pick(data, 'hardness family teeth_ref teeth_count accessories'.split(' ')))
      })
      .catch(err => {
        reject(err)
      })
  })
}

const computeDescription = (data, full_info) => {
  let description='type mark model'.split(' ').map(att => data[att] || '').join(' ')
  if (full_info) {
    if (data.bladeShape) { description += `, lame:${BLADE_SHAPES[data.bladeShape]}` }
    if (data.bladeThickness) { description += `, épaisseur:${data.bladeThickness}mm` }
    if (data.bucketWidth) { description += `, L:${data.bucketWidth}mm` }
    if (data.ground) { description += `, terrain:${data.ground}` }
    if (data.teethShieldFixType) { description += `, fixation boucliers dents:${FIX_TYPES[data.teethShieldFixType]}` }
    if (data.borderShieldFixType) { description += `, fixation boucliers flancs:${FIX_TYPES[data.borderShieldFixType]}` }
  }
  return description
}

module.exports={getDatabase, computePrecos, computeDescription, getHardness, getFamily, getTeethRef, getTeethCount}
