import { createModel } from '@rematch/core'
import produce from 'immer'
import { convertToPascal } from '~components/editor/Editor'

export interface CustomDictionary {
  [Key: string]: string
}

export interface ComponentParametersType {
  [Key: string]: Array<ParametersType>
}

export interface NewThemeType {
  brand: string
  primaryColor: string
  textColor: string
  bgColor: string
  paperColor: string
  borderColor: string
  headingFontFamily: string
  bodyFontFamily: string
}

export type CustomComponentsState = {
  components: CustomDictionary
  installedComponents: CustomDictionary
  selectedId?: IComponent['type']
  parameters: ComponentParametersType
  themePath?: string
  newTheme: NewThemeType
}

const DEFAULT_ID = undefined
const INITIAL_COMPONENTS: CustomDictionary = {}
const INITIAL_PARAMETERS: ComponentParametersType = {}
const DEFAULT_THEME_PATH = undefined
const INITIAL_NEW_THEME: NewThemeType = {
  brand: 'cyan',
  primaryColor: 'blue.400',
  textColor: 'gray.900',
  bgColor: 'blackAlpha.100',
  paperColor: 'whiteAlpha.900',
  borderColor: 'gray.200',
  headingFontFamily: 'roboto',
  bodyFontFamily: 'roboto',
}

const customComponents = createModel({
  state: {
    components: INITIAL_COMPONENTS,
    installedComponents: {},
    parameters: INITIAL_PARAMETERS,
    selectedId: DEFAULT_ID,
    newTheme: INITIAL_NEW_THEME,
    themePath: DEFAULT_THEME_PATH,
  } as CustomComponentsState,
  reducers: {
    updateCustomComponents(
      state: CustomComponentsState,
      components: CustomDictionary,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.components = components
      })
    },
    addCustomComponent(
      state: CustomComponentsState,
      component: string,
      componentPath: string,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.components[component] = componentPath
      })
    },
    deleteCustomComponent(
      state: CustomComponentsState,
      component: string,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        delete draftState.components[component]
      })
    },
    updateParams(
      state: CustomComponentsState,
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
      return produce(state, (draftState: CustomComponentsState) => {
        const index = draftState.parameters[payload.id]?.findIndex(
          (item: any) => item.name === payload.name,
        )
        if (index !== undefined && index !== -1) {
          draftState.parameters[payload.id][index].value = payload.value
          draftState.parameters[payload.id][index].type = payload.type
          draftState.parameters[payload.id][index].optional = payload.optional
          draftState.parameters[payload.id][index].exposed = payload.exposed
          draftState.parameters[payload.id][index].ref = payload.ref
        } else {
          draftState.parameters[payload.id]?.push({
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
      state: CustomComponentsState,
      payload: { id: string; name: string },
    ) {
      return {
        ...state,
        parameters: {
          ...state.parameters,
          [payload.id]: [
            ...state.parameters[payload.id]?.filter(
              (item: any) => item.name !== payload.name,
            ),
          ],
        },
      }
    },
    reset(
      state: CustomComponentsState,
      components?: CustomDictionary,
    ): CustomComponentsState {
      return {
        ...state,
        components: components || INITIAL_COMPONENTS,
        selectedId: DEFAULT_ID,
      }
    },
    select(
      state: CustomComponentsState,
      selectedId: IComponent['type'],
    ): CustomComponentsState {
      return {
        ...state,
        selectedId,
      }
    },
    unselect(state: CustomComponentsState): CustomComponentsState {
      return {
        ...state,
        selectedId: DEFAULT_ID,
      }
    },
    setTheme(
      state: CustomComponentsState,
      themePath: string,
      newTheme: NewThemeType,
    ): CustomComponentsState {
      return {
        ...state,
        themePath,
        newTheme,
      }
    },
    updateInstalledComponents(
      state: CustomComponentsState,
      installedComponentPath: string,
      isAdded: boolean,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        let componentName = convertToPascal(
          installedComponentPath.split('.').splice(-1)[0],
        )
        isAdded
          ? (draftState.installedComponents[
              componentName
            ] = installedComponentPath)
          : delete draftState.installedComponents[componentName]
      })
    },
    initInstalledComponents(
      state: CustomComponentsState,
      components: CustomDictionary,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.installedComponents = components
      })
    },
    updateNewTheme(
      state: CustomComponentsState,
      propType: string,
      propValue: string,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.newTheme[propType as keyof NewThemeType] = propValue
      })
    },
  },
})

export default customComponents
