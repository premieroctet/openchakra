import { useSelector } from 'react-redux'
import { getSelectedComponent } from '../core/selectors/components'

const usePropsSelector = (propsName: string) => {
  const component = useSelector(getSelectedComponent)
  return component.props[propsName]
}

export default usePropsSelector
