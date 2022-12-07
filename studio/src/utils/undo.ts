import { Action } from '@rematch/core'

export default function filterActions(action: Action) {
  if (
    [
      'project/reset',
      'project/loadDemo',
      'project/resetProps',
      'project/updateProps',
      'project/addComponent',
      'project/deleteComponent',
      'project/moveComponent',
      'project/addMetaComponent',
      'project/moveSelectedComponentChildren',
      'project/duplicate',
    ].includes(action.type)
  ) {
    return true
  }

  return false
}
