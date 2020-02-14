import { useSelector } from 'react-redux'
import { RootState } from '../core/store'
import { getDefaultFormProps } from '../utils/defaultProps'

const usePropsSelector = (propsName: string) => {
  const value = useSelector((state: RootState) => {
    const component =
      state.components.present.components[state.components.present.selectedId]
    const propsValue = component.props[propsName]

    return propsValue || getDefaultFormProps(component.type)[propsName] || ''
  })

  return value
}

export default usePropsSelector
