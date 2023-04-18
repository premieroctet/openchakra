import { createModel } from '@rematch/core'
import lodash from 'lodash'
import { DEFAULT_PROPS } from '~utils/defaultProps'
import { duplicateComponent, deleteComponent } from '~utils/recursive'
import { generateId } from '~utils/generateId'
import produce from 'immer'
import templates, { TemplateType } from '~templates'
import { CURRENT_VERSION } from '../../utils/upgrade';

export interface PageState extends PageSettings {
  components: IComponents
  selectedId: IComponent['id']
}

export type ProjectState = {
  pages: {
    [key: string]: PageState
  }
  activePage: string
  rootPage: string
  hoveredId?: IComponent['id']
  version: number
}
export type ProjectStateWithUndo = {
  past: ProjectState[]
  present: ProjectState
  future: ProjectState[]
}

export type PageSettings = {
  pageId: string
  pageName: string
  metaTitle?: string
  metaDescription?: string
  metaImageUrl?: string
  rootPage: boolean
}

const DEFAULT_ID = 'root'

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

const getDeleteError = (state: ProjectState, componentId:string) => {
  const page=lodash(state.pages).values().find(p => Object.keys(p.components).includes(componentId))
  if (!page) { return null}
  const components=page.components
  const comp=components[componentId]
  if (comp.type=='DataProvider') {
    const linkedComponents=Object.values(components)
    .filter(c => c.props?.dataSource==componentId || c.props?.subDataSource==componentId)
    if (linkedComponents.length>0) {
      return `Suppression impossible:ce dataprovider est utilisé par ${lodash.map(linkedComponents, 'id')}`
    }
  }
  return null
}

export const replaceId = (data, oldId, newId) => {
  const stringData = JSON.stringify(data).replace(new RegExp(oldId, 'g'), newId)
  return JSON.parse(stringData)
}

export const duplicatePageImpl = page => {
  const newIds = [
    [page.pageId, generateId('page')],
    ...Object.keys(page.components).map(compId =>
      compId == 'root' ? ['root', 'root'] : [compId, generateId('comp')],
    ),
  ]
  const newPage = newIds.reduce(
    (p, [oldId, newId]) => replaceId(p, oldId, newId),
    page,
  )
  newPage.pageName = `${page.pageName}-copie`
  return newPage
}

const getActiveComponents = (state: ProjectState) => {
  return state.pages[state.activePage].components
}

export const getComponentById = (state: ProjectState, componentId: string) => {
  const allComps = lodash.flatten(
    Object.values(state.pages).map(p => Object.values(p.components)),
  )
  return allComps.find(c => c.id === componentId)
}

const project = createModel({
  state: {
    pages: {
      [DEFAULT_PAGE]: {
        pageId: DEFAULT_PAGE,
        components: INITIAL_COMPONENTS,
        selectedId: DEFAULT_ID,
        pageName: 'home',
        metaTitle: '',
        metaDescription: '',
        metaImageUrl: '',
      },
    },
    activePage: DEFAULT_PAGE,
    rootPage: DEFAULT_PAGE,
    version: CURRENT_VERSION,
  } as ProjectState,
  reducers: {
    reset(state: ProjectState, newState: ProjectState): ProjectState {
      const resetPageId = generateId('page')
      const pages = newState?.pages || {
        [resetPageId]: {
          pageId: resetPageId,
          pageName: 'home',
          metaTitle: '',
          metaDescription: '',
          metaImageUrl: '',
          components: INITIAL_COMPONENTS,
          selectedId: DEFAULT_ID,
        },
      }

      const activePage = newState?.activePage || resetPageId

      const rootPage = newState?.rootPage || activePage
      const version = newState?.version || CURRENT_VERSION

      return {
        ...state,
        pages,
        activePage,
        rootPage,
        version,
      }
    },

    loadDemo(state: ProjectState, type: TemplateType): ProjectState {
      return {
        ...state,
        selectedId: 'comp-root',
        components: templates[type],
      }
    },
    resetProps(state: ProjectState, componentId: string): ProjectState {
      return produce(state, (draftState: ProjectState) => {
        const component = getActiveComponents(draftState)[componentId]
        //@ts-ignore
        const { form, ...defaultProps } = DEFAULT_PROPS[component.type] || {}

        draftState.pages[draftState.activePage].components[componentId].props =
          defaultProps || {}
      })
    },
    updateProps(
      state: ProjectState,
      payload: { id: string; name: string; value: string },
    ) {
      return produce(state, (draftState: ProjectState) => {
        const newValue =
          typeof payload.value === 'string'
            ? payload.value
            : JSON.stringify(payload.value)
        draftState.pages[draftState.activePage].components[payload.id].props[
          payload.name
        ] = newValue
      })
    },
    deleteProps(state: ProjectState, payload: { id: string; name: string }) {
      let resState = {
        ...state,
        pages: {
          ...state.pages,
          [state.activePage]: {
            ...state.pages[state.activePage],
            components: {
              ...state.pages[state.activePage].components,
              [payload.id]: {
                ...state.pages[state.activePage].components[payload.id],
                props: lodash.omit(
                  state.pages[state.activePage].components[payload.id].props,
                  payload.name,
                ),
              },
            },
          },
        },
      }
      return resState
    },

    deleteComponent(state: ProjectState, componentId: string) {
      const msg=getDeleteError(state, componentId)
      if (msg) {
        alert(msg)
        return state
      }
      if (componentId === 'root') {
        return state
      }

      return produce(state, (draftState: ProjectState) => {
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
      state: ProjectState,
      payload: { parentId: string; componentId: string },
    ): ProjectState {
      const components = getActiveComponents(state)
      if (
        components[payload.componentId].parent === payload.parentId ||
        payload.parentId === payload.componentId
      ) {
        return state
      }

      return produce(state, (draftState: ProjectState) => {
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
      state: ProjectState,
      payload: { fromIndex: number; toIndex: number },
    ): ProjectState {
      return produce(state, (draftState: ProjectState) => {
        const components = getActiveComponents(draftState)
        const selectedComponent =
          components[draftState.pages[draftState.activePage].selectedId]

        selectedComponent.children.splice(
          payload.toIndex,
          0,
          selectedComponent.children.splice(payload.fromIndex, 1)[0],
        )
      })
    },
    addComponent(
      state: ProjectState,
      payload: {
        parentName: string
        type: ComponentType
        rootParentType?: ComponentType
        testId?: string
      },
    ): ProjectState {
      return produce(state, (draftState: ProjectState) => {
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
      state: ProjectState,
      payload: { components: IComponents; root: string; parent: string },
    ): ProjectState {
      return produce(state, (draftState: ProjectState) => {
        draftState.pages[draftState.activePage].selectedId = payload.root
        const components = getActiveComponents(draftState)
        components[payload.parent].children.push(payload.root)

        draftState.pages[draftState.activePage].components = {
          ...components,
          ...payload.components,
        }
      })
    },
    select(state: ProjectState, selectedId: IComponent['id']): ProjectState {
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
    unselect(state: ProjectState): ProjectState {
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
    selectParent(state: ProjectState): ProjectState {
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
    duplicate(state: ProjectState): ProjectState {
      return produce(state, (draftState: ProjectState) => {
        const components = getActiveComponents(draftState)
        const selectedComponent =
          components[draftState.pages[draftState.activePage].selectedId]

        if (selectedComponent.id !== DEFAULT_ID) {
          const parentElement =
            draftState.pages[draftState.activePage].components[
              selectedComponent.parent
            ]

          const { newId, clonedComponents } = duplicateComponent(
            selectedComponent,
            components,
          )

          draftState.pages[draftState.activePage].components = {
            ...draftState.pages[draftState.activePage].components,
            ...clonedComponents,
          }

          draftState.pages[draftState.activePage].components[
            parentElement.id
          ].children.push(newId)
        }
      })
    },
    setComponentName(
      state: ProjectState,
      payload: { componentId: string; name: string },
    ): ProjectState {
      return produce(state, draftState => {
        getActiveComponents(draftState)[payload.componentId].componentName =
          payload.name
      })
    },
    hover(state: ProjectState, componentId: IComponent['id']): ProjectState {
      return {
        ...state,
        hoveredId: componentId,
      }
    },
    unhover(state: ProjectState): ProjectState {
      return {
        ...state,
        hoveredId: undefined,
      }
    },
    addPage(state: ProjectState, payload: PageSettings): ProjectState {
      const pageId = generateId('page')
      const { pageName, metaTitle, metaDescription, metaImageUrl } = payload

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
            rootPage: false,
          },
        },
      }
    },
    editPageSettings(state: ProjectState, payload: PageSettings): ProjectState {
      const {
        pageId,
        pageName,
        metaTitle,
        metaDescription,
        metaImageUrl,
      } = payload

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
    deletePage(state: ProjectState, pageId: string): ProjectState {
      if (!state.pages[pageId]) {
        return state
      }
      if (Object.keys(state.pages).length === 1) {
        return state
      }
      const newPages = lodash.omit(state.pages, [pageId])
      const newActivePage = Object.keys(newPages)[0]
      const rootPage =
        pageId === state.rootPage ? newActivePage : state.rootPage
      return {
        ...state,
        pages: newPages,
        activePage: newActivePage,
        rootPage,
      }
    },
    duplicatePage(state: ProjectState, pageId: string): ProjectState {
      if (!state.pages[pageId]) {
        return state
      }
      const newPage = duplicatePageImpl(state.pages[pageId])
      return {
        ...state,
        pages: { ...state.pages, [newPage.pageId]: newPage },
        activePage: newPage.pageId,
      }
    },
    setActivePage(state: ProjectState, pageId: string): ProjectState {
      if (!state.pages[pageId]) {
        throw new Error(`La page ${pageId} n'existe pas`)
      }
      return {
        ...state,
        activePage: pageId,
      }
    },
    setRootPage(state: ProjectState, pageId: string): ProjectState {
      return {
        ...state,
        rootPage: pageId,
      }
    },
  },
})

export default project
