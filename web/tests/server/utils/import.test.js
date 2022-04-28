const fs = require('fs').promises
const mongoose = require('mongoose')

const ProductSchema = require('../../../server/models/feurst/ProductSchema')
const ShipRateSchema = require('../../../server/models/feurst/ShipRateSchema')
const {csvImport, shipRatesImport} = require('../../../server/utils/import')
const {computeShipFee} = require('../../../server/utils/commands')

const Product=mongoose.model('product', ProductSchema)
const ShipRate=mongoose.model('user', ShipRateSchema)

describe('Ship rates import test', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test')
  })

  afterAll(() => {
    return mongoose.connection.db.dropDatabase()
  })

  test('Import rates', () => {
    return fs.readFile(`tests/data/shiprates.csv`)
      .then(contents => {
        return shipRatesImport(contents)
      })
      .then(() => {
        return ShipRate.count()
      })
      .then(result => {
        expect(result).toBe(558)
      })
  })

  test('Import products', () => {
    return fs.readFile(`tests/data/products.csv`)
      .then(contents => {
        const DB_MAPPING={
          'reference': 'Code article',
          'description_2': 'Description 2',
          'production_line': 'Ligne prod.',
          'group': 'Grpe',
          'family': 'Famille',
          'description': 'Description',
          'weight': {column: "Poids d'expédition", transform: v => parseFloat(v.replace(',', '.')) || null},
        }

        return csvImport(Product, contents, DB_MAPPING, {key: 'reference', delimiter: ';'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(1014)
        expect(result.updated).toBe(6)
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
