import { createModel } from '@rematch/core'
import { DEFAULT_PROPS } from '../../utils/defaultProps'
import omit from 'lodash/omit'
import { airbnbCard } from '../../theme/demo'
import { generateId } from './app'

export type ComponentsState = {
  components: IComponents
  selectedId: IComponent['id']
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
    type: 'box' as ComponentType,
    children: [],
    props: {},
  },
}

const components = createModel({
  state: {
    components: INITIAL_COMPONENTS,
    selectedId: DEFAULT_ID,
  } as ComponentsState,
  reducers: {
    reset(state: ComponentsState, components?: IComponents): ComponentsState {
      return {
        ...state,
        components: components || INITIAL_COMPONENTS,
        selectedId: DEFAULT_ID,
      }
    },
    loadDemo(state: ComponentsState): ComponentsState {
      return {
        ...state,
        selectedId: 'comp-root',
        components: airbnbCard as any,
      }
    },
    resetProps(state: ComponentsState, componentId: string): ComponentsState {
      const component = state.components[componentId]

      return {
        ...state,
        components: {
          ...state.components,
          [componentId]: {
            ...component,
            props: DEFAULT_PROPS[component.type] || {},
          },
        },
      }
    },
    updateProps(
      state: ComponentsState,
      payload: { id: string; name: string; value: string },
    ) {
      return {
        ...state,
        components: {
          ...state.components,
          [payload.id]: {
            ...state.components[payload.id],
            props: {
              ...state.components[payload.id].props,
              [payload.name]: payload.value,
            },
          },
        },
      }
    },
    deleteComponent(state: ComponentsState, componentId: string) {
      if (componentId === 'root') {
        return state
      }

      let updatedComponents = { ...state.components }
      let component = updatedComponents[componentId]

      // Remove self
      if (component && component.parent) {
        const siblings = updatedComponents[component.parent].children.filter(
          (el: string) => el !== componentId,
        )

        updatedComponents[component.parent] = {
          ...updatedComponents[component.parent],
          children: siblings,
        }
      }

      const deleteRecursive = (
        children: IComponent['children'],
        id: IComponent['id'],
      ) => {
        children.forEach(child => {
          updatedComponents[child] &&
            deleteRecursive(updatedComponents[child].children, componentId)
        })

        updatedComponents = omit(updatedComponents, id)
      }

      deleteRecursive(component.children, componentId)

      updatedComponents = omit(updatedComponents, componentId)

      return {
        ...state,
        components: updatedComponents,
        selectedId: DEFAULT_ID,
      }
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

      const children = state.components[
        state.components[payload.componentId].parent
      ].children.filter(id => id !== payload.componentId)

      const newChildren = state.components[payload.parentId].children.concat(
        payload.componentId,
      )

      return {
        ...state,
        components: {
          ...state.components,
          // Update parent id
          [payload.componentId]: {
            ...state.components[payload.componentId],
            parent: payload.parentId,
          },
          // Remove id from legacy children
          [state.components[payload.componentId].parent]: {
            ...state.components[state.components[payload.componentId].parent],
            children,
          },
          // Add in new parent children
          [payload.parentId]: {
            ...state.components[payload.parentId],
            children: newChildren,
          },
        },
      }
    },
    moveSelectedComponentChildren(
      state: ComponentsState,
      payload: { fromIndex: number; toIndex: number },
    ): ComponentsState {
      const selectedComponent = state.components[state.selectedId]
      const children = [...selectedComponent.children]

      children.splice(
        payload.toIndex,
        0,
        children.splice(payload.fromIndex, 1)[0],
      )

      return {
        ...state,
        components: {
          ...state.components,
          [selectedComponent.id]: {
            ...state.components[selectedComponent.id],
            children,
          },
        },
      }
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
      const id = payload.testId || generateId()

      return {
        ...state,
        selectedId: id,
        components: {
          ...state.components,
          [payload.parentName]: {
            ...state.components[payload.parentName],
            children: [...state.components[payload.parentName].children, id],
          },
          [id]: {
            id,
            props: DEFAULT_PROPS[payload.type] || {},
            children: [],
            type: payload.type,
            parent: payload.parentName,
            rootParentType: payload.rootParentType || payload.type,
          },
        },
      }
    },
    addMetaComponent(
      state: ComponentsState,
      payload: { components: IComponents; root: string; parent: string },
    ): ComponentsState {
      console.log(payload)
      return {
        ...state,
        selectedId: payload.root,
        components: {
          ...state.components,
          [payload.parent]: {
            ...state.components[payload.parent],
            children: [
              ...state.components[payload.parent].children,
              payload.root,
            ],
          },
          ...payload.components,
        },
      }
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
  },
})

export default components
