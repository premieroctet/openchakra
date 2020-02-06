import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import {
  ConnectDragSource,
  ConnectDropTarget,
  DropTarget,
  DropTargetMonitor,
  DropTargetConnector,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  XYCoord,
} from 'react-dnd'
import { PseudoBox, Icon, Text } from '@chakra-ui/core'

interface Props extends Pick<IComponent, 'type'> {
  index: number
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
  moveItem: (dragIndex: number, hoverIndex: number) => void
  isDragging: boolean
  id: IComponent['id']
  onSelect: (id: IComponent['id']) => void
}

interface ChildElementInstance {
  getNode: () => HTMLDivElement | null
}

const ChildElement = forwardRef<HTMLDivElement, Props>(
  (
    { type, connectDragSource, connectDropTarget, isDragging, id, onSelect },
    ref,
  ) => {
    const elementRef = useRef<HTMLDivElement>(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    const opacity = isDragging ? 0 : 1
    useImperativeHandle<{}, ChildElementInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))

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
        ref={elementRef}
        onClick={onSelectChild}
      >
        <Icon fontSize="xs" mr={2} name="drag-handle" />
        <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
          {type}
        </Text>
      </PseudoBox>
    )
  },
)

export default DropTarget(
  'childElement',
  {
    hover(
      props: Props,
      monitor: DropTargetMonitor,
      component: ChildElementInstance,
    ) {
      if (!component) {
        return null
      }
      const node = component.getNode()
      if (!node) {
        return null
      }

      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = node.getBoundingClientRect()
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
      props.moveItem(dragIndex, hoverIndex)

      monitor.getItem().index = hoverIndex
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    'childElement',
    {
      beginDrag: (props: Props) => ({
        type: props.type,
        index: props.index,
        id: props.id,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(ChildElement),
)
