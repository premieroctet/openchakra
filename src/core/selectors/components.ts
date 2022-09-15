import map from 'lodash/map'
import { RootState } from '~core/store'
import { ComponentsState } from '~core/models/components'

const getPresentState = (state: RootState) => {
  return state.components.present
}

const getActiveComponents = (state: RootState) => {
  const presentState = getPresentState(state)
  return presentState.pages[presentState.activePage]
}

export const getComponents = (state: RootState) => getActiveComponents(state)

export const getFullComponents = (state: RootState) => getPresentState(state)

export const getPages = (state: RootState) =>
  Object.keys(getPresentState(state).pages)

export const getComponentBy = (nameOrId: string | IComponent['id']) => (
  state: RootState,
) => getActiveComponents(state)[nameOrId]

export const getSelectedComponent = (state: RootState) =>
  getActiveComponents(state)[getPresentState(state).selectedId]

export const getPropsForSelectedComponent = (
  state: RootState,
  propsName: string,
) => getSelectedComponent(state).props[propsName]

export const getSelectedComponentId = (state: RootState) =>
  getPresentState(state).selectedId

export const getIsSelectedComponent = (componentId: IComponent['id']) => (
  state: RootState,
) => getPresentState(state).selectedId === componentId

export const getSelectedComponentChildren = (state: RootState) => {
  return getSelectedComponent(state).children.map(child =>
    getComponentBy(child)(state),
  )
}

export const getSelectedComponentParent = (state: RootState) =>
  getActiveComponents(state)[getSelectedComponent(state).parent]

export const getHoveredId = (state: RootState) =>
  getPresentState(state).hoveredId

export const getIsHovered = (id: IComponent['id']) => (state: RootState) =>
  getHoveredId(state) === id

export const getComponentNames = (state: RootState) => {
  const names = map(
    getActiveComponents(state),
    comp => comp.componentName,
  ).filter(comp => !!comp)

  return Array.from(new Set(names))
}
