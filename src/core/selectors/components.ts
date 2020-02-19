import { RootState } from '../store'

export const getComponents = (state: RootState) =>
  state.components.present.components

export const getComponentBy = (nameOrId: string | IComponent['id']) => (
  state: RootState,
) => {
  return state.components.present.components[nameOrId]
}

export const getUserComponentBy = (name?: string, id?: string) => (
  state: RootState,
) => {
  if (name && id) {
    const userComponent = state.components.present.userComponents[name]

    if (userComponent.root.id === id) {
      return userComponent.root
    }

    return userComponent.components[id]
  }
}

export const getSelectedComponent = (state: RootState) =>
  state.components.present.components[state.components.present.selectedId]

export const getPropsForSelectedComponent = (
  state: RootState,
  propsName: string,
) =>
  state.components.present.components[state.components.present.selectedId]
    .props[propsName]

export const getSelectedComponentId = (state: RootState) =>
  state.components.present.selectedId

export const getIsSelectedComponent = (componentId: IComponent['id']) => (
  state: RootState,
) => state.components.present.selectedId === componentId

export const getSelectedComponentChildren = (state: RootState) => {
  return getSelectedComponent(state).children.map(child =>
    getComponentBy(child)(state),
  )
}

export const getSelectedComponentParent = (state: RootState) =>
  state.components.present.components[getSelectedComponent(state).parent]

export const getHoveredId = (state: RootState) =>
  state.components.present.hoveredId

export const getIsHovered = (id: IComponent['id']) => (state: RootState) =>
  getHoveredId(state) === id

export const getUserComponents = (state: RootState) =>
  state.components.present.userComponents

export const getComponentProp = (name: string) => (state: RootState) => {
  const component =
    state.components.present.components[state.components.present.selectedId]

  if (!component.masterComponentName) {
    return component.props[name]
  }

  const userComponent = getUserComponentBy(
    component.masterComponentName,
    component.originId,
  )(state)

  return userComponent?.props[name]
}
