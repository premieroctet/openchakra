import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useSelector } from 'react-redux'
import { rootComponents } from '../utils/editor'
import useDispatch from './useDispatch'
import builder from '../core/models/composer/builder'
import { getComponents } from '../core/selectors/components'

export const useDropComponent = (
  componentId: string,
  accept: (ComponentType | MetaComponentType)[] = rootComponents,
  canDrop: boolean = true,
  canSwap: boolean = false,
  boundingPosition?: {
    top: number
    bottom: number
    right: number
    left: number
  },
) => {
  const dispatch = useDispatch()
  const components = useSelector(getComponents)
  const [{ isOver }, drop] = useDrop({
    accept,
    hover: (item, monitor) => {
      if (canSwap && item.isMoved && boundingPosition) {
        if (componentId === item.id) {
          return
        }
        const selectedComponent = components[item.id]
        const { top, bottom, left, right } = boundingPosition
        const hoverMiddleX = (right - left) / 2
        const hoverMiddleY = (bottom - top) / 2
        const clientOffset = monitor.getClientOffset()
        const fromIndex = components[selectedComponent.parent].children.indexOf(
          item.id,
        )
        const toIndex = components[selectedComponent.parent].children.indexOf(
          componentId,
        )
        const hoverClientX = clientOffset && clientOffset.x - left
        const hoverClientY = clientOffset && clientOffset.y - top
    

        // Dragging downwards & rightwards
        if (
          fromIndex < toIndex &&
          ((hoverClientY && hoverClientY < hoverMiddleY) ||
            (hoverClientX && hoverClientX < hoverMiddleX))
        )
          return

        // Dragging upwards & leftwards
        if (
          fromIndex > toIndex &&
          ((hoverClientY && hoverClientY > hoverMiddleY) ||
            (hoverClientX && hoverClientX > hoverMiddleX))
        )
          return

        dispatch.components.moveSelectedComponentChildren({
          parentId: selectedComponent.parent,
          fromIndex,
          toIndex,
        })
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return
      }
      if (canSwap) {
        return
      } else if (item.isMoved) {
        dispatch.components.moveComponent({
          parentId: componentId,
          componentId: item.id,
        })
      } else if (item.isMeta) {
        dispatch.components.addMetaComponent(builder[item.type](componentId))
      } else {
        dispatch.components.addComponent({
          parentName: componentId,
          type: item.type,
          rootParentType: item.rootParentType,
        })
      }
    },
    canDrop: () => canDrop,
  })

  return { drop, isOver }
}
