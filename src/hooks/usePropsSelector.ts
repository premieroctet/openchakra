import { useSelector } from 'react-redux'
import { RootState } from '../core/store'

const usePropsSelector = (propsName: string) => {
  return useSelector(
    (state: RootState) =>
      state.components.present.components[state.components.present.selectedId]
        .props[propsName],
  )
}

export default usePropsSelector
