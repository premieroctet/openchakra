import lodash from 'lodash'

export const CONTAINER_TYPE: ComponentType[] = [
  'Box',
  'Grid',
  'SimpleGrid',
  'Flex',
  'List',
  'Accordion',
  'Container',
]
export const TEXT_TYPE: ComponentType[] = ['Text', 'Heading', 'Badge', 'ListItem']
export const ACTION_TYPE: ComponentType[] = ['Button']
export const IMAGE_TYPE: ComponentType[] = ['Image', 'Avatar']
export const PROGRESS_TYPE: ComponentType[] = ['Progress', 'CircularProgress']

export const isMultipleDispatcher = (component: IComponent):boolean => {
    return CONTAINER_TYPE.includes(component.type)
}

export const getDataProviders = (component: IComponent, components: IComponents):IComponent[]|null => {
  return Object.values(components)
    //.filter(c => !!c.props?.model || !!c.props.dataSource)
    .filter(c => !!c.props?.model)
    .filter(c => c.id != component.id)
}

const getDataProviderDataType = (component: IComponent, components: IComponents, models: any): IDataType => {
  if (component.props.model) {
    return {
      type: component.props.model,
      multiple: true,
      ref: true
    }
  }
  if (component.id=='root') {
    throw new Error('Root component has no model defined')
  }

  const parent=components[component.parent]
  let parentDataProviderType=getDataProviderDataType(parent, components, models)
  if (isMultipleDispatcher(component) && component.props.dataSource) {
    parentDataProviderType = {...parentDataProviderType, multiple: false}
  }
  if (component.props?.attribute) {
    const att=models.find((m:any) => m.name==parentDataProviderType.type).attributes[component.props?.attribute]
    return att
  }
  return parentDataProviderType
}

export const getAvailableAttributes = (component: IComponent, components: IComponents, models:any):any => {
  if (!component.props?.dataSource) {
    console.log(`No available attributes: dataSource is empty`)
    return null
  }
  const dataType=getDataProviderDataType(components[component.parent], components, models)
  const attributes=models.find((m:any) => m.name==dataType.type)?.attributes || {}
  const cardinalityAttributes=lodash.pickBy(attributes, att => att.multiple==isMultipleDispatcher(component))
  return cardinalityAttributes
}

const computeDataFieldName = (component: IComponent, components: IComponents):string => {
  if (component.props.model) {
    return null
  }
  const parentFieldName=computeDataFieldName(components[component.parent], components)
  return [parentFieldName, component.props.attribute].filter(s => !!s).join('.')
}

// Traverse down-up from components to dataprovider to join all fields
export const getFieldsForDataProvider = (dataProviderId: string, components:IComponents):string[] => {
  const linkedComponents=Object.values(components).filter(c => c.props?.dataSource==dataProviderId)

  return lodash(linkedComponents).map(c => computeDataFieldName(c, components)).filter(c => !!c).uniq()
}
