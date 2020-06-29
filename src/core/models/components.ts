import { createModel } from '@rematch/core'
import produce from 'immer'
import { DEFAULT_PROPS } from '../../utils/defaultProps'
import templates, { TemplateType } from '../../templates'
import { generateId } from '../../utils/generateId'
import {
  duplicateComponent,
  deleteComponent,
  detachUserComponent,
} from '../../utils/recursive'
import omit from 'lodash/omit'
import each from 'lodash/each'

export type ComponentsState = {
  components: IComponents
  selectedId: IComponent['id']
  hoveredId?: IComponent['id']
  userComponentIds: string[]
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

const components = createModel({
  state: {
    components: INITIAL_COMPONENTS,
    selectedId: DEFAULT_ID,
    userComponentIds: [],
  } as ComponentsState,
  reducers: {
    reset(state: ComponentsState, components?: IComponents): ComponentsState {
      return {
        ...state,
        components: components || INITIAL_COMPONENTS,
        selectedId: DEFAULT_ID,
        userComponentIds: [],
      }
    },
    resetUserComponents(
      state: ComponentsState,
      userComponentIds: string[],
    ): ComponentsState {
      return {
        ...state,
        userComponentIds,
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
    saveUserComponent(
      state: ComponentsState,
      payload: { name: string; componentId: string },
    ): ComponentsState {
      const { componentId, name } = payload
      if (componentId === 'root') {
        return state
      }

      return produce(state, (draftState: ComponentsState) => {
        let component = draftState.components[componentId]
        component.userComponentName = name
        draftState.userComponentIds.push(componentId)
      })
    },
    addUserComponent(
      state: ComponentsState,
      payload: {
        type: ComponentType
        parentName: string
        instanceOf: string
      },
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const id = generateId()

        draftState.selectedId = id
        draftState.components[payload.parentName].children.push(id)
        draftState.components[id] = {
          id,
          props: {},
          children: [],
          type: payload.type,
          parent: payload.parentName,
          instanceOf: payload.instanceOf,
        }
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

        if (component.instanceOf) {
          each(draftState.components, comp => {
            if (comp.parent === component.id && component.instanceOf) {
              comp.parent = component.instanceOf
            }
          })
        }

        // Remove self
        if (component && component.parent) {
          let parent = draftState.components[component.parent]

          if (parent.instanceOf) {
            parent = draftState.components[parent.instanceOf]
          }

          const children = parent.children.filter(
            (id: string) => id !== componentId,
          )

          parent.children = children
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
      })
    },
    moveSelectedComponentChildren(
      state: ComponentsState,
      payload: { fromIndex: number; toIndex: number },
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const selectedComponent = draftState.components[draftState.selectedId]
        let component = selectedComponent
        if (selectedComponent.instanceOf) {
          component = draftState.components[selectedComponent.instanceOf]
        }

        component.children.splice(
          payload.toIndex,
          0,
          component.children.splice(payload.fromIndex, 1)[0],
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
        const parent = draftState.components[payload.parentName]
        const id = payload.testId || generateId()
        draftState.selectedId = id
        draftState.components[
          parent.instanceOf || payload.parentName
        ].children.push(id)
        draftState.components[id] = {
          id,
          props: DEFAULT_PROPS[payload.type] || {},
          children: [],
          type: payload.type,
          parent: payload.parentName,
          rootParentType: payload.rootParentType || payload.type,
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
    detachUserComponent(state: ComponentsState): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const selectedComponent = draftState.components[draftState.selectedId]
        const newId = detachUserComponent(
          selectedComponent,
          draftState.components,
        )
        draftState.selectedId = newId
      })
    },
    removeUserComponent(
      state: ComponentsState,
      userComponentId: string,
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const masterComponent = draftState.components[userComponentId]
        const instances = Object.values(draftState.components).filter(
          comp => comp.instanceOf === masterComponent.id,
        )

        instances.forEach(instance => {
          detachUserComponent(instance, draftState.components)
        })
        masterComponent.userComponentName = undefined
        draftState.userComponentIds = draftState.userComponentIds.filter(
          id => id !== userComponentId,
        )

        draftState.selectedId = DEFAULT_ID
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
