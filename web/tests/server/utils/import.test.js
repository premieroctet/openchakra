const {accountsImport} = require('../../../server/utils/import')

const fs = require('fs').promises
const mongoose = require('mongoose')
const UserSchema = require('../../../server/models/feurst/UserSchema')
const {guessFileType} = require('../../../utils/import')
const PriceListSchema =
  require('../../../server/models/feurst/PriceListSchema')
const {priceListImport} = require('../../../server/utils/import')

const {TEXT_TYPE, XL_TYPE} = require('../../../utils/feurst/consts')


const ProductSchema = require('../../../server/models/feurst/ProductSchema')
const {fileImport, shipRatesImport} = require('../../../server/utils/import')
const {computeShipFee} = require('../../../server/utils/commands')

const Product=mongoose.model('product', ProductSchema)
const PriceList=mongoose.model('priceList', PriceListSchema)
const User=mongoose.model('user', UserSchema)
// const PriceList=mongoose.model('priceList', PriceListSchema)

describe('XL & CSV imports', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test')
  })

  afterAll(() => {
    // return mongoose.connection.db.dropDatabase()
  })

  afterEach(() => {
    return Product.deleteMany({})
  })

  describe('Guess files types', () => {
    const cases=[['shiprates.csv', TEXT_TYPE], ['products.xlsx', XL_TYPE]]
    test.each(cases)(
      'File %p expected to be type %p',
      (fname, fileType) => {
        return fs.readFile(`tests/data/${fname}`)
          .then(contents => {
            return guessFileType(contents)
          })
          .then(filetype => {
            return expect(filetype).toBe(fileType)
          })
      })
  })

  test('Import rates', () => {
    return fs.readFile(`tests/data/shiprates.csv`)
      .then(contents => {
        return shipRatesImport(contents)
      })
      .then(result => {
        expect(result.created).toBe(564)
      })
  })

  test('Import products csv', () => {
    return fs.readFile(`tests/data/products.csv`)
      .then(contents => {
        const DB_MAPPING={
          'reference': 'Code article',
          'description_2': 'Description 2',
          'group': 'Grpe',
          'family': 'Famille',
          'description': 'Description',
          'weight': {column: "Poids d'expédition", transform: v => parseFloat(v.replace(',', '.')) || null},
        }

        return fileImport(Product, contents, DB_MAPPING, {key: 'reference', delimiter: ';', format: TEXT_TYPE})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(1014)
        expect(result.updated).toBe(0)
      })
  })

  test('Import products xlsx', () => {
    return fs.readFile(`tests/data/products.xlsx`)
      .then(contents => {
        const DB_MAPPING={
          'reference': 'Code article',
          'description_2': 'Description 2',
          'group': 'Grpe',
          'family': 'Famille',
          'description': 'Description',
          'weight': {column: "Poids d'expédition", transform: v => parseFloat(String(v).replace(',', '.')) || null},
        }

        return fileImport(Product, contents, DB_MAPPING, {key: 'reference', format: XL_TYPE, tab: 'Travail'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(1014)
        expect(result.updated).toBe(0)
      })
  })

  test.only('Import price list xlsx', () => {
    return fs.readFile(`tests/data/products.xlsx`)
      .then(contents => {
        return priceListImport(PriceList, contents, null, {key: 'reference', format: XL_TYPE, tab: 'Travail'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(7524)
        expect(result.updated).toBe(0)
      })
  }, 10000)

  test.only('Import clients/compagnies/tarifs', () => {
    return fs.readFile(`tests/data/clients.xlsx`)
      .then(contents => {
        return accountsImport(User, contents, null, {format: XL_TYPE, tab: 'DONNEES CLIENT FEURST'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(64)
        expect(result.updated).toBe(0)
      })
  }, 10000)

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
