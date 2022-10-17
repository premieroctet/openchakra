import { RootState } from '~core/store'

export const getPageLayout = (state: RootState) => state.app.pageLayout
export const getShowOverview = (state: RootState) => state.app.showOverview
export const getMediasLayout = (state: RootState) => state.app.mediasLayout
export const getCurrentSection = (state: RootState) => state.app.currentSection
export const getShowLeftPanel = (state: RootState) => state.app.showLeftPanel
export const getShowWarnings = (state: RootState) => state.app.showWarnings
export const getShowRightPanel = (state: RootState) => state.app.showRightPanel

export const getDevice = (state: RootState) => state.app.device

export const getShowCode = (state: RootState) => state.app.showCode

export const getFocusedComponent = (id: IComponent['id']) => (
  state: RootState,
) => state.app.inputTextFocused && state.project.present.pages[state.project.present.activePage].selectedId === id

export const getInputTextFocused = (state: RootState) =>
  state.app.inputTextFocused
