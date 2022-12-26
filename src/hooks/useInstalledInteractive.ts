import { useRef, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import useDispatch from './useDispatch'
import { useDrag } from 'react-dnd'
import {
  getIsSelectedComponent,
  getIsHovered,
  getComponents,
} from '../core/selectors/components'
import { getShowLayout, getFocusedComponent } from '../core/selectors/app'

const convertParamToProps = (
  component: IComponent,
  propName: string,
  components: IComponents,
) => {
  if (component.props[propName].length > 1) {
    if (component.props[propName].slice(0, 1) === '{') {
      let compParams = components.root.params
        ?.map(param => {
          if (param.name === component.props[propName].slice(1, -1)) {
            return param.value
          }
        })
        .filter(param => param !== undefined)
      return {
        key: propName,
        value: compParams && compParams[0]
          ? compParams[0].slice(0, 1) === '['
            ? eval(compParams[0])
            : compParams[0]
          : component.props[propName].slice(1, -1),
      }
    } else {
      return { key: propName, value: component.props[propName] }
    }
  } else {
    return { key: propName, value: component.props[propName] }
  }
}

export const useInstalledInteractive = (
  component: IComponent,
  enableVisualHelper = false,
  withoutComponentProps = false,
) => {
  const dispatch = useDispatch()
  const components = useSelector(getComponents)
  const showLayout = useSelector(getShowLayout)
  const isComponentSelected = useSelector(getIsSelectedComponent(component.id))
  const isHovered = useSelector(getIsHovered(component.id))
  const focusInput = useSelector(getFocusedComponent(component.id))

  const [, drag] = useDrag({
    type: component.type,
    item: { id: component.id, type: component.type, isMoved: true },
  })

  const ref = useRef<HTMLDivElement>(null)
  let props = {
    ...(withoutComponentProps
      ? {}
      : Object.assign(
          {},
          ...Object.keys(component.props)
            .map(propName =>
              convertParamToProps(component, propName, components),
            )
            .map(item => ({ [item.key]: item.value })),
        )),
    onMouseOver: (event: MouseEvent) => {
      event.stopPropagation()
      dispatch.components.hover(component.id)
    },
    onMouseOut: () => {
      dispatch.components.unhover()
    },
    onClick: (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      dispatch.components.select(component.id)
    },
    onDoubleClick: (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (focusInput === false) {
        dispatch.app.toggleInputText()
      }
    },
  }

  if (showLayout && enableVisualHelper) {
    props = {
      ...props,
      border: `1px dashed #718096`,
      padding: props.p || props.padding ? props.p || props.padding : 4,
    }
  }

  if (isHovered || isComponentSelected) {
    props = {
      ...props,
      boxShadow: `${focusInput ? '#ffc4c7' : '#4FD1C5'} 0px 0px 0px 2px inset`,
    }
  }

  return { props, ref: drag(ref), drag }
}
