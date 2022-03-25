const mongoose = require('mongoose')
const Product = require('../models/Product')
const {csvImport} = require('./import')
const {text}=require('./data_test.js')

const DB_MAPPING={
  'reference': 'Code article',
  'description_2': 'Description 2',
  'production_line': 'Ligne prod.',
  'group': 'Grpe',
  'family': 'Famille',
  'description': 'Description',
  'weight': "Poids d'expédition",
}

describe('Import csv', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test')
  })

  test('Buffer import', () => {
    const buf=Buffer.from(text)
    return csvImport(Product, buf, DB_MAPPING, {key: 'reference'})
  })

})
