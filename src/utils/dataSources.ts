import lodash from 'lodash'

export const CONTAINER_TYPE: ComponentType[] = [
  'Box',
  'Grid',
  'SimpleGrid',
  'Flex',
  'List',
  'Container',
]
export const TEXT_TYPE: ComponentType[] = ['Text', 'Heading', 'Badge', 'ListItem']
export const ACTION_TYPE: ComponentType[] = ['Button']
export const IMAGE_TYPE: ComponentType[] = ['Image', 'Avatar', 'Media']
export const PROGRESS_TYPE: ComponentType[] = ['Progress', 'CircularProgress']
export const DATE_TYPE: ComponentType[] = ['Date']
export const SELECT_TYPE: ComponentType[] = ['Select']

const ALL_DYNAMICS=lodash.flatten([
  CONTAINER_TYPE, TEXT_TYPE, ACTION_TYPE, IMAGE_TYPE, PROGRESS_TYPE,
  DATE_TYPE, SELECT_TYPE
])

export const allowsDataSource = (component: IComponent): boolean => {
  return ALL_DYNAMICS.includes(component.type)
}

export const isMultipleDispatcher = (component: IComponent):boolean => {
    return CONTAINER_TYPE.includes(component.type)
}

export const getDataProviders = (component: IComponent, components: IComponents):IComponent[]|null => {
  return Object.values(components)
    //.filter(c => !!c.props?.model || !!c.props.dataSource)
    //.filter(c => !!c.props?.model)
    .filter(c => c.type=='DataProvider' || c.id=='root')
    .filter(c => c.id != component.id)
}

const getDataProviderDataType = (component: IComponent, components: IComponents, dataSource:string, models: any): IDataType => {
  if (component.props.model && component.props.dataSource==dataSource) {
    return {
      type: component.props.model,
      multiple: true,
      ref: true
    }
  }
  if (component.id=='root') {
    // Search dataProviders
    const dp=components[dataSource]
    if (dp) {
      return {
        type: dp.props.model,
        multiple: true,
        ref: true
      }
    }
    throw new Error('Root component has no model defined')
  }

  const parent=components[component.parent]
  let parentDataProviderType={...getDataProviderDataType(parent, components, dataSource, models)}
  if (component.props.dataSource==dataSource) {
    if (component.props?.attribute) {
      const att=models.find((m:any) => m.name==parentDataProviderType.type).attributes[component.props?.attribute]
      parentDataProviderType={...att}
    }
    if (isMultipleDispatcher(component)) {
      parentDataProviderType={...parentDataProviderType, multiple: false}
    }
  }
  return parentDataProviderType
}

export const getAvailableAttributes = (component: IComponent, components: IComponents, models:any):any => {
  if (!component.props?.dataSource) {
    return null
  }
  const dataType=getDataProviderDataType(components[component.parent], components, component.props.dataSource, models)
  const attributes=models.find((m:any) => m.name==dataType.type)?.attributes || {}
  const cardinalityAttributes=lodash.pickBy(attributes, att => att.multiple==isMultipleDispatcher(component))
  return cardinalityAttributes
}

const computeDataFieldName = (component: IComponent, components: IComponents, dataSourceId:string):string => {
  if (component.props.model || (component.props.dataSource && component.props.dataSource!=dataSourceId)) {
    return null
  }
  const parentFieldName=computeDataFieldName(components[component.parent], components, dataSourceId)
  const result=[parentFieldName, component.props.attribute].filter(s => !!s).join('.')
  return result
}

// Traverse down-up from components to dataprovider to join all fields
export const getFieldsForDataProvider = (dataProviderId: string, components:IComponents):string[] => {
  const linkedComponents=Object.values(components).filter(c => c.props?.dataSource==dataProviderId)
  return lodash(linkedComponents).map(c => computeDataFieldName(c, components, dataProviderId)).filter(c => !!c).uniq()
}
