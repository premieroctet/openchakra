import lodash from 'lodash'

export const CONTAINER_TYPE: ComponentType[] = [
  'Box',
  'Grid',
  'SimpleGrid',
  'Flex',
  'List',
  'Container',
]
export const TEXT_TYPE: ComponentType[] = [
  'Text',
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
export const INPUT_TYPE: ComponentType[] = ['Input', 'Textarea']
export const UPLOAD_TYPE: ComponentType[] = ['UploadFile']

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
])

export const allowsDataSource = (component: IComponent): boolean => {
  return ALL_DYNAMICS.includes(component.type)
}

export const isMultipleDispatcher = (component: IComponent): boolean => {
  return CONTAINER_TYPE.includes(component.type)
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
      const att = models.find(
        (m: any) => m.name === parentDataProviderType.type,
      ).attributes[component.props?.attribute]
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
  const attributes =
    models.find((m: any) => m.name === dataType?.type)?.attributes || {}
  const cardinalityAttributes = lodash.pickBy(
    attributes,
    att => att.multiple === isMultipleDispatcher(component),
  )
  return cardinalityAttributes
}

const computeDataFieldName = (
  component: IComponent,
  components: IComponents,
  dataSourceId: string,
): string | null => {
  if (
    component.props.model ||
    (component.props.dataSource && component.props.dataSource !== dataSourceId)
  ) {
    return null
  }
  const parentFieldName = computeDataFieldName(
    components[component.parent],
    components,
    dataSourceId,
  )
  const result = [parentFieldName, component.props.attribute]
    .filter(s => !!s)
    .join('.')
  return result
}

// Traverse down-up from components to dataprovider to join all fields
export const getFieldsForDataProvider = (
  dataProviderId: string,
  components: IComponents,
): string[] => {
  const isRoot = components[dataProviderId].id == 'root'

  const linkedComponents = Object.values(components).filter(
    c => c.props?.dataSource === dataProviderId,
  )

  const fields = isRoot
    ? lodash(linkedComponents)
        .map(c => computeDataFieldName(c, components, dataProviderId))
        .filter(c => !!c)
        .uniq()
        .value()
    : lodash(linkedComponents)
        .map(c => c.props.attribute)
        .uniq()
        .value()
  return fields
}
