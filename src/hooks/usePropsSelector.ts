import { useSelector } from 'react-redux'
import { RootState } from '../core/store'
import { getDefaultFormProps } from '../utils/defaultProps'
import { useInspectorContext } from '../contexts/inspector-context'

const usePropsSelector = (propsName: string) => {
  const { activePropsRef } = useInspectorContext()

  if (activePropsRef.current) {
    activePropsRef.current.push(propsName)
  }

  const value = useSelector((state: RootState) => {
    const component =
      state.components.present.components[state.components.present.selectedId]
    let propsValue = component.props[propsName]

    if (component.instanceOf) {
      propsValue =
        state.components.present.components[component.instanceOf].props[
          propsName
        ]
    }

    if (propsValue !== undefined) {
      return propsValue
    }

    if (getDefaultFormProps(component.type)[propsName] !== undefined) {
      return getDefaultFormProps(component.type)[propsName]
    }

    return ''
  })

  return value
}

export default usePropsSelector
