import lodash from 'lodash'

export const CONTAINER_TYPE: ComponentType[] = [
  'Box',
  'Grid',
  'SimpleGrid',
  'Flex',
  'List',
  'Container',
  'AccordionPanel'
]
export const TEXT_TYPE: ComponentType[] = [
  'Text',
  'NumberFormat',
  'Heading',
  'Badge',
  'ListItem',
]
export const ACTION_TYPE: ComponentType[] = ['Button', 'IconButton']
export const IMAGE_TYPE: ComponentType[] = ['Image', 'Avatar', 'Media']
export const PROGRESS_TYPE: ComponentType[] = ['Progress', 'CircularProgress']
export const DATE_TYPE: ComponentType[] = ['Date']
export const SELECT_TYPE: ComponentType[] = ['Select']
export const SOURCE_TYPE: ComponentType[] = ['Timer']
export const CHECKBOX_TYPE: ComponentType[] = ['Checkbox']
export const INPUT_TYPE: ComponentType[] = ['Input', 'Textarea', 'NumberInput']
export const UPLOAD_TYPE: ComponentType[] = ['UploadFile']
export const ENUM_TYPE: ComponentType[] = ['RadioGroup']
//export const ENUM_TYPE: ComponentType[] = ['RadioGroup','Select']

const ALL_DYNAMICS = lodash.flatten([
  CONTAINER_TYPE,
  TEXT_TYPE,
  ACTION_TYPE,
  IMAGE_TYPE,
  PROGRESS_TYPE,
  DATE_TYPE,
  SELECT_TYPE,
  CHECKBOX_TYPE,
  INPUT_TYPE,
  UPLOAD_TYPE,
  ENUM_TYPE,
])

export const allowsDataSource = (component: IComponent): boolean => {
  return ALL_DYNAMICS.includes(component.type)
}

export const isMultipleDispatcher = (component: IComponent): boolean => {
  return CONTAINER_TYPE.includes(component.type)
}

export const isSingleDataPage = (components: IComponents): boolean => {
  return components?.root?.props?.cardinality=='single'
}

export const getComponentsHierarchy = (
  component: IComponent,
  components: IComponents,
): IComponent[] => {
  if (component.parent === component.id) {
    return [component]
  }
  return [
    component,
    ...getComponentsHierarchy(components[component.parent], components),
  ]
}

export const getDataProviders = (
  component: IComponent,
  components: IComponents,
): IComponent[] => {
  return (
    Object.values(components)
      //.filter(c => !!c.props?.model || !!c.props.dataSource)
      //.filter(c => !!c.props?.model)
      .filter(c => c.type === 'DataProvider' || c.id === 'root')
      .filter(c => c.id !== component.id)
  )
}

export const getDataProviderDataType = (
  component: IComponent,
  components: IComponents,
  dataSource: string,
  models: any,
): IDataType | null => {
  if (
    component.props.model &&
    (component.props.dataSource === dataSource ||
      (dataSource == 'root' && component.id == 'root'))
  ) {
    return {
      type: component.props.model,
      multiple: true,
      ref: true,
    }
  }
  if (component.id === 'root') {
    if (dataSource!='root') {
      const model=components[dataSource].props.model
      return {
        type: model,
        multiple: true,
        ref: true,
      }
    }
    // Search dataProviders
    return null
  }

  const parent = components[component.parent]
  let pdt = getDataProviderDataType(parent, components, dataSource, models)
  if (!pdt) {
    return null
  }
  let parentDataProviderType = { ...pdt }
  if (component.props.dataSource === dataSource) {
    if (component.props?.attribute) {
      const att = models[parentDataProviderType.type].attributes[component.props?.attribute]
      parentDataProviderType = { ...att }
    }
    if (isMultipleDispatcher(component)) {
      parentDataProviderType = { ...parentDataProviderType, multiple: false }
    }
  }
  return parentDataProviderType
}

export const getAvailableAttributes = (
  component: IComponent,
  components: IComponents,
  models: any,
): any => {
  if (!component.props?.dataSource) {
    return null
  }
  let dataType = getDataProviderDataType(
    components[component.parent],
    components,
    component.props.dataSource,
    models,
  )
  // NOt fund in parent: direct dataprovider
  if (!dataType) {
    const dsComponent = components[component.props.dataSource]
    if (!dsComponent) {
      throw new Error(
        `DataProvider ${component.props.dataSource} referenced by ${component.id} (type ${component.type}) is missing`,
      )
    }
    dataType = {
      type: dsComponent.props.model,
      multiple: true,
      ref: true,
    }
  }
  const attributes = models[dataType?.type]?.attributes || {}
  const cardinalityAttributes = lodash.pickBy(
    attributes,
    att => att.multiple === isMultipleDispatcher(component),
  )

  return cardinalityAttributes
}

export const getFilterAttributes = (
  component: IComponent,
  components: IComponents,
  models: any,
): any => {
  if (!component.props?.dataSource) {
    return null
  }
  let dataType = getDataProviderDataType(
    components[component.parent],
    components,
    component.props.dataSource,
    models,
  )
  // NOt fund in parent: direct dataprovider
  if (!dataType) {
    const dsComponent = components[component.props.dataSource]
    if (!dsComponent) {
      throw new Error(
        `DataProvider ${component.props.dataSource} referenced by ${component.id} (type ${component.type}) is missing`,
      )
    }
    dataType = {
      type: dsComponent.props.model,
      multiple: true,
      ref: true,
    }
  }
  const attributes = models[dataType?.type]?.attributes || {}
  const simpleAttributes=lodash.pickBy(attributes, (v,k) => !v.ref && !v.multiple && !k.includes('.'))

  return simpleAttributes
}

const computeDataFieldName = (
  component: IComponent,
  components: IComponents,
  dataSourceId: string,
): string | null => {
  if (
    component.props.model ||
    (component.props.dataSource && component.props.dataSource !== dataSourceId && component.props.subDataSource !== dataSourceId)
  ) {
    return null
  }
  const parentFieldName = computeDataFieldName(
    components[component.parent],
    components,
    dataSourceId,
  )

  const attr=component.props.dataSource==dataSourceId ?
    component.props.attribute:component.props.subAttribute
  const result = [parentFieldName, attr]
    .filter(s => !!s)
    .join('.')
  return result
}

// Traverse down-up from components to dataprovider to join all fields
export const getFieldsForDataProvider = (
  dataProviderId: string,
  components: IComponents,
): string[] => {
  const linkedComponents = Object.values(components).filter(
    c => c.props?.dataSource === dataProviderId || c.props?.subDataSource === dataProviderId,
  )

  if (/LCHOOZGC737SX/.test(dataProviderId)) {
    console.log(`Components for ${dataProviderId}:${linkedComponents.map(c => c.id)}`)
  }

  const fields = lodash(linkedComponents)
      .map(c => computeDataFieldName(c, components, dataProviderId))
      .filter(c => !!c)
      .uniq()
      .value()

  if (/LCHOOZGC737SX/.test(dataProviderId)) {
    console.log(`Fields for ${dataProviderId}:${fields}`)
  }

  return fields
}
