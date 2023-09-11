import lodash from 'lodash'

export const CONTAINER_TYPE: ComponentType[] = [
  'Box',
  'Grid',
  'SimpleGrid',
  'Flex',
  'List',
  'Container',
  'AccordionPanel',
  'Tabs',
  'TabList',
  'TabPanels',
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
export const SOURCE_TYPE: ComponentType[] = ['Timer', 'Chart']
export const CHECKBOX_TYPE: ComponentType[] = ['Checkbox', 'Radio', 'Switch', 'IconCheck']
export const INPUT_TYPE: ComponentType[] = ['Lexical', 'Input', 'Textarea', 'NumberInput', 'Rating', 'NumberFormat']
export const UPLOAD_TYPE: ComponentType[] = ['UploadFile']
export const GROUP_TYPE: ComponentType[] = ['RadioGroup', 'CheckboxGroup']

const ALL_DYNAMICS = lodash.flatten([
  CONTAINER_TYPE,
  TEXT_TYPE,
  ACTION_TYPE,
  IMAGE_TYPE,
  PROGRESS_TYPE,
  DATE_TYPE,
  SELECT_TYPE,
  SOURCE_TYPE,
  CHECKBOX_TYPE,
  INPUT_TYPE,
  UPLOAD_TYPE,
  GROUP_TYPE,
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
  models: { [key: string]: any; },
): IDataType | null => {
  // This is the data provider: return the type
  if ((component.type=='DataProvider' && component.id==dataSource)
      || (component.id=='root' && dataSource=='root')) {
    const result={ type: component.props.model, multiple: true, ref: true}
    return result
  }
  if (component.id === 'root') {
    const result=getDataProviderDataType(components[dataSource], components, dataSource, models)
    return result
  }

  const parent = components[component.parent]
  let pdt = getDataProviderDataType(parent, components, dataSource, models)
  if (!pdt) {
    return null
  }
  let parentDataProviderType = { ...pdt }
  if (component.props.dataSource === dataSource) {
    if (isMultipleDispatcher(component)) {
      if (component.props?.attribute) {
        const att = models[parentDataProviderType.type].attributes[component.props?.attribute]
        parentDataProviderType = { ...att }
      }
      parentDataProviderType = { ...parentDataProviderType, multiple: false }
    }
  }
  return parentDataProviderType
}

const getComponentAttributes = (
  component: IComponent,
  components: IComponents,
  models: any,
): any => {
  if (!component.props?.dataSource && !component.props?.model) {
    return null
  }

  let model=component.props.model
  if (!model) {
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
    model=dataType?.type
  }
  const attributes = models[model]?.attributes || {}
  return attributes
}

export const getAvailableAttributes = (
  component: IComponent,
  components: IComponents,
  models: any,
): any => {
  const attributes = getComponentAttributes(component, components, models)
  const cardinalityAttributes = lodash.pickBy(
    attributes,
    att => ['RadioGroup', 'CheckboxGroup', 'Chart'].includes(component.type) || att.multiple === isMultipleDispatcher(component),
  )
  return cardinalityAttributes
}

export const getFilterAttributes = (
  component: IComponent,
  components: IComponents,
  models: any,
): any => {
  let attributes = getComponentAttributes(component, components, models)
  // For container, filter attributes are dataSource.atrtibute's attributes
  if (CONTAINER_TYPE.includes(component?.type) && component?.props.attribute) {
    const subModel=models[attributes[component.props.attribute]?.type]
    attributes=subModel.attributes
  }
  // TODO Filter subAttributes yto retain non multiple && non ref only
  const simpleAttributes=lodash.pickBy(attributes, (v,k) => !v.ref && !v.multiple)

  return simpleAttributes
}

const computeDataFieldName = (
  component: IComponent,
  components: IComponents,
  dataSourceId: string,
): any => {

  // On dataProvider: break
  // TODO: commented because returns null if Select has a model even if it has a subDataSource/subAttributeDisplay
  /**
  if (component.props.model) {
    return null
  }
  */
  // On root: break
  if (component.id=='root') {
    return null
  }
  // I have datasource(s) but different: break
  if ((component.props.dataSource && component.props.dataSource !== dataSourceId)
  && (component.props.subDataSource && component.props.subDataSource !== dataSourceId)
  ) {
    return null
  }

  let parentFieldName = computeDataFieldName(
    components[component.parent],
    components,
    dataSourceId,
  )

  if (['RadioGroup', 'CheckboxGroup'].includes(components[component.parent].type)) {
    parentFieldName = computeDataFieldName(
      components[components[component.parent].parent],
      components,
      dataSourceId,
    )
  }

  console.log(`Comp ${component.id}: parent field name ${parentFieldName}`)
  const attrs=[]
  if (component.props.dataSource==dataSourceId) {
    if (component.props.attribute) {
      attrs.push(component.props.attribute)
    }
    try {
      const actionProps=JSON.parse(component.props?.actionProps)
      if (actionProps?.url)  {
        attrs.push(actionProps.url)
      }
    }
    catch(e) {

    }
    if (component.props?.actionProps?.url) {
      attrs.push(component.props?.actionProps?.url)
      console.log(attrs)
    }
  }
  if (component.props.subDataSource==dataSourceId) {
    if (component.props.subAttribute) {
        attrs.push(`${component.props.subAttribute}.${component.props.subAttributeDisplay}`)
    }
    else {
      attrs.push(component.props.subAttributeDisplay)
    }
  }

  if (attrs.length==0) {
    return parentFieldName
  }
  const result = attrs.map(att =>
    [parentFieldName, att].filter(s => !!s).join('.')
  )


  if (!component.props.subDataSource) {
    return result[0]
  }
  return result
}

// Traverse down-up from components to dataprovider to join all fields
export const getFieldsForDataProvider = (
  dataProviderId: string,
  components: IComponents,
): string[] => {

  const linkedComponents:IComponent[] = Object.values(components).filter(
    c => c.props?.dataSource === dataProviderId || c.props?.subDataSource === dataProviderId,
  )

  const fields = lodash(linkedComponents)
      .map(c => computeDataFieldName(c, components, dataProviderId))
      .flatten()
      .filter(c => !!c)
      .uniq()
      .value()

  return fields
}

export const getParentOfType = (components:IComponents, comp: IComponent, type: ComponentType): IComponent | null => {
  if (comp.type==type) {
    return comp
  }
  if (comp.id!='root') {
    return getParentOfType(components, components[comp.parent], type)
  }
  return null
}

export const hasParentType = (comp: IComponent, comps: IComponents, type: ComponentType) => {
  return !!getParentOfType(comps, comp, type)
}
