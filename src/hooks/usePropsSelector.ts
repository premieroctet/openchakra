import { useSelector } from 'react-redux'
import { RootState } from '../core/store'

const usePropsSelector = (propsName: string) => {
  const value = useSelector(
    (state: RootState) =>
      state.components.present.components[state.components.present.selectedId]
        .props[propsName],
  )

  return value || ''
}

export default usePropsSelector
