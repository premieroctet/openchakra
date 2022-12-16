import { createModel } from '@rematch/core'
import produce from 'immer'

export interface CustomDictionary {
  [Key: string]: string
}

export interface ComponentParametersType {
  [Key: string]: Array<ParametersType>
}

export interface DefPropsType {
  colorScheme?: string
  size?: string
  variant?: string
}
export interface ThemeExtType {
  defaultProps: DefPropsType
  components?: Array<string>
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
  selectedId?: IComponent['type']
  parameters: ComponentParametersType
  theme: Array<ThemeExtType>
  themePath?: string
  newTheme: NewThemeType
}

const DEFAULT_ID = undefined
const INITIAL_COMPONENTS: CustomDictionary = {}
const INITIAL_PARAMETERS: ComponentParametersType = {}
const DEFAULT_THEME_PATH = undefined
const INITIAL_THEME: ThemeExtType = {
  defaultProps: {
    colorScheme: 'blue',
    size: 'md',
    variant: 'solid',
  },
}
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
    parameters: INITIAL_PARAMETERS,
    selectedId: DEFAULT_ID,
    theme: [INITIAL_THEME],
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
    updateProp(
      state: CustomComponentsState,
      payload: {
        extIndex: number
        propType: string
        propValue: string
      },
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.theme[payload.extIndex].defaultProps[
          payload.propType as keyof DefPropsType
        ] = payload.propValue
      })
    },
    deleteProp(
      state: CustomComponentsState,
      extIndex: number,
      propType: string,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        delete draftState.theme[extIndex].defaultProps[
          propType as keyof DefPropsType
        ]
      })
    },
    updateLayerComponents(
      state: CustomComponentsState,
      extIndex: number,
      components: Array<string>,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        components.length
          ? (draftState.theme[extIndex].components = components)
          : delete draftState.theme[extIndex].components
      })
    },
    addLayer(state: CustomComponentsState): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.theme.push(INITIAL_THEME)
      })
    },
    removeLayer(
      state: CustomComponentsState,
      extIndex: number,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.theme.splice(extIndex, 1)
      })
    },
    setThemePath(
      state: CustomComponentsState,
      themePath: string,
    ): CustomComponentsState {
      return {
        ...state,
        themePath,
      }
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
