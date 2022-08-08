const fs = require('fs').promises
const mongoose = require('mongoose')
const lodash=require('lodash')
const {stockImport}=require('../../server/utils/import')
const Company=require('../../server/models/Company')
const User=require('../../server/models/User')
const {FEURST_SALES}=require('../../utils/consts')
const {extractData} = require('../../utils/import')
const {lineItemsImport} = require('../../server/utils/import')
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
const {TEXT_TYPE, JSON_TYPE, XL_TYPE} = require('../../utils/consts')


describe('XL/CSV/JSON imports', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
  })

  afterAll(() => {
    return mongoose.connection.db.dropDatabase()
  })

  afterEach(() => {
  })

  const importProducts = () => {
    return Product.deleteMany({})
      .then(() => {
        return fs.readFile(`tests/data/products.xlsx`)
      })
      .then(contents => {
        return productsImport(contents, {format: XL_TYPE, tab: 'Travail'})
      })
  }

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
        expect(result.warnings).toHaveLength(0)
        expect(result.errors).toHaveLength(0)
        expect(result.updated).toBe(0)
        expect(result.created).toBe(1014)
        return Product.countDocuments()
      })
      .then(count => {
        expect(count).toBe(1014)
      })
  })

  test('Import products xlsx', () => {
    return importProducts()
      .then(result => {
        expect(result.warnings).toHaveLength(0)
        expect(result.errors).toHaveLength(7)
        expect(result.created).toBe(994)
        expect(result.updated).toBe(3)
        return Product.find()
      })
      .then(products => {
        expect(products).toHaveLength(987)
        const assembly=products.find(p => p.reference=='001130NE00')
        expect(assembly).not.toBeNull()
        expect(assembly.components).toHaveLength(4)
        expect(assembly.is_assembly).toBe(true)
        expect(assembly.has_linked).toBe(false)
        const linked=products.find(p => p.reference=='000322NE00')
        expect(linked).not.toBeNull()
        expect(linked.components).toHaveLength(1)
        expect(linked.is_assembly).toBe(false)
        expect(linked.has_linked).toBe(true)
        const basicProduct=products.find(p => p.components.length==0)
        expect(basicProduct.components).toHaveLength(0)
        expect(basicProduct.is_assembly).toBe(false)
        expect(basicProduct.has_linked).toBe(false)
      })
  })

  test('Import stock xlsx', () => {
    return importProducts()
      .then(() => {
        return fs.readFile(`tests/data/stock.json`)
      })
      .then(contents => {
        return stockImport(contents, {format: JSON_TYPE})
      })
      .then(result => {
        expect(result.warnings).toHaveLength(0)
        expect(result.errors).toHaveLength(177)
        expect(result.updated).toBe(865)
        return Product.find({description: 'ENSEMBLE', 'components.0': {$exists: true}}).populate('components')
      })
      .then(assemblies => {
        // Check stock for assemblies
        assemblies.forEach(assembly => {
          const minStock=lodash.min(assembly.components.map(c => c.stock))
          expect(assembly.stock).toBe(minStock)
        })
      })
  })

  test('Import price list xlsx', () => {
    return importProducts()
      .then(() => {
        return fs.readFile(`tests/data/products.xlsx`)
      })
      .then(contents => {
        return priceListImport(contents, {key: 'reference', format: XL_TYPE, tab: 'Travail'})
      })
      .then(result => {
        expect(result.warnings).toHaveLength(0)
        expect(result.errors).toHaveLength(0)
        expect(result.created).toBe(7575)
        expect(result.updated).toBe(0)
        return PriceList.countDocuments()
      })
      .then(count => {
        return expect(count).toBe(7548)
      })
  }, 40000)

  test('Import order items', () => {
    const CONTENTS='Référence;Qté\n001269NE00;10000\nABCD;15'
    return Product.updateMany({}, {stock: 100})
      .then(() => {
        return lineItemsImport({items: [], company: {catalog_prices: 'DISTFR', net_prices: 'PVCDIS'}, save: () => {}}, CONTENTS, {format: TEXT_TYPE, delimiter: ';'})
      })
      .then(result => {
        expect(result.warnings).toHaveLength(1)
        expect(result.errors).toHaveLength(1)
        expect(result.created).toBe(1)
        expect(result.total).toBe(2)
      })
  }, 40000)

  test('Import clients/compagnies/tarifs', () => {
    return User.insertMany([
      {firstname: 'Fabrice', name: 'Clerc', email: 'fabrice.clerc@feurst.fr', roles: [FEURST_SALES]},
      {firstname: 'Philippe', name: 'Jouannot', email: 'philippe.jouannot@feurst.fr', roles: [FEURST_SALES]},
      {firstname: 'Florian', name: 'Benetiere', email: 'florian.benetiere@feurst.fr', roles: [FEURST_SALES]},
    ])
      .then(() => {
        return fs.readFile(`tests/data/clients.xlsx`)
      })
      .then(contents => {
        return accountsImport(contents, {format: XL_TYPE, tab: 'DONNEES CLIENT FEURST'})
      })
      .then(result => {
        expect(result.warnings).toHaveLength(0)
        expect(result.errors).toHaveLength(0)
        expect(result.created).toBe(64)
        expect(result.updated).toBe(0)
        return Company.count()
      })
      .then(count => {
        return expect(count).toBe(64)
      })
  }, 40000)

  test('Test JSON & CSV', () => {
    const CSV='Col1;Col2\nA;B'
    const JS=JSON.stringify([{Col1: 'A', Col2: 'B'}])
    let csvData=null
    let jsonData=null
    const COLUMNS=true
    extractData(CSV, {format: TEXT_TYPE, delimiter: ';', columns: COLUMNS})
      .then(res => {
        csvData=res
        return extractData(JS, {format: JSON_TYPE, columns: COLUMNS})
      })
      .then(res => {
        jsonData=res
        return expect(csvData).toEqual(jsonData)
      })
  })

})
