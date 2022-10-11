import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import useDispatch from './useDispatch'
import { getSelectedComponentId } from '~core/selectors/components'

export const useParamsForm = () => {
  const dispatch = useDispatch()
  const componentId = 'root'

  const setValue = useCallback(
    (name: string, value: any, type: string, optional: boolean) => {
      dispatch.components.updateParams({
        id: componentId,
        name,
        value,
        type,
        optional,
      })
    },
    [componentId, dispatch.components],
  )

  return { setValue }
}
