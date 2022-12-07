import { createModel } from '@rematch/core'
import produce from 'immer'
import { DEFAULT_PROPS } from '~utils/defaultProps'
import templates, { TemplateType } from '~templates'
import { generateId } from '~utils/generateId'
import { duplicateComponent, deleteComponent } from '~utils/recursive'
import omit from 'lodash/omit'
import { ComponentWithRefs } from '~custom-components/refComponents'

export type ComponentsState = {
  components: IComponents
  selectedId: IComponent['id']
  hoveredId?: IComponent['id']
}
export type ComponentsStateWithUndo = {
  past: ComponentsState[]
  present: ComponentsState
  future: ComponentsState[]
}

const DEFAULT_ID = 'root'
const componentsWithRefs = Object.keys(ComponentWithRefs)

export const INITIAL_COMPONENTS: IComponents = {
  root: {
    id: DEFAULT_ID,
    parent: DEFAULT_ID,
    type: 'Box' as ComponentType,
    children: [],
    props: {},
    params: [],
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
    loadDemo(state: ComponentsState, type: TemplateType): ComponentsState {
      return {
        ...state,
        selectedId: 'comp-root',
        components: templates[type],
      }
    },
    updateParams(
      state: ComponentsState,
      payload: {
        id: string
        name: string
        value: any
        type: string
        optional: boolean
        exposed: boolean
        ref: boolean
      },
    ) {
      return produce(state, (draftState: ComponentsState) => {
        const index = draftState.components[payload.id].params?.findIndex(
          (item: any) => item.name === payload.name,
        )
        if (index != undefined && index !== -1) {
          // @ts-ignore
          draftState.components[payload.id].params[index].value = payload.value
          // @ts-ignore
          draftState.components[payload.id].params[index].type = payload.type
          // @ts-ignore
          draftState.components[payload.id].params[index].optional =
            payload.optional
          // @ts-ignore
          draftState.components[payload.id].params[index].exposed =
            payload.exposed
          // @ts-ignore
          draftState.components[payload.id].params[index].ref = payload.ref
        } else {
          draftState.components[payload.id].params?.push({
            name: payload.name,
            value: payload.value,
            type: payload.type,
            optional: payload.optional,
            exposed: payload.exposed,
            ref: payload.ref,
          })
        }
      })
    },
    deleteParams(
      state: ComponentsState,
      payload: { id: string; name: string },
    ) {
      return {
        ...state,
        components: {
          ...state.components,
          [payload.id]: {
            ...state.components[payload.id],
            params: state.components[payload.id].params?.filter(
              (item: any) => item.name !== payload.name,
            ),
          },
        },
      }
    },
    resetProps(state: ComponentsState, componentId: string): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const component = draftState.components[componentId]
        const { form, ...defaultProps } = DEFAULT_PROPS[component.type] || {}
        draftState.components[componentId].props = defaultProps || {}
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
        const id = payload.testId || generateId(payload.type)
        // TODO: Custom params which are exposed as default props
        const { form, ...defaultProps } = DEFAULT_PROPS[payload.type] || {}
        draftState.selectedId = id
        draftState.components[payload.parentName].children.push(id)
        draftState.components[id] = {
          id,
          props: defaultProps || {},
          children: [],
          type: payload.type,
          parent: payload.parentName,
          rootParentType: payload.rootParentType || payload.type,
        }
        if (componentsWithRefs.includes(payload.type)) {
          const ref = `ref${id.replace('-', '_')}`
          draftState.components['root'].params?.push({
            name: ref,
            type: `RefObject<${ComponentWithRefs[payload.type]}>`,
            value: 'null',
            optional: true,
            exposed: false,
            ref: true,
          })
          draftState.components[id].props['ref'] = `{${ref}}`
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
        const newRefElements = Object.entries(draftState.components).filter(
          ([id, comp]) =>
            componentsWithRefs.includes(comp.type) &&
            draftState.components[payload.root].children.includes(id),
        )
        if (newRefElements.length) {
          newRefElements.map(([id, comp]) => {
            const ref = `ref${id.replace('-', '_')}`
            draftState.components['root'].params?.push({
              name: ref,
              type: `RefObject<${ComponentWithRefs[comp.type]}>`,
              value: 'null',
              optional: true,
              exposed: false,
              ref: true,
            })
            draftState.components[id].props['ref'] = `{${ref}}`
          })
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
    setComponentName(
      state: ComponentsState,
      payload: { componentId: string; name: string },
    ): ComponentsState {
      return produce(state, draftState => {
        const component = draftState.components[payload.componentId]

        component.componentName = payload.name
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
