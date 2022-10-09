import { CONTAINER_TYPE } from './dataSources';

import lodash from 'lodash'
const projectSchema=require('./projectSchema.json')
var Validator = require('jsonschema').Validator

const checkEmptyDataAttribute = (comp: IComponent, icomponents: IComponents) => {
  if (!CONTAINER_TYPE.includes(comp.type)
  && comp.props.dataSource
  && !comp.props.attribute) {
    throw new Error(`Datasource attribute is not set`)
  }
}

const checkEmptyDataProvider = (comp: IComponent, icomponents: IComponents) => {
  if (comp.type == 'DataProvider') {
    if (!comp.props?.model) {
      throw new Error(`DataProvider has no model`)
    }
  }
}

const checkDispatcherManyChildren = (comp: IComponent, icomponents: IComponents) => {
  const parent=icomponents[comp.parent]
  if (CONTAINER_TYPE.includes(parent.type)
  && parent.props.dataSource
  && parent.children.slice(1).includes(comp.id)) {
      throw new Error(`Extra child ${comp.type} of dynamic ${parent.type} will not appear at runtime`)
    }
}

const checkEmptyIcons = (comp: IComponent, icomponents: IComponents) => {
  const ICON_PROPS = ['leftIcon', 'rightIcon', 'icon']
  return ICON_PROPS.map(i => {
    if (comp?.props?.[i] == 'Icon') {
      throw new Error(`Icon ${comp.id} is not defined`)
    }
  })
}

const checkAvailableDataProvider = (comp: IComponent, icomponents: IComponents) => {
  if (!comp.props?.dataSource) {
    return
  }
  if (!Object.keys(icomponents).includes(comp.props.dataSource)) {
    throw new Error(`DataProvider ${comp.props.dataSource} not found`)
  }
}

const checkUnlinkedDataProvider = (comp: IComponent, icomponents: IComponents) => {
  if (!comp.props?.dataSource) {
    return
  }
  const dp=icomponents[comp.props.dataSource]
  if (!dp.props.model) {
    throw new Error(`DataSource ${comp.props.dataSource} has not model`)
  }
}

export const validate = (icomponents: IComponents):IWarning[] => {
  const components = Object.values(icomponents)
  const warnings=lodash([checkEmptyDataProvider, checkAvailableDataProvider,
    checkEmptyIcons, checkDispatcherManyChildren, checkEmptyDataAttribute,
    checkUnlinkedDataProvider])
    .map(v => {
      return components
      .map(c => {
        try {
          v(c, icomponents)
        }
        catch(err) {
          return ({component: c, message: err.message})
        }
      })}
    )
    .flatten()
    .filter(c => !!c)
    .value()
    return warnings
}

export const validateJSON = (jsonObject: object) => {
  const validator = new Validator()
  const validationResult= validator.validate(jsonObject, projectSchema)
  if (!validationResult.valid) {
    throw new Error(validationResult.errors)
  }
}
