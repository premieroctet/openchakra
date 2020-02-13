import { RootState } from '../store'

export const getShowLayout = (state: RootState) => state.app.showLayout

export const getShowCode = (state: RootState) => state.app.showCode

export const getFocusedComponent = (id: IComponent['id']) => (
  state: RootState,
) => state.app.useComponentFocused && state.components.present.selectedId === id

export const getShowInputText = (state: RootState) => state.app.focusInputText
