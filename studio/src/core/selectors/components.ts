import map from 'lodash/map'

import { ProjectState, PageState } from '~core/models/project'
import { RootState } from '~core/store'

import { validateComponents, validateComponent } from '../../utils/validation';

const getPresentState = (state: RootState): ProjectState => {
  return state.project.present
}

const getActiveComponents = (state: RootState): IComponents => {
  const components = getActivePage(state).components
  return components
}

export const getComponents = (state: RootState): IComponents =>
  getActiveComponents(state)

export const getFullComponents = (state: RootState): ProjectState =>
  getPresentState(state)

export const getPages = (state: RootState) =>
  getPresentState(state).pages

export const getActivePage = (state: RootState): PageState => {
  return getPresentState(state).pages[getPresentState(state).activePage]
}

export const getActivePageId = (state: RootState) =>
  getActivePage(state).pageId

export const getActivePageName = (state: RootState) =>
  getActivePage(state)?.pageName

export const getRootPageId = (state: RootState) =>
  getPresentState(state).rootPage

export const getComponentBy = (nameOrId: string | IComponent['id']) => (
  state: RootState,
) => getActiveComponents(state)[nameOrId]

export const getSelectedComponent = (state: RootState):IComponent => {
  return getActiveComponents(state)[getActivePage(state).selectedId]
}

export const getPropsForSelectedComponent = (
  state: RootState,
  propsName: string,
) => getSelectedComponent(state).props[propsName]

export const getSelectedComponentId = (state: RootState) =>
  getActivePage(state).selectedId

export const getIsSelectedComponent = (componentId: IComponent['id']) => (
  state: RootState,
) => getSelectedComponentId(state) === componentId

export const getSelectedComponentChildren = (state: RootState) => {
  return getSelectedComponent(state).children.map(child =>
    getComponentBy(child)(state),
  )
}

export const getSelectedComponentParent = (state: RootState) =>
  getActiveComponents(state)[getSelectedComponent(state).parent]

export const getHoveredId = (state: RootState) => getActivePage(state).hoveredId

export const getIsHovered = (id: IComponent['id']) => (state: RootState) =>
  getHoveredId(state) === id

export const getComponentNames = (state: RootState) => {
  const names = map(
    getActiveComponents(state),
    comp => comp.componentName,
  ).filter(comp => !!comp)

  return Array.from(new Set(names))
}

export const getComponentWarnings = (component: IComponent) => (state: RootState):IWarning[] => {
  if (!component) {
    return []
  }
  const pageId=getActivePageId(state)
  const pageName=getActivePageName(state)
  const components=getActiveComponents(state)
  const warnings=validateComponent(component, components)
  .map(warn => ({...warn, pageId, pageName}))
  return warnings
}

export const getWarnings = (state: RootState):IWarning[] => {
  const pageId=getActivePageId(state)
  const pageName=getActivePageName(state)
  const warnings=validateComponents(getActiveComponents(state))
  .map(c => ({...c, pageId, pageName}))
  return warnings
}
