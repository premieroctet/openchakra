import { createModel } from '@rematch/core'
import produce from 'immer'
import { DEFAULT_PROPS } from '../../utils/defaultProps'
import templates, { TemplateType } from '../../templates'
import { generateId } from '../../utils/generateId'
import {
  duplicateComponent,
  deleteComponent,
  saveComponents,
} from '../../utils/recursive'
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
  components: IComponents,
  customComponents: IComponents,
  id: string,
  parentId: string,
  typeOfComponent: string,
) => {
  const checkCustomComponentId = components[parentId].customComponentId
  if (checkCustomComponentId !== undefined) {
    customComponents[checkCustomComponentId].children.push(id)
    if (typeOfComponent !== 'custom') {
      customComponents = {
        ...customComponents,
        [id]: {
          ...components[id],
        },
      }
    }
  }
  return customComponents
}
const moveToCustomComponents = (
  componentToBeMoved: IComponent,
  customComponents: IComponents,
  id: string,
  parentId: string,
) => {
  if (customComponents[id] !== undefined) {
    customComponents[id].parent = parentId
  } else {
    customComponents[id] = {
      ...componentToBeMoved,
    }
  }
  customComponents[parentId].children.push(id)
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
        draftState.components[payload.id].props[payload.name] = payload.value
      })
    },
    deleteProps(state: ComponentsState, payload: { id: string; name: string }) {
      return {
        ...state,
        components: {
          ...state.components,
          [payload.id]: {
            ...state.components[payload.id],
            props: omit(state.components[payload.id].props, payload.name),
          },
        },
      }
    },
    deleteComponent(state: ComponentsState, componentId: string) {
      if (componentId === 'root') {
        return state
      }

      return produce(state, (draftState: ComponentsState) => {
        let component = draftState.components[componentId]

        // Remove self
        if (component && component.parent) {
          const children = draftState.components[
            component.parent
          ].children.filter((id: string) => id !== componentId)

          draftState.components[component.parent].children = children
        }

        draftState.selectedId = DEFAULT_ID
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
      ) {
        return state
      }

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

        //check whether the component to be moved is in custom components
        if (draftState.customComponents[previousParentId] !== undefined) {
          const children = draftState.customComponents[
            previousParentId
          ].children.filter(id => id !== payload.componentId)
          draftState.customComponents[previousParentId].children = children
        }

        //check whether the component is moved into custom components
        if (draftState.components[payload.parentId].customComponentId) {
          moveToCustomComponents(
            draftState.components[payload.componentId],
            draftState.customComponents,
            payload.componentId,
            payload.parentId,
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
        draftState.customComponents = addToCustomComponents(
          draftState.components,
          draftState.customComponents,
          id,
          draftState.components[id].parent,
          'default',
        )
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
        if (draftState.components[payload.parent].customComponentId) {
          draftState.customComponents[payload.parent].children.push(
            payload.root,
          )

          draftState.customComponents = {
            ...draftState.customComponents,
            ...payload.components,
          }
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

        if (selectedComponent.id !== DEFAULT_ID) {
          const parentElement = draftState.components[payload.parentId]

          const { newId, clonedComponents } = duplicateComponent(
            selectedComponent,
            draftState.customComponents,
          )

          draftState.components = {
            ...draftState.components,
            ...clonedComponents,
          }
          draftState.components[newId].customComponentId = payload.id
          draftState.components[parentElement.id].children.push(newId)

          addToCustomComponents(
            draftState.components,
            draftState.customComponents,
            payload.id,
            payload.parentId,
            'custom',
          )
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
        const savedComponents = saveComponents(
          componentToBeSaved,
          draftState.components,
          name,
        )
        draftState.customComponents = {
          ...draftState.customComponents,
          ...savedComponents,
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
