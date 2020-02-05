import useDispatch from './useDispatch'
import { useSelector } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { getSelectedComponent } from '../core/selectors/components'

export const keyMap = {
  DELETE_NODE: 'backspace',
  TOGGLE_BUILDER_MODE: 'b',
  TOGGLE_CODE_PANEL: 'c',
  UNDO: ['ctrl+z', 'cmd+z'],
  REDO: ['ctrl+y', 'cmd+y'],
}

const hasNoSpecialKeyPressed = (event: KeyboardEvent | undefined) =>
  !event?.metaKey && !event?.shiftKey && !event?.ctrlKey && !event?.altKey

const useShortcuts = () => {
  const dispatch = useDispatch()
  const selected = useSelector(getSelectedComponent)

  const deleteNode = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault()
    }
    dispatch.components.deleteComponent(selected.id)
  }

  const toggleBuilderMode = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault()
    }
    if (hasNoSpecialKeyPressed(event)) {
      dispatch.app.toggleBuilderMode()
    }
  }

  const toggleCodePanel = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault()
    }
    if (hasNoSpecialKeyPressed(event)) {
      dispatch.app.toggleCodePanel()
    }
  }

  const undo = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault()
    }

    dispatch(UndoActionCreators.undo())
  }

  const redo = (event: KeyboardEvent | undefined) => {
    if (event) {
      event.preventDefault()
    }

    dispatch(UndoActionCreators.redo())
  }

  const handlers = {
    DELETE_NODE: deleteNode,
    TOGGLE_BUILDER_MODE: toggleBuilderMode,
    TOGGLE_CODE_PANEL: toggleCodePanel,
    UNDO: undo,
    REDO: redo,
  }

  return { handlers }
}

export default useShortcuts
