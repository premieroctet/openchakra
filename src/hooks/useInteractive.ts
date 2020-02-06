import { useRef, MouseEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import useDispatch from './useDispatch'
import { useDrag } from 'react-dnd'
import { getSelectedComponentId } from '../core/selectors/components'
import { getShowLayout } from '../core/selectors/app'

export const useInteractive = (
  component: IComponent,
  enableVisualHelper: boolean = false,
) => {
  const dispatch = useDispatch()
  const [hover, setHover] = useState(false)
  const showLayout = useSelector(getShowLayout)
  const selectedId = useSelector(getSelectedComponentId)
  const [, drag] = useDrag({
    item: { id: component.id, type: component.type, isMoved: true },
  })

  const ref = useRef<HTMLDivElement>(null)

  let props = {
    ...component.props,
    onMouseOver: (event: MouseEvent) => {
      event.stopPropagation()
      setHover(true)
    },
    onMouseOut: () => {
      setHover(false)
    },
    onClick: (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      dispatch.components.select(component.id)
    },
  }

  if (showLayout && enableVisualHelper) {
    props = {
      ...props,
      border: `1px dashed #718096`,
      padding: props.p || props.padding ? props.p || props.padding : 4,
    }
  }

  if (hover || selectedId === component.id) {
    props = {
      ...props,
      boxShadow: `#4FD1C5 0px 0px 0px 2px inset`,
    }
  }

  return { props, ref: drag(ref), drag }
}
