const {computeShipFee} = require('./commands')
const {shipRatesImport} = require('./import')

const fs = require('fs').promises
const ShipRate = require('../models/ShipRate')
const {MONGOOSE_OPTIONS} = require('./database')
const mongoose = require('mongoose')

describe('Ship rates import test', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
  })

  afterAll(() => {
    return ShipRate.deleteMany({})
      .then(() => {
        return mongoose.connection.close()
      })
  })

  afterAll(() => {
  })

  test('Import rates', () => {
    return fs.readFile(`static/assets/data/shiprates.csv`)
      .then(contents => {
        return shipRatesImport(contents)
      })
      .then(() => {
        return ShipRate.find()
      })
      .then(result => {
        expect(result.length).toBe(564)
      })
  })

  describe('Compute rates', () => {
    const cases=[[1, 50, false, 28], [28, 168, true, 115.92]]
    test.each(cases)(
      'Zipcode %p, weight %p, express %p expects ship fee %p€',
      (zipcode, weight, express, expected) => {
        return computeShipFee(zipcode, weight, express)
          .then(fee => {
            expect(fee).toBe(expected)
          })
      })

    test('No ship rate for Corsica', () => {
      return expect(computeShipFee(20, 150, true)).rejects.toMatch('No rate found')
    })
  })

})
