const {computePrecos} = require('./xl_db')

// excavatrice FKM 15
const EX_FKM_15 = {type: 'excavatrice', mark: 'BOBCAT', model: 'E 08', power: 7.4,
  weight: 1, bladeThickness: 15, ground: 'GRAVIER', borderShieldFixType: 'PIN', teethShieldFixType: 'PIN'}
// excavatrice FK9 45
const EX_FK9_45 = {type: 'excavatrice', mark: 'CATERPILLAR', model: '235 C', power: 186, weight: 30.9, bladeThickness: 45, ground: 'GRAVIER', fixType: null}

const cases=[[EX_FKM_15, 'FKM'], [EX_FK9_45, 'FK9']]
describe('Feurst precos', () => {
  test.each(cases)(
    '%p family expected to be %p',
    (data, family) => {
      return computePrecos(data)
        .then(precos => {
          expect(precos.family).toBe(family)
        })
    })
})
