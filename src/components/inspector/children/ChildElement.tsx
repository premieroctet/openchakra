import React, { useRef } from 'react'
import { XYCoord, useDrop, DragObjectWithType, useDrag } from 'react-dnd'
import { PseudoBox, Icon, Text } from '@chakra-ui/core'

interface Props extends Pick<IComponent, 'type'> {
  index: number
  moveItem: (dragIndex: number, hoverIndex: number) => void
  id: IComponent['id']
  onSelect: (id: IComponent['id']) => void
}

const ITEM_TYPE = 'childElement'

const ChildElement: React.FC<Props> = ({
  type,
  id,
  onSelect,
  moveItem,
  index,
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
      moveItem(dragIndex, hoverIndex)
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

  const onSelectChild = () => {
    onSelect(id)
  }

  return (
    <PseudoBox
      boxSizing="border-box"
      transition="margin 200ms"
      my={1}
      rounded="md"
      p={1}
      display="flex"
      alignItems="center"
      cursor="move"
      opacity={opacity}
      ref={ref}
      onClick={onSelectChild}
    >
      <Icon fontSize="xs" mr={2} name="drag-handle" />
      <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
        {type}
      </Text>
    </PseudoBox>
  )
}

export default ChildElement
