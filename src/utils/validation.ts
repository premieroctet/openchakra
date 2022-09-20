const checkEmptyDataProvider = (comp, icomponents) => {
  if (comp.type == 'DataProvider') {
    if (!comp.props ?.model) {
      return Promise.reject(`DataProvider ${comp.id} is unlinked`)
    }
  }
}

const checkAvailableDataProvider = (comp, icomponents) => {
  if (!comp.props ?.dataSource) {
    return
  }
  if (!Object.keys(icomponents).includes(comp.props.dataSource)) {
    return Promise.reject(`DataProvider ${comp.props.dataSource} not found`)
  }
}

export const validate = (icomponents: IComponents) => {
  const components = Object.values(icomponents)
  return Promise.all(components.map(c => checkEmptyDataProvider(c, icomponents)))
    .then(() => Promise.all(components.map(c => checkAvailableDataProvider(c, icomponents))))
}
