const checkEmptyDataProvider = (comp, icomponents) => {
  if (comp.type == 'DataProvider') {
    if (!comp.props?.model) {
      return Promise.reject(`DataProvider ${comp.id} is unlinked`)
    }
  }
}

const checkAvailabelDataProvider = (comp, icomponents) => {
  if (!!comp.props.dataSource && !(comp.props.dataSource in Object.keys(icomponents))) {
    return Promise.reject(`DataProvider ${comp.props.dataSource} not found`)
  }
}

export const validate = (icomponents: IComponents) => {
  const components = Object.values(icomponents)
  return Promise.all(components.map(c => checkEmptyDataProvider(c, icomponents)))
    .then(() => Promise.all(components.map(c => checkAvailabelDataProvider(c, icomponents))))
}
