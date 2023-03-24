import { useRef, MouseEvent } from 'react'
import { useSelector } from 'react-redux'
import useDispatch from './useDispatch'
import { useDrag } from 'react-dnd'
import {
  getIsSelectedComponent,
  getIsHovered,
} from '../core/selectors/components'
import { getShowOverview, getFocusedComponent } from '../core/selectors/app'
import { isJsonString } from '../dependencies/utils/misc'

export const useInteractive = (
  component: IComponent,
  enableVisualHelper: boolean = false,
) => {
  const dispatch = useDispatch()
  const showOverview = useSelector(getShowOverview)
  const isComponentSelected = useSelector(getIsSelectedComponent(component.id))
  const isHovered = useSelector(getIsHovered(component.id))
  const focusInput = useSelector(getFocusedComponent(component.id))

  const [, drag] = useDrag({
    item: { id: component.id, type: component.type, isMoved: true },
  })

  const whatTheProps = Object.fromEntries(
    Object.entries(component.props).map(([key, data]) => [
      key,
      typeof data === 'string' && isJsonString(data) ? JSON.parse(data) : data,
    ]),
  )

  const ref = useRef<HTMLDivElement>(null)
  let props = {
    id: component.id,
    ...whatTheProps,
    onMouseOver: (event: MouseEvent) => {
      event.stopPropagation()
      dispatch.project.hover(component.id)
    },
    onMouseOut: () => {
      dispatch.project.unhover()
    },
    onClick: (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      dispatch.project.select(component.id)
    },
    onDoubleClick: (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (focusInput === false) {
        dispatch.app.toggleInputText()
      }
    },
  }

  if (showOverview && enableVisualHelper) {
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
