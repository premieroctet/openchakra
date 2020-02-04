import { ChangeEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'
import useDispatch from './useDispatch'
import { RootState } from '..'

export const useForm = () => {
  const dispatch = useDispatch()
  const componentId = useSelector(
    (state: RootState) => state.components.present.selected.id,
  )

  const setValueFromEvent = ({
    target: { name, value },
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(name, value)
  }

  const setValue = useCallback(
    (name: string, value: any) => {
      dispatch.components.updateProps({
        id: componentId,
        name,
        value,
      })
    },
    [componentId, dispatch.components],
  )

  return { setValue, setValueFromEvent }
}
