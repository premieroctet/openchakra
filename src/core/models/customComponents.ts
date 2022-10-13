import { createModel } from '@rematch/core'
import produce from 'immer'

export interface CustomDictionary {
  [Key: string]: string
}

export interface DEFAULT_PARAMS {
  name: string
  value: any
  type: string
  optional: boolean
}
export interface ParametersType {
  [Key: string]: Array<DEFAULT_PARAMS>
}

export type CustomComponentsState = {
  components: CustomDictionary
  selectedId?: IComponent['type']
  parameters: ParametersType
}

// TODO: Add option to automatically add the first component's id
const DEFAULT_ID = undefined

const INITIAL_COMPONENTS: CustomDictionary = {}
const INITIAL_PARAMETERS: ParametersType = {}

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
        draftState.components = components
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
        } else {
          draftState.parameters[payload.id]?.push({
            name: payload.name,
            value: payload.value,
            type: payload.type,
            optional: payload.optional,
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
