const axios=require('axios')

const storeAuth = res => {
  return new Promise(resolve => {
    const token=res.headers['set-cookie'][0].split('=')[1].split(';')[0].replace('%20', ' ')
    axios.defaults.headers.common.Authorization = token
    resolve()
  })
}

export const login = username => {
  return axios.post('https://localhost/myAlfred/api/users/force-login', {username: username})
    .then(res => {
      return storeAuth(res)
    })
}

export const forceDataModelFumoir = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'fumoir'),
    }
  })
}

export const forceDataModelDekuple = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'dekuple'),
    }
  })
}

export const forceDataModelAftral = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'aftral'),
    }
  })
}

export const forceDataModelSmartdiet = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'smartdiet'),
    }
  })
}

export const forceDataModelAllInclusive = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'all-inclusive'),
    }
  })
}

export const forceDataModelKlesia = () => {
  jest.mock('../config/config', () => {
    const originalModule = jest.requireActual('../config/config')

    return {
      __esModule: true,
      ...originalModule,
      getDataModel: jest.fn(() => 'klesia'),
    }
  })
}

// Creates the regular expression matching model attributes validation fail
export const buildAttributesException = attributes => {
  return new RegExp(attributes.map(att => `(?=.*${att})`).join(''))
  // (?=.*birthday)(?=.*gender)(?=.*dataTreatmentAccepted)(?=.*cguAccepted)(?=.*pseudo)(?=.*home_status)/
}
