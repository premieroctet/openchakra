import { createModel } from '@rematch/core'
import { DEFAULT_PROPS } from '../../utils/defaultProps'
import omit from 'lodash/omit'
import { airbnbCard } from '../../theme/demo'

type Overlay = undefined | { rect: DOMRect; name: string; type: ComponentType }
type AppState = {
  showLayout: boolean
  showCode: boolean
  components: IComponents
  selectedId: string
  overlay: undefined | Overlay
}

export type AppStateWithUndo = {
  past: AppState[]
  present: AppState
  future: AppState[]
}

const INITIAL_COMPONENTS = {
  root: {
    id: 'root',
    parent: 'root',
    type: 'box' as ComponentType,
    children: [],
    props: {},
  },
}

const app = createModel({
  state: {
    showLayout: true,
    showCode: false,
    selectedId: INITIAL_COMPONENTS.root.id,
    components: INITIAL_COMPONENTS,
    overlay: undefined,
  } as AppState,
  reducers: {
    toggleBuilderMode(state: AppState): AppState {
      return {
        ...state,
        showLayout: !state.showLayout,
      }
    },
    toggleCodePanel(state: AppState): AppState {
      return {
        ...state,
        showCode: !state.showCode,
      }
    },
    setSelectedId(state: AppState, selectedId: string): AppState {
      return {
        ...state,
        selectedId,
      }
    },
    reset(state: AppState): AppState {
      return {
        ...state,
        components: INITIAL_COMPONENTS,
        selectedId: INITIAL_COMPONENTS.root.id,
      }
    },
    loadDemo(state: AppState): AppState {
      return {
        ...state,
        components: airbnbCard as any,
      }
    },
    setOverlay(state: AppState, overlay: Overlay | undefined): AppState {
      return {
        ...state,
        overlay,
      }
    },
    resetProps(state: AppState, componentId: string): AppState {
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
      state: AppState,
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
    deleteComponent(state: AppState, componentId: string) {
      let updatedComponents = { ...state.components }
      let component = updatedComponents[componentId]

      if (component && component.parent) {
        const children = updatedComponents[component.parent].children.filter(
          (el: string) => el !== component.id,
        )

        updatedComponents[component.parent].children = children
      }

      updatedComponents = omit(state.components, component.id)

      return {
        ...state,
        components: updatedComponents,
        overlay: undefined,
        selectedComponent: INITIAL_COMPONENTS.root,
      }
    },
    addComponent(
      state: AppState,
      payload: { parentName: string; type: ComponentType },
    ): AppState {
      const id = `comp-${Math.round(new Date().getTime() / 1000)}`

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
          },
        },
      }
    },
    moveComponent(
      state: AppState,
      payload: { parentId: string; componentId: string },
    ): AppState {
      if (state.components[payload.componentId].parent === payload.parentId) {
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
        selectedId: state.components[payload.componentId].id,
        overlay: undefined,
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
  },
})

export default app
