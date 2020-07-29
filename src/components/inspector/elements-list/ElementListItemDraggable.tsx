import React, { useRef } from 'react'
import { XYCoord, useDrop, DragObjectWithType, useDrag } from 'react-dnd'
import ElementListItem from './ElementListItem'

interface Props extends Pick<IComponent, 'type' | 'id'> {
  index: number
  moveItem?: (dragIndex: number, hoverIndex: number) => void
  onSelect: (id: IComponent['id']) => void
  onHover: (id: IComponent['id']) => void
  onUnhover: () => void
  name?: string
}

const ITEM_TYPE = 'elementItem'

const ElementListItemDraggable: React.FC<Props> = ({
  type,
  id,
  onSelect,
  moveItem,
  index,
  onHover,
  onUnhover,
  name,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: DragObjectWithType, monitor) {
      if (!ref.current) {
        return
      }
      // @ts-ignore
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      if (moveItem) {
        moveItem(dragIndex, hoverIndex)
      }
      // @ts-ignore
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ITEM_TYPE, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  const onSelectElement = () => {
    onSelect(id)
  }

  const onMouseOver = () => {
    onHover(id)
  }

  return (
    <ElementListItem
      ref={ref}
      onSelect={onSelectElement}
      opacity={opacity}
      onMouseOver={onMouseOver}
      onMouseOut={onUnhover}
      type={type}
      draggable
      name={name}
    />
  )
}

export default ElementListItemDraggable
