import AddressSchema from '../../../server/models/AddressSchema'
const mongoose = require('mongoose')

const Address=mongoose.model('address', AddressSchema)

describe('AddressSchema tests', () => {

  test('Adresses comparison', () => {
    const ref=new Address({label: 'principale', address: '260 rue Louis Blanc', city: 'Rouen', zip_code: '76430', country: 'France'})
    const sameLabel=new Address({label: 'Principale   ', address: '15 rue tagada', city: 'Villeneuve', zip_code: 1500, country: 'Deutschland'})
    const sameAddress=new Address({label: 'Tagadadou ', address: '260 rue Louis Blanc', city: 'Rouen', zip_code: '76430', country: 'France'})
    const differentAddress=new Address({label: 'Tagadadou ', address: '260 1rue Louis Blanc', city: 'Rouen', zip_code: '76430', country: 'France'})
    expect(ref.match(sameLabel)).toBeTruthy()
    expect(ref.match(sameAddress)).toBeTruthy()
    expect(ref.match(differentAddress)).toBeFalsy()
  })
})
