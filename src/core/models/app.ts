import { createModel } from '@rematch/core'

type Overlay = undefined | { rect: DOMRect; id: string; type: ComponentType }

export type AppState = {
  showLayout: boolean
  showCode: boolean
  showLoader: boolean
  inputTextFocused: boolean
  overlay: undefined | Overlay
}

const app = createModel({
  state: {
    showLayout: true,
    showCode: false,
    showLoader: false,
    inputTextFocused: false,
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
    toggleLoader(state: AppState): AppState {
      return {
        ...state,
        showLoader: !state.showLoader,
      }
    },
    toggleInputText(state: AppState): AppState {
      return {
        ...state,
        inputTextFocused: !state.inputTextFocused,
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
