import { useSelector } from 'react-redux'
import { RootState } from '~core/store'
import { getDefaultFormProps } from '~utils/defaultProps'
import { useInspectorUpdate } from '~contexts/inspector-context'
import { useEffect } from 'react'
import { isJsonString } from '~dependencies/utils/misc'

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

export const useAllPropsSelector = (propsName: string[]) => {
  // const { addActiveProps } = useInspectorUpdate()

  // useEffect(() => {
  //   // Register form props name for custom props panel
  //   addActiveProps(propsName)
  // }, [addActiveProps, propsName])

  const value = useSelector((state: RootState) => {
    const currentState = state.project.present
    const currentPage = currentState.pages[currentState.activePage]
    const component = currentPage.components[currentPage.selectedId]
    const propsValue = component.props

    if (propsValue !== undefined) {
      return Object.fromEntries(
        Object.entries(propsValue)
          // @ts-ignore
          .map(([key, data]) => [
            key,
            isJsonString(data) ? JSON.parse(data) : data,
          ])
          .filter(([key, data]) => key !== 'status')
          .filter(([key, data]) => propsName.includes(key)),
      )
    }

    return null
  })

  return value
}

export default usePropsSelector
