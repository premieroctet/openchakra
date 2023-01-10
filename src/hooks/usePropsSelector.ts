import { useSelector } from 'react-redux'
import { RootState } from '~core/store'
import { getDefaultFormProps } from '~utils/defaultProps'
import { useInspectorUpdate } from '~contexts/inspector-context'
import { useEffect } from 'react'

const usePropsSelector = (propsName: string) => {
  const { addActiveProps } = useInspectorUpdate()

  useEffect(() => {
    addActiveProps(propsName)
  }, [addActiveProps, propsName])

  const value = useSelector((state: RootState) => {
    const component =
      state.components.present.components[state.components.present.selectedId]
    const propsValue = component.props[propsName]

    if (propsValue !== undefined) {
      return propsValue
    }

    if (getDefaultFormProps(component.type)[propsName] !== undefined) {
      return getDefaultFormProps(component.type)[propsName]
    }

    const params = state.components.present.components['root'].params
    const defaultCustomValue = params?.filter(
      param => param.name === propsName,
    )[0].value
    if (defaultCustomValue) return defaultCustomValue

    return ''
  })

  return value
}

export default usePropsSelector
