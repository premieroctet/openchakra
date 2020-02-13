import React, { forwardRef } from 'react'
import { Icon, PseudoBox, Text, PseudoBoxProps } from '@chakra-ui/core'

interface Props extends Pick<IComponent, 'type'> {
  opacity?: number
  onSelect: PseudoBoxProps['onClick']
  onMouseOver: PseudoBoxProps['onMouseOver']
  onMouseOut: PseudoBoxProps['onMouseOut']
  draggable?: boolean
}

const ElementListItem = forwardRef(
  (
    { type, opacity = 1, onSelect, onMouseOut, onMouseOver, draggable }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <PseudoBox
        boxSizing="border-box"
        transition="margin 200ms"
        my={1}
        rounded="md"
        p={1}
        display="flex"
        alignItems="center"
        cursor={draggable ? 'move' : 'pointer'}
        opacity={opacity}
        ref={ref}
        onClick={onSelect}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {draggable && <Icon fontSize="xs" mr={2} name="drag-handle" />}
        <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
          {type}
        </Text>
      </PseudoBox>
    )
  },
)

export default ElementListItem
