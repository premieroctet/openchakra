const axios=require('axios')

const storeAuth = res => {
  return new Promise(resolve => {
    const token=res.headers['set-cookie'][0].split('=')[1].split(';')[0].replace('%20', ' ')
    axios.defaults.headers.common.Authorization = token
    resolve()
  })
}

const login = username => {
  return axios.post('https://localhost/myAlfred/api/users/force-login', {username: username})
    .then(res => {
      return storeAuth(res)
    })
}

const forceDataModelFumoir = () => {
  require('../server/utils/studio/fumoir/functions')
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'fumoir'),
    }
  })
}

const forceDataModelDekuple = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'dekuple'),
    }
  })
}

const forceDataModelAftralStudio = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'aftral_studio'),
    }
  })
}

module.exports={
  login,
  forceDataModelFumoir, forceDataModelDekuple, forceDataModelAftralStudio,
}
