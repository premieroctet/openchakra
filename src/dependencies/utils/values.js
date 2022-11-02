export const getComponentDataValue = componentId => {
  const component = document.getElementById(componentId)
  return component?.value
}
