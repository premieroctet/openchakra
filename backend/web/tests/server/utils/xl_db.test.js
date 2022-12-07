const {DROITE, EXCAVATRICE} = require('../../../utils/feurst/consts')
const {computePrecos} = require('../../../server/utils/feurst/xl_db')

// excavatrice FKM 15
const EX_FKM_15 = {type: EXCAVATRICE, mark: 'BOBCAT', model: 'E 08', power: 7.4, weight: 1, ground: 'GRAVIER', bladeThickness: 20, bladeShape: DROITE}
// excavatrice FK9 45
const EX_FK9_45 = {type: EXCAVATRICE, mark: 'CATERPILLAR', model: '235 C', power: 186, weight: 30.9, ground: 'GRAVIER', bladeThickness: 45, bladeShape: DROITE}
// excavatrice FKM 20
const EX_FKM_20 = {type: EXCAVATRICE, mark: 'CATERPILLAR', model: '300.9D', power: 9.6, weight: 0.935, ground: 'GRAVIER', bladeThickness: 20, bladeShape: DROITE}

const cases=[[EX_FKM_15, 'FKM'], [EX_FK9_45, 'FK9'], [EX_FKM_20, 'FKM']]
describe('Feurst families', () => {
  test.each(cases)(
    '%p family expected to be %p',
    (data, family) => {
      return computePrecos(data)
        .then(precos => {
          expect(precos.family).toBe(family)
        })
    })
})

describe('Auto configs', () => {
  test.each(cases.map(c => c[0]))(
    '%p expected to have an auto config',
    configuration => {
      return computePrecos(configuration)
        .then(precos => {
          console.log(JSON.stringify(precos.accessories))
          expect(!!precos.accessories).toBe(true)
        })
    })
})
