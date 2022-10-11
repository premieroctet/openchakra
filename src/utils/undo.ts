import { Action } from '@rematch/core'

export default function filterActions(action: Action) {
  if (
    [
      'components/reset',
      'components/loadDemo',
      'components/resetProps',
      'components/updateProps',
      'components/addComponent',
      'components/deleteComponent',
      'components/moveComponent',
      'components/addMetaComponent',
      'components/moveSelectedComponentChildren',
      'components/duplicate',
    ].includes(action.type)
  ) {
    return true
  }

  return false
}
