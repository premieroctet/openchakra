import { useRef, MouseEvent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import useDispatch from './useDispatch'
import { useDrag } from 'react-dnd'

export const useInteractive = (
  component: IComponent,
  enableVisualHelper: boolean = false,
) => {
  const dispatch = useDispatch()
  const showLayout = useSelector((state: RootState) => state.app.showLayout)
  const [, drag] = useDrag({
    item: { id: component.id, type: component.type, isMoved: true },
  })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      dispatch.app.select({
        id: component.id,
        rect: ref.current.getBoundingClientRect(),
      })
    }
  }, [component.id, component.props, dispatch.app])

  let props = {
    ...component.props,
    onMouseOver: (event: MouseEvent) => {
      if (ref && ref.current) {
        event.stopPropagation()
        dispatch.app.setOverlay({
          id: component.id,
          type: component.type,
          rect: ref.current.getBoundingClientRect(),
        })
      }
    },
    onMouseOut: () => {
      dispatch.app.setOverlay(undefined)
    },
    onClick: (event: MouseEvent) => {
      if (ref && ref.current) {
        event.stopPropagation()
        dispatch.app.select({
          id: component.id,
          rect: ref.current.getBoundingClientRect(),
        })
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

  return { props, ref: drag(ref), drag }
}
