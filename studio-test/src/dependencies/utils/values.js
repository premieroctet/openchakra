// Get value for component with componentId
// If not found, search for component with id ${componentId}${suffix}
// in case of cloned components
export const getComponentDataValue = (componentId, suffix) => {
  let component = document.getElementById(componentId)
  if (!component?.value) {
    component = document.getElementById(`${componentId}${suffix}`)
  }
  return component?.value
}

export const clearComponentValue = (componentId, suffix) => {
  let component = document.getElementById(componentId)
  if (!component) {
    component = document.getElementById(`${componentId}${suffix}`)
  }
  if (component) {
    component.value = ''
  }
}
