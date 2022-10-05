export const getDataProviders = (component: IComponent, components: IComponent[]):IComponent[]|null => {
  return Object.values(components)
    .filter(c => !!c.props?.model || !!c.props.dataSource)
    .filter(c => c.id != component.id)
}

const getDataProviderDataType = (component: IComponent, components: IComponent[]) => {

}
