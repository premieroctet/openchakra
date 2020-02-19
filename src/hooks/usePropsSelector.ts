import { useSelector } from 'react-redux'
import { getComponentProp } from '../core/selectors/components'

const usePropsSelector = (propsName: string) => {
  const value = useSelector(getComponentProp(propsName))

  return value || ''
}

export default usePropsSelector
