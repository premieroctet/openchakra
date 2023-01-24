const { GDR_MALE } = require('../../utils/dekuple/consts');
const {createUser, getNonce} = require('../../server/utils/withings');

describe('Test withings calls', () => {

  beforeAll(() => {
  })

  it('must return a nonce', async() => {
    return expect(getNonce()).resolves.toBeTruthy()
  })

  it.only('must create a user', async() => {
    const userdata={
      height:170, weight:68, gender: GDR_MALE, email: 'sebastien.auvray@free.fr',
      firstname: 'Sébastien', lastname: 'Legrand'}
    return expect(createUser(userdata)).resolves.toBeTruthy()
  })
})
