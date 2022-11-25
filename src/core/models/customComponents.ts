import { createModel } from '@rematch/core'
import produce from 'immer'

export interface CustomDictionary {
  [Key: string]: string
}

export interface ComponentParametersType {
  [Key: string]: Array<ParametersType>
}

export type CustomComponentsState = {
  components: CustomDictionary
  selectedId?: IComponent['type']
  parameters: ComponentParametersType
}

// TODO: Add option to automatically add the first component's id
const DEFAULT_ID = undefined

const INITIAL_COMPONENTS: CustomDictionary = {}
const INITIAL_PARAMETERS: ComponentParametersType = {}

const customComponents = createModel({
  state: {
    components: INITIAL_COMPONENTS,
    parameters: INITIAL_PARAMETERS,
    selectedId: DEFAULT_ID,
  } as CustomComponentsState,
  reducers: {
    updateCustomComponents(
      state: CustomComponentsState,
      components: CustomDictionary,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.components=components
      })
    },
    addCustomComponent(
      state: CustomComponentsState,
      component: string,
      componentPath: string,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.components[component]=componentPath
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
  },
})

export default customComponents
