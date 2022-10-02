import lodash from 'lodash'
const projectSchema=require('./projectSchema.json')
var Validator = require('jsonschema').Validator

const checkEmptyDataProvider = (comp: IComponent, icomponents: IComponents) => {
  if (comp.type == 'DataProvider') {
    if (!comp.props?.model) {
      return Promise.reject(`DataProvider ${comp.id} is unlinked`)
    }
  }
}

const checkAvailableDataProvider = (
  comp: IComponent,
  icomponents: IComponents,
) => {
  const ICON_PROPS = ['leftIcon', 'rightIcon', 'icon']
  return ICON_PROPS.map(i => {
    if (comp?.props?.[i] == 'Icon') {
      throw new Error(`Icon ${comp.id} is not defined`)
    }
  })
}

const checkEmptyIcons = (comp: IComponent, icomponents: IComponents) => {
  if (!comp.props?.dataSource) {
    return
  }
  if (!Object.keys(icomponents).includes(comp.props.dataSource)) {
    return Promise.reject(`DataProvider ${comp.props.dataSource} not found`)
  }
}

export const validate = (icomponents: IComponents) => {
  const components = Object.values(icomponents)
  return Promise.all(
    components.map(c => checkEmptyDataProvider(c, icomponents)),
  ).then(() =>
    Promise.all(
      components.map(c => checkAvailableDataProvider(c, icomponents)),
    ),
  )
}

export const validateJSON = (jsonObject: object) => {
  const validator = new Validator()
  const validationResult= validator.validate(jsonObject, projectSchema)
  if (!validationResult.valid) {
    throw new Error(validationResult.errors)
  }
}

export const validateJSON = jsonObject => {
  const validator = new Validator()
  const validationResult= validator.validate(jsonObject, schema)
  f (!validationResult.valid) {
    throw new Error(validationResult.errors)
  }
}
