// Get value for component with componentId
// If not found, search for component with id ${componentId}${suffix}
// in case of cloned components

export const getComponent = (componentId, suffix) => {
  let suffixes=suffix?.split('_') || []
  while (true) {
    const subCompId=`${componentId}${suffixes.join('_')}`
    const component = document.getElementById(subCompId)
    if (component) {
      return component
    }
    if (!suffixes.pop()) { break}
  }
  return

}

export const getComponentDataValue = (componentId, suffix) => {
  let suffixes=suffix?.split('_') || []
  while (true) {
    const subCompId=`${componentId}${suffixes.join('_')}`

    if (typeof window === "object") {
      const component = document && document.getElementById(subCompId)
      if (component) {
        const value=component?.value || component?.getAttribute('value') || component?.getAttribute('data-value')
        if (value!==undefined) {
          return value
        }
      }
    }
    if (!suffixes.pop()) { break}
  }
  return
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
