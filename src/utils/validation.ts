const checkEmptyDataProvider = comp => {
  if (comp.type == 'DataProvider' && !comp.props?.model) {
    return Promise.reject(`DataProvider ${comp.id} is unlinked`)
  }
}

export const validate = (icomponents: IComponents) => {
  const components = Object.values(icomponents)
  return Promise.all(components.map(checkEmptyDataProvider))
}
