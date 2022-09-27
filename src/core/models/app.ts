import { createModel } from '@rematch/core'

type Overlay = undefined | { rect: DOMRect; id: string; type: ComponentType }

export type AppState = {
  device: string
  currentSection: string
  showLeftPanel: boolean
  showRightPanel: boolean
  showLayout: boolean
  showCode: boolean
  inputTextFocused: boolean
  overlay: undefined | Overlay
}

const appSections: {
  [key: string]: {
    showLeftPanel: boolean
    showRightPanel: boolean
    mediasLayout: boolean
  }
} = {
  pages: {
    showLeftPanel: true,
    showRightPanel: true,
    mediasLayout: false,
  },
  components: {
    showLeftPanel: true,
    showRightPanel: true,
    mediasLayout: false,
  },
  medias: {
    showLeftPanel: true,
    showRightPanel: false,
    mediasLayout: true,
  },
}

const app = createModel({
  state: {
    device: 'desktop',
    currentSection: 'components',
    showLeftPanel: true,
    showRightPanel: true,
    showLayout: true,
    mediasLayout: false,
    showCode: false,
    inputTextFocused: false,
    overlay: undefined,
  } as AppState,
  reducers: {
    selectDevice(state: AppState, selectedDevice: string): AppState {
      return {
        ...state,
        device: selectedDevice,
      }
    },
    toggleBuilderMode(state: AppState): AppState {
      return {
        ...state,
        showLayout: !state.showLayout,
        showLeftPanel: !state.showLayout,
        showRightPanel: !state.showLayout,
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
        inputTextFocused: !state.inputTextFocused,
      }
    },
    setCurrentSection(state: AppState, selectedSection: string): AppState {
      return {
        ...state,
        currentSection: selectedSection,
        ...appSections[selectedSection],
      }
    },
    setPagesSection(state: AppState): AppState {
      return {
        ...state,
        showLayout: true,
        showLeftPanel: true,
        showRightPanel: true,
      }
    },
    setComponentsSection(state: AppState): AppState {
      return {
        ...state,
        showLayout: true,
        showLeftPanel: true,
        showRightPanel: true,
      }
    },
    setMediasSection(state: AppState): AppState {
      return {
        ...state,
        showLayout: true,
        showLeftPanel: true,
        showRightPanel: false,
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
