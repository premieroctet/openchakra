import { useSelector } from 'react-redux'
import { RootState } from '~core/store'
import { getDefaultFormProps } from '~utils/defaultProps'
import { useInspectorUpdate } from '~contexts/inspector-context'
import { useEffect } from 'react'

export function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const usePropsSelector = (propsName: string) => {
  const { addActiveProps } = useInspectorUpdate()

  useEffect(() => {
    // Register form props name for custom props panel
    addActiveProps(propsName)
  }, [addActiveProps, propsName])

  const value = useSelector((state: RootState) => {
    const currentState = state.project.present
    const currentPage = currentState.pages[currentState.activePage]
    const component = currentPage.components[currentPage.selectedId]
    const propsValue = component.props[propsName]

    if (propsValue !== undefined) {
      return isJsonString(propsValue) ? JSON.parse(propsValue) : propsValue
    }

    if (getDefaultFormProps(component.type)[propsName] !== undefined) {
      return getDefaultFormProps(component.type)[propsName]
    }

    return ''
  })

  return value
}

export default usePropsSelector
