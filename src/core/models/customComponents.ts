import { createModel } from '@rematch/core'
import produce from 'immer'

export interface Dictionary {
  [Key: string]: string
}

export type CustomComponentsState = {
  components: Dictionary
  selectedId?: IComponent['type']
}

const DEFAULT_ID = undefined

export const INITIAL_COMPONENTS: Dictionary = {}

const customComponents = createModel({
  state: {
    components: INITIAL_COMPONENTS,
    selectedId: DEFAULT_ID,
  } as CustomComponentsState,
  reducers: {
    updateCustomComponents(
      state: CustomComponentsState,
      components: Dictionary,
    ): CustomComponentsState {
      return produce(state, (draftState: CustomComponentsState) => {
        draftState.components = components
      })
    },
    reset(
      state: CustomComponentsState,
      components?: Dictionary,
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
