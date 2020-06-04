import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useSelector } from 'react-redux'
import { rootComponents } from '../utils/editor'
import useDispatch from './useDispatch'
import { getComponents } from '../core/selectors/components'

export const useHoverComponent = (
  componentId: string,
  boundingPosition?: {
    top: number
    bottom: number
  },
  accept: (ComponentType | MetaComponentType)[] = rootComponents,
) => {
  const dispatch = useDispatch()
  const components = useSelector(getComponents)
  const [{ isOver }, drop] = useDrop({
    accept,
    hover: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (item.isMoved && boundingPosition) {
        if (componentId === item.id) {
          return
        }
        const selectedComponent = components[item.id]
        const { top, bottom } = boundingPosition
        const hoverMiddleY = (bottom - top) / 2
        const clientOffset = monitor.getClientOffset()
        const fromIndex = components[selectedComponent.parent].children.indexOf(
          item.id,
        )
        const toIndex = components[selectedComponent.parent].children.indexOf(
          componentId,
        )
        const hoverClientY = clientOffset && clientOffset.y - top

        if (toIndex === -1) return

        // check hasPassedMid
        if (fromIndex < toIndex && hoverClientY && hoverClientY < hoverMiddleY)
          return

        if (fromIndex > toIndex && hoverClientY && hoverClientY > hoverMiddleY)
          return
      
        dispatch.components.moveSelectedComponentChildren({
          parentId: selectedComponent.parent,
          fromIndex,
          toIndex: toIndex === -1 ? fromIndex : toIndex,
        })
      }
    },
  })

  return { hover: drop, isOver }
}
