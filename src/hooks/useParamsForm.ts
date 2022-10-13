import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getSelectedComponentId } from '~core/selectors/components'
import useDispatch from './useDispatch'

export const useParamsForm = () => {
  const dispatch = useDispatch()
  const componentId = useSelector(getSelectedComponentId)

  const setValue = useCallback(
    (
      name: string,
      value: any,
      type: string,
      optional: boolean,
      exposed: boolean,
    ) => {
      dispatch.components.updateParams({
        id: 'root',
        name,
        value,
        type,
        optional,
        exposed,
      })
      dispatch.customComponents.updateParams({
        id: componentId,
        name,
        value,
        type,
        optional,
        exposed,
      })
    },
    [componentId, dispatch.components, dispatch.customComponents],
  )

  return { setValue }
}
