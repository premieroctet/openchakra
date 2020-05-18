import { createModel } from '@rematch/core'
import produce from 'immer'
import { DEFAULT_PROPS } from '../../utils/defaultProps'
import templates, { TemplateType } from '../../templates'
import { generateId } from '../../utils/generateId'
import { duplicateComponent, deleteComponent } from '../../utils/recursive'
import omit from 'lodash/omit'

export type ComponentsState = {
  components: IComponents
  selectedId: IComponent['id']
  hoveredId?: IComponent['id']
  customComponents: IComponents
}
export type ComponentsStateWithUndo = {
  past: ComponentsState[]
  present: ComponentsState
  future: ComponentsState[]
}

const DEFAULT_ID = 'root'

export const INITIAL_COMPONENTS: IComponents = {
  root: {
    id: DEFAULT_ID,
    parent: DEFAULT_ID,
    type: 'Box' as ComponentType,
    children: [],
    props: {},
  },
}
const addToCustomComponents = (
  customComponents: IComponents,
  id: string,
  customComponentId: string,
) => customComponents[customComponentId].children.push(id)

const moveToCustomComponents = (
  customComponents: IComponents,
  id: string,
  parentId: string,
  customId?: string,
) => {
  if (customComponents[id] !== undefined) customComponents[id].parent = parentId

  customId && customComponents[customId].children.push(id)
}

const addChildrenToAllInstances = (
  components: IComponents,
  parentId: string,
  id: string,
) => {
  Object.values(components).forEach(component => {
    //check for instances of custom component and also not to add in already added parent
    if (
      component.customComponentId === components[parentId].customComponentId &&
      component.id !== parentId
    )
      component.children.push(id)
  })
}

const removeChildrenFromAllInstances = (
  components: IComponents,
  parentId: string,
  children: string[],
) => {
  Object.values(components).forEach(component => {
    if (
      component.customComponentId === components[parentId].customComponentId &&
      component.id !== parentId
    )
      component.children = children
  })
}

const deleteComp = (
  components: IComponents,
  componentId: string,
  parentId: string,
  updateAllInstances?: boolean,
) => {
  const children = components[parentId].children.filter(
    (id: string) => id !== componentId,
  )

  components[parentId].children = children

  if (updateAllInstances && components[parentId].customComponentId)
    removeChildrenFromAllInstances(components, parentId, children)
}

const components = createModel({
  state: {
    components: INITIAL_COMPONENTS,
    selectedId: DEFAULT_ID,
    customComponents: INITIAL_COMPONENTS,
  } as ComponentsState,
  reducers: {
    reset(state: ComponentsState, components?: IComponents): ComponentsState {
      return {
        ...state,
        components: components || INITIAL_COMPONENTS,
        selectedId: DEFAULT_ID,
      }
    },
    loadDemo(state: ComponentsState, type: TemplateType): ComponentsState {
      return {
        ...state,
        selectedId: 'comp-root',
        components: templates[type],
      }
    },
    resetProps(state: ComponentsState, componentId: string): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const component = draftState.components[componentId]

        draftState.components[componentId].props =
          DEFAULT_PROPS[component.type] || {}
      })
    },
    updateProps(
      state: ComponentsState,
      payload: { id: string; name: string; value: string },
    ) {
      return produce(state, (draftState: ComponentsState) => {
        const customComponentId =
          draftState.components[payload.id].customComponentId
        if (customComponentId !== undefined) {
          draftState.customComponents[customComponentId].props[payload.name] =
            payload.value
          Object.values(draftState.components).forEach(component =>
            component.customComponentId === customComponentId
              ? (component.props[payload.name] = payload.value)
              : component,
          )
        } else
          draftState.components[payload.id].props[payload.name] = payload.value
      })
    },
    deleteProps(state: ComponentsState, payload: { id: string; name: string }) {
      return produce(state, (draftState: ComponentsState) => {
        const customComponentId =
          draftState.components[payload.id].customComponentId
        if (customComponentId !== undefined) {
          draftState.customComponents[customComponentId].props = omit(
            draftState.components[payload.id].props,
            payload.name,
          )
          Object.values(draftState.components).forEach(component =>
            component.customComponentId === customComponentId
              ? (component.props = omit(
                  draftState.components[payload.id].props,
                  payload.name,
                ))
              : component,
          )
        } else
          draftState.components[payload.id].props = omit(
            draftState.components[payload.id].props,
            payload.name,
          )
      })
    },
    deleteComponent(state: ComponentsState, componentId: string) {
      if (componentId === 'root') {
        return state
      }

      return produce(state, (draftState: ComponentsState) => {
        let component = draftState.components[componentId]

        if (component && component.parent) {
          deleteComp(draftState.components, componentId, component.parent, true)

          draftState.customComponents[componentId] !== undefined &&
            deleteComp(
              draftState.customComponents,
              componentId,
              draftState.customComponents[componentId].parent,
            )
        }

        draftState.selectedId = DEFAULT_ID
        if (component.customComponentId)
          delete draftState.components[componentId]
        else
          draftState.components = deleteComponent(
            component,
            draftState.components,
          )
      })
    },
    moveComponent(
      state: ComponentsState,
      payload: { parentId: string; componentId: string },
    ): ComponentsState {
      if (
        state.components[payload.componentId].parent === payload.parentId ||
        payload.parentId === payload.componentId
      )
        return state

      return produce(state, (draftState: ComponentsState) => {
        const previousParentId =
          draftState.components[payload.componentId].parent

        const children = draftState.components[
          previousParentId
        ].children.filter(id => id !== payload.componentId)

        // Remove id from previous parent
        draftState.components[previousParentId].children = children

        // Update parent id
        draftState.components[payload.componentId].parent = payload.parentId

        // Add new child
        draftState.components[payload.parentId].children.push(
          payload.componentId,
        )
        draftState.components[payload.parentId].customComponentId &&
          addChildrenToAllInstances(
            draftState.components,
            payload.parentId,
            payload.componentId,
          )

        //check whether the component to be moved is in custom components
        if (draftState.customComponents[previousParentId] !== undefined) {
          const customComponentChildren = draftState.customComponents[
            previousParentId
          ].children.filter(id => id !== payload.componentId)
          draftState.customComponents[
            previousParentId
          ].children = customComponentChildren
        }

        const customId =
          draftState.components[previousParentId].customComponentId
        customId &&
          removeChildrenFromAllInstances(
            draftState.components,
            previousParentId,
            children,
          )

        //check whether the component is moved into custom components
        if (draftState.components[payload.parentId].customComponentId) {
          moveToCustomComponents(
            draftState.customComponents,
            payload.componentId,
            payload.parentId,
            draftState.components[payload.parentId].customComponentId,
          )
        }
      })
    },
    moveSelectedComponentChildren(
      state: ComponentsState,
      payload: { fromIndex: number; toIndex: number },
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const selectedComponent = draftState.components[draftState.selectedId]

        selectedComponent.children.splice(
          payload.toIndex,
          0,
          selectedComponent.children.splice(payload.fromIndex, 1)[0],
        )
      })
    },
    addComponent(
      state: ComponentsState,
      payload: {
        parentName: string
        type: ComponentType
        rootParentType?: ComponentType
        testId?: string
      },
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const id = payload.testId || generateId()
        const customComponentId =
          draftState.components[payload.parentName].customComponentId
        draftState.selectedId = id
        draftState.components[payload.parentName].children.push(id)
        draftState.components[id] = {
          id,
          props: DEFAULT_PROPS[payload.type] || {},
          children: [],
          type: payload.type,
          parent: payload.parentName,
          rootParentType: payload.rootParentType || payload.type,
        }
        if (customComponentId) {
          addToCustomComponents(
            draftState.customComponents,
            id,
            customComponentId,
          )

          addChildrenToAllInstances(
            draftState.components,
            payload.parentName,
            id,
          )
        }
      })
    },
    addMetaComponent(
      state: ComponentsState,
      payload: { components: IComponents; root: string; parent: string },
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        draftState.selectedId = payload.root
        draftState.components[payload.parent].children.push(payload.root)

        draftState.components = {
          ...draftState.components,
          ...payload.components,
        }
        const customComponentId =
          draftState.components[payload.parent].customComponentId
        if (customComponentId) {
          addToCustomComponents(
            draftState.customComponents,
            payload.root,
            customComponentId,
          )
          addChildrenToAllInstances(
            draftState.components,
            payload.parent,
            payload.root,
          )
        }
      })
    },
    addCustomComponent(
      state: ComponentsState,
      payload: {
        id: string
        parentId: string
      },
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const selectedComponent = draftState.customComponents[payload.id]
        const newId = generateId()
        const customComponentId =
          draftState.components[payload.parentId].customComponentId

        if (selectedComponent.id !== DEFAULT_ID) {
          draftState.components = {
            ...draftState.components,
            [newId]: {
              ...{
                ...selectedComponent,
                id: newId,
              },
            },
          }
          draftState.components[payload.parentId].children.push(newId)
          if (customComponentId) {
            addToCustomComponents(
              draftState.customComponents,
              payload.id,
              customComponentId,
            )

            addChildrenToAllInstances(
              draftState.components,
              payload.parentId,
              newId,
            )
          }
        }
      })
    },
    select(
      state: ComponentsState,
      selectedId: IComponent['id'],
    ): ComponentsState {
      return {
        ...state,
        selectedId,
      }
    },
    unselect(state: ComponentsState): ComponentsState {
      return {
        ...state,
        selectedId: DEFAULT_ID,
      }
    },
    selectParent(state: ComponentsState): ComponentsState {
      const selectedComponent = state.components[state.selectedId]

      return {
        ...state,
        selectedId: state.components[selectedComponent.parent].id,
      }
    },
    duplicate(state: ComponentsState): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const selectedComponent = draftState.components[draftState.selectedId]

        if (selectedComponent.id !== DEFAULT_ID) {
          const parentElement = draftState.components[selectedComponent.parent]

          const { newId, clonedComponents } = duplicateComponent(
            selectedComponent,
            draftState.components,
          )

          draftState.components = {
            ...draftState.components,
            ...clonedComponents,
          }
          draftState.components[parentElement.id].children.push(newId)
        }
      })
    },
    saveComponent(state: ComponentsState, name: string): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const componentToBeSaved = draftState.components[draftState.selectedId]

        draftState.customComponents = {
          ...draftState.customComponents,
          [componentToBeSaved.id]: {
            name: name,
            ...componentToBeSaved,
          },
        }

        draftState.components[draftState.selectedId].customComponentId =
          draftState.selectedId //To look after the selectedId for the customComponents
        draftState.customComponents[draftState.selectedId].customComponentId =
          draftState.selectedId
      })
    },
    hover(
      state: ComponentsState,
      componentId: IComponent['id'],
    ): ComponentsState {
      return {
        ...state,
        hoveredId: componentId,
      }
    },
    unhover(state: ComponentsState): ComponentsState {
      return {
        ...state,
        hoveredId: undefined,
      }
    },
  },
})

export default components
