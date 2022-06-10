const {lineItemsImport} = require('../../server/utils/import')

const fs = require('fs').promises
const mongoose = require('mongoose')

const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

const Product = require('../../server/models/Product')
const PriceList = require('../../server/models/PriceList')

const {
  accountsImport,
  priceListImport,
  productsImport,
  shipRatesImport,
} = require('../../server/utils/import')

const {guessFileType} = require('../../utils/import')
const {computeShippingFee} = require('../../server/utils/commands')
const {TEXT_TYPE, XL_TYPE} = require('../../utils/feurst/consts')


describe('XL & CSV imports', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
  })

  afterAll(() => {
    return mongoose.connection.db.dropDatabase()
  })

  afterEach(() => {
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
        return shipRatesImport(contents, {format: TEXT_TYPE, delimiter: ';'})
      })
      .then(result => {
        return expect(result.created).toBe(564)
      })
  })

  test('Import products csv', () => {
    return Product.deleteMany()
      .then(() => {
        return fs.readFile(`tests/data/products.csv`)
      })
      .then(contents => {
        return productsImport(contents, {delimiter: ';', format: TEXT_TYPE})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.updated).toBe(0)
        expect(result.created).toBe(1014)
        return Product.countDocuments()
      })
      .then(count => {
        expect(count).toBe(1014)
      })
  })

  test('Import products xlsx', () => {
    return Product.deleteMany()
      .then(() => {
        return fs.readFile(`tests/data/products.xlsx`)
      })
      .then(contents => {
        return productsImport(contents, {format: XL_TYPE, tab: 'Travail'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(1014)
        expect(result.updated).toBe(0)
        return Product.findOne({reference: '001130NE00'})
      })
      .then(product => {
        expect(product).not.toBeNull()
        expect(product.components).toHaveLength(4)
      })
  })

  test.skip('Import stock xlsx', () => {
    return fs.readFile(`tests/data/products.xlsx`)
      .then(contents => {
        return productsImport(contents, {format: XL_TYPE, tab: 'Travail'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(1014)
        expect(result.updated).toBe(0)
        return Product.findOne({reference: '001130NE00'})
      })
      .then(product => {
        expect(product).not.toBeNull()
        expect(product.components).toHaveLength(4)
      })
  })

  test('Import price list xlsx', () => {
    return fs.readFile(`tests/data/products.xlsx`)
      .then(contents => {
        return priceListImport(contents, {key: 'reference', format: XL_TYPE, tab: 'Travail'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(7516)
        expect(result.updated).toBe(0)
        return PriceList.countDocuments()
      })
      .then(count => {
        return expect(count).toBe(7516)
      })
  }, 40000)

  test.only('Import order items', () => {
    const CONTENTS='Référence;Quantité\n001269NE00;10000\nABCD;15'
    return Product.updateMany({}, {stock: 100})
      .then(() => {
        return lineItemsImport({items: [], company: {catalog_prices: 'DISTFR', net_prices: 'PVCDIS'}, save: () => {}}, CONTENTS, {format: TEXT_TYPE, delimiter: ';'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(1)
        expect(result.errors.length).toBe(1)
        expect(result.created).toBe(1)
        expect(result.total).toBe(2)
      })
  }, 40000)

  test('Import clients/compagnies/tarifs', () => {
    return fs.readFile(`tests/data/clients.xlsx`)
      .then(contents => {
        return accountsImport(contents, {format: XL_TYPE, tab: 'DONNEES CLIENT FEURST'})
      })
      .then(result => {
        expect(result.warnings.length).toBe(0)
        expect(result.errors.length).toBe(0)
        expect(result.created).toBe(64)
        expect(result.updated).toBe(0)
      })
  }, 40000)

  describe('Compute rates', () => {
    const cases=[[1, 50, false, 28], [28, 168, true, 115.92]]
    test.each(cases)(
      'Zipcode %p, weight %p, express %p expects ship fee %p€',
      (zipcode, weight, express, expected) => {
        return computeShippingFee({total_weight: weight, company: {carriage_paid: 1000000, addresses: []}}, {zip_code: zipcode*1000+123}, express)
          .then(fee => {
            expect(fee).toBe(expected)
          })
      })

    test('No ship rate for Corsica', () => {
      return expect(computeShippingFee({company: {carriage_paid: 100000, addresses: []}}, {zip_code: 20125}, true)).rejects.toMatch('No rate found')
    })
  })

})
