import { createModel } from '@rematch/core'

type Overlay = undefined | { rect: DOMRect; id: string; type: ComponentType }

export type AppState = {
  showLayout: boolean
  showCode: boolean
  focusInputText: boolean
  useComponentFocused: boolean
  overlay: undefined | Overlay
}

const app = createModel({
  state: {
    showLayout: true,
    showCode: false,
    focusInputText: false,
    useComponentFocused: false,
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
    toggleInputText(state: AppState): AppState {
      return {
        ...state,
        focusInputText: !state.focusInputText,
      }
    },
    toggleComponentFocused(state: AppState): AppState {
      return {
        ...state,
        useComponentFocused: !state.useComponentFocused,
      }
    },

    setOverlay(state: AppState, overlay: Overlay | undefined): AppState {
      return {
        ...state,
        overlay,
      }
    },
    'components/deleteComponent': (state: AppState): AppState => {
      return {
        ...state,
        overlay: undefined,
      }
    },
    '@@redux-undo/UNDO': (state: AppState): AppState => {
      return {
        ...state,
        overlay: undefined,
      }
    },
  },
})

export default app
