import { createModel } from '@rematch/core'
import produce from 'immer'
import { DEFAULT_PROPS } from '~utils/defaultProps'
import templates, { TemplateType } from '~templates'
import { generateId } from '~utils/generateId'
import { duplicateComponent, deleteComponent } from '~utils/recursive'
import lodash from 'lodash'

export interface PageState extends PageSettings {
  components: IComponents
  selectedId: IComponent['id']
  hoveredId?: IComponent['id']
}

export type ComponentsState = {
  pages: {
    [key: string]: PageState
  }
  activePage: string
  rootPage: string
}
export type ComponentsStateWithUndo = {
  past: ComponentsState[]
  present: ComponentsState
  future: ComponentsState[]
}

export type PageSettings = {
  pageId?: string,
  pageName: string
  metaTitle: string
  metaDescription: string
  metaImageUrl: string
}

const DEFAULT_ID = 'root'

function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const DEFAULT_PAGE = generateId('page')

export const INITIAL_COMPONENTS: IComponents = {
  root: {
    id: DEFAULT_ID,
    parent: DEFAULT_ID,
    type: 'Box' as ComponentType,
    children: [],
    props: {},
  },
}

const getActiveComponents = (state: ComponentsState) => {
  return state.pages[state.activePage].components
}

const components = createModel({
  state: {
    pages: {
      [DEFAULT_PAGE]: {
        pageId: DEFAULT_PAGE,
        components: INITIAL_COMPONENTS,
        selectedId: DEFAULT_ID,
        pageName: 'index',
        metaTitle: '',
        metaDescription: '',
        metaImageUrl: '',
      },
    },
    activePage: DEFAULT_PAGE,
    rootPage: DEFAULT_PAGE,
  } as ComponentsState,
  reducers: {
    reset(state: ComponentsState, newState: ComponentsState): ComponentsState {
      const resetPageId = generateId('page')
      const pages = newState?.pages || {
        [resetPageId]: {
          pageId: resetPageId,
          pageName: 'index',
          metaTitle: '',
          metaDescription: '',
          metaImageUrl: '',
          components: INITIAL_COMPONENTS,
          selectedId: DEFAULT_ID,
        },
      }
      const activePage = newState
        ? Object.keys(newState.pages)[0]
        : resetPageId

      const rootPage = activePage

      return {
        ...state,
        pages,
        activePage,
        rootPage,
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
        const component = getActiveComponents(draftState)[componentId]
        //@ts-ignore
        const { form, ...defaultProps } = DEFAULT_PROPS[component.type] || {}

        draftState.pages[draftState.activePage].components[componentId].props =
          defaultProps || {}
      })
    },
    updateProps(
      state: ComponentsState,
      payload: { id: string; name: string; value: string },
    ) {
      return produce(state, (draftState: ComponentsState) => {
        const parseValue =
          isJsonString(payload.value) && JSON.parse(payload.value)
        draftState.pages[draftState.activePage].components[payload.id].props[
          payload.name
        ] = parseValue || payload.value
      })
    },
    deleteProps(state: ComponentsState, payload: { id: string; name: string }) {
      const copy = lodash.cloneDeep(state)
      lodash.unset(
        copy,
        `pages["${state.activePage}"]["${payload.id}"].props["${payload.name}"]`,
      )
      return copy
    },
    deleteComponent(state: ComponentsState, componentId: string) {
      if (componentId === 'root') {
        return state
      }

      return produce(state, (draftState: ComponentsState) => {
        const components = getActiveComponents(draftState)
        let component = components[componentId]

        // Remove self
        if (component && component.parent) {
          const children = components[component.parent].children.filter(
            (id: string) => id !== componentId,
          )

          components[component.parent].children = children
        }

        draftState.pages[draftState.activePage].selectedId = DEFAULT_ID
        draftState.pages[draftState.activePage].components = deleteComponent(
          component,
          components,
        )
      })
    },
    moveComponent(
      state: ComponentsState,
      payload: { parentId: string; componentId: string },
    ): ComponentsState {
      const components = getActiveComponents(state)
      if (
        components[payload.componentId].parent === payload.parentId ||
        payload.parentId === payload.componentId
      ) {
        return state
      }

      return produce(state, (draftState: ComponentsState) => {
        const components = getActiveComponents(draftState)
        const previousParentId = components[payload.componentId].parent

        const children = components[previousParentId].children.filter(
          id => id !== payload.componentId,
        )

        // Remove id from previous parent
        components[previousParentId].children = children

        // Update parent id
        components[payload.componentId].parent = payload.parentId

        // Add new child
        components[payload.parentId].children.push(payload.componentId)
      })
    },
    moveSelectedComponentChildren(
      state: ComponentsState,
      payload: { fromIndex: number; toIndex: number },
    ): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const components = getActiveComponents(draftState)
        const selectedComponent = components[draftState.selectedId]

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
        //@ts-ignore
        const { form, ...defaultProps } = DEFAULT_PROPS[payload.type] || {}
        draftState.pages[draftState.activePage].selectedId = id
        const components = getActiveComponents(draftState)
        components[payload.parentName].children.push(id)
        components[id] = {
          id,
          props: defaultProps || {},
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
        draftState.pages[draftState.activePage].selectedId = payload.root
        const components = getActiveComponents(draftState)
        components[payload.parent].children.push(payload.root)

        draftState.pages[draftState.activePage].components = {
          ...components,
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
        pages: {
          ...state.pages,
          [state.activePage]: {
            ...state.pages[state.activePage],
            selectedId: selectedId,
          },
        },
      }
    },
    unselect(state: ComponentsState): ComponentsState {
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.activePage]: {
            ...state.pages[state.activePage],
            selectedId: DEFAULT_ID,
          },
        },
      }
    },
    selectParent(state: ComponentsState): ComponentsState {
      const components = getActiveComponents(state)
      const selectedComponent = state.pages[state.activePage].selectedId

      return {
        ...state,
        pages: {
          ...state.pages,
          [state.activePage]: {
            ...state.pages[state.activePage],
            selectedId: components[selectedComponent].parent,
          },
        },
      }
    },
    duplicate(state: ComponentsState): ComponentsState {
      return produce(state, (draftState: ComponentsState) => {
        const components = getActiveComponents(draftState)
        const selectedComponent = components[draftState.pages[draftState.activePage].selectedId]

        if (selectedComponent.id !== DEFAULT_ID) {
          const parentElement = draftState.pages[draftState.activePage].components[selectedComponent.parent]

          const { newId, clonedComponents } = duplicateComponent(
            selectedComponent,
            components,
          )

          draftState.pages[draftState.activePage].components = {
            ...draftState.pages[draftState.activePage].components,
            ...clonedComponents,
          }

          draftState.pages[draftState.activePage].components[parentElement.id].children.push(newId)
        }
      })
    },
    setComponentName(
      state: ComponentsState,
      payload: { componentId: string; name: string },
    ): ComponentsState {
      return produce(state, draftState => {
        getActiveComponents(draftState)[payload.componentId].componentName =
          payload.name
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
    addPage(state: ComponentsState, payload: PageSettings): ComponentsState {

      const pageId = generateId('page')
      const {pageName, metaTitle, metaDescription, metaImageUrl} = payload

      return {
        ...state,
        pages: {
          ...state.pages,
          [pageId]: {
            pageId: pageId,
            components: INITIAL_COMPONENTS,
            selectedId: DEFAULT_ID,
            pageName,
            metaTitle,
            metaDescription,
            metaImageUrl,
          },
        },
      }
    },
    editPageSettings(state: ComponentsState, payload: PageSettings): ComponentsState {

      const {pageId, pageName, metaTitle, metaDescription, metaImageUrl} = payload

      if (pageId) {
        return {
          ...state,
          pages: {
            ...state.pages,
            [pageId]: {
              ...state.pages[pageId],
              selectedId: DEFAULT_ID,
              pageName,
              metaTitle,
              metaDescription,
              metaImageUrl,
            },
          },
        }
      }
      return state
    },
    deletePage(state: ComponentsState, pageId: string): ComponentsState {
      if (!state.pages[pageId]) {
        return state
      }
      if (Object.keys(state.pages).length === 1) {
        return state
      }
      const newPages=lodash.omit(state.pages, [pageId])
      const newActivePage=Object.keys(newPages)[0]
      return {
        ...state,
        pages: newPages,
        activePage: newActivePage
      }
    },
    setActivePage(state: ComponentsState, pageId: string): ComponentsState {
      if (!state.pages[pageId]) {
        throw new Error(`La page ${pageId} n'existe pas`)
      }
      return {
        ...state,
        activePage: pageId,
      }
    },
    setRootPage(state: ComponentsState, pageId: string): ComponentsState {
      return {
        ...state,
        rootPage: pageId,
      }
    },
  },
})

export default components
