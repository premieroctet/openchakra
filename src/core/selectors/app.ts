import { RootState } from '~core/store'

export const getShowLayout = (state: RootState) => state.app.showLayout
export const getCurrentSection = (state: RootState) => state.app.currentSection
export const getShowLeftPanel = (state: RootState) => state.app.showLeftPanel
export const getShowRightPanel = (state: RootState) => state.app.showRightPanel

export const getDevice = (state: RootState) => state.app.device

export const getShowCode = (state: RootState) => state.app.showCode

export const getFocusedComponent = (id: IComponent['id']) => (
  state: RootState,
) => state.app.inputTextFocused && state.components.present.selectedId === id

export const getInputTextFocused = (state: RootState) =>
  state.app.inputTextFocused
