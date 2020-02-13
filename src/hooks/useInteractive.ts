import { useRef, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import useDispatch from './useDispatch'
import { useDrag } from 'react-dnd'
import {
  getIsSelectedComponent,
  getIsHovered,
} from '../core/selectors/components'
import { getShowLayout } from '../core/selectors/app'
import { getShowInputText } from '../core/selectors/app'
import { getFocusedComponent } from '../core/selectors/app'

export const useInteractive = (
  component: IComponent,
  enableVisualHelper: boolean = false,
) => {
  const dispatch = useDispatch()
  const showLayout = useSelector(getShowLayout)
  const isComponentSelected = useSelector(getIsSelectedComponent(component.id))
  const isHovered = useSelector(getIsHovered(component.id))
  const focusInput = useSelector(getShowInputText)
  const useComponentFocused = useSelector(getFocusedComponent)

  const [, drag] = useDrag({
    item: { id: component.id, type: component.type, isMoved: true },
  })

  const ref = useRef<HTMLDivElement>(null)
  let props = {
    ...component.props,
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
      if (focusInput) {
        dispatch.app.toggleInputText()
        dispatch.app.toggleComponentFocused(false)
      }
    },
    onDoubleClick: (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (focusInput === false) {
        dispatch.app.toggleInputText()
        dispatch.app.toggleComponentFocused()
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
      boxShadow: `#4FD1C5 0px 0px 0px 2px inset`,
    }
  }

  if (isComponentSelected && focusInput) {
    props = {
      ...props,
      boxShadow: `#4FD1C5 0px 0px 0px 2px inset`,
    }
  }

  if (useComponentFocused && isComponentSelected) {
    props = {
      ...props,
      boxShadow: `#b80009 0px 0px 0px 2px inset`,
    }
  }

  return { props, ref: drag(ref), drag }
}
