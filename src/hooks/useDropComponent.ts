import { useDrop, DropTargetMonitor, XYCoord } from 'react-dnd'
import { useSelector } from 'react-redux'
import builder from '~core/models/composer/builder'
import { getSortPosition } from '~core/selectors/components'
import { RootState } from '~core/store'
import { rootComponents } from '~utils/editor'
import useDispatch from './useDispatch'

export const useDropComponent = (
  componentId: string,
  index: number,
  ref: any,
  accept: (ComponentType | MetaComponentType)[] = rootComponents,
  canDrop: boolean = true,
) => {
  const dispatch = useDispatch()
  const isSortHovered = useSelector((state: RootState) =>
    Boolean(state.components.present.sortHoveredId),
  )
  const sortPosition = useSelector(getSortPosition())

  const moveChildren = (
    droppedId: string,
    targetId: string,
    position: string,
  ) => {
    dispatch.components.moveSelectedComponentChildren({
      droppedId,
      targetId,
      position,
    })
  }

  const [{ isOver }, drop] = useDrop({
    accept,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    hover: (item, monitor) => {
      if (!ref?.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      dispatch.components.sortUnhover()

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      if (dragIndex <= hoverIndex) {
        dispatch.components.sortHover({
          componentId,
          position: 'bottom',
        })
      }

      if (dragIndex > hoverIndex) {
        dispatch.components.sortHover({
          componentId,
          position: 'top',
        })
      }
    },
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return
      }
      dispatch.components.sortUnhover()

      const droppedId = item.id

      //const droppedId = item.id

      if (item.isMoved) {
        if (isSortHovered) {
          moveChildren(droppedId, componentId, sortPosition)
        } else {
          dispatch.components.moveComponent({
            parentId: componentId,
            componentId: item.id,
          })
        }
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
