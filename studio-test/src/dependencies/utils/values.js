// Get value for component with componentId
// If not found, search for component with id ${componentId}${suffix}
// in case of cloned components

export const getComponent = (componentId, suffix) => {
  let component = document.getElementById(componentId)
  if (!component) {
    component = document.getElementById(`${componentId}${suffix}`)
  }
  return component
}

export const getComponentDataValue = (componentId, suffix) => {
  let component = document.getElementById(componentId)
  if (!(component?.value || component?.getAttribute('value') || component?.getAttribute('data-value'))) {
    component = document.getElementById(`${componentId}${suffix}`)
  }
  return component?.value || component?.getAttribute('value') || component?.getAttribute('data-value')
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
