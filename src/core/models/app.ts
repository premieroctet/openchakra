import { createModel } from '@rematch/core'

type Overlay = undefined | { rect: DOMRect; id: string; type: ComponentType }

export type AppState = {
  device: string
  currentSection: string
  showLeftPanel: boolean
  showRightPanel: boolean
  pageLayout: boolean
  showOverview: boolean
  mediasLayout: boolean
  showCode: boolean
  inputTextFocused: boolean
  overlay: undefined | Overlay
}

const appSections: {
  [key: string]: {
    showLeftPanel: boolean
    showRightPanel: boolean
    mediasLayout: boolean
    pageLayout: boolean
  }
} = {
  pages: {
    showLeftPanel: true,
    showRightPanel: true,
    pageLayout: true,
    mediasLayout: false,
  },
  components: {
    showLeftPanel: true,
    showRightPanel: true,
    pageLayout: true,
    mediasLayout: false,
  },
  medias: {
    showLeftPanel: true,
    showRightPanel: false,
    pageLayout: false,
    mediasLayout: true,
  },
}

const app = createModel({
  state: {
    device: 'desktop',
    currentSection: 'components',
    showLeftPanel: true,
    showRightPanel: true,
    showWarnings: true,
    pageLayout: true,
    showOverview: true,
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
        showOverview: !state.showOverview,
        showLeftPanel: !state.showOverview,
        showRightPanel: !state.showOverview,
        showWarnings: false,
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
