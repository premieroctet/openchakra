export const getComponentDataValue = componentId => {
  const component = document.getElementById(componentId)
  return component?.value
}

export const clearComponentValue = componentId => {
  const component = document.getElementById(componentId)
  if (component) {
    component.value = ''
  }
}
