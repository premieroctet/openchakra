import React, { forwardRef } from 'react'
import {
  Icon,
  PseudoBox,
  Text,
  PseudoBoxProps,
  Flex,
  IconButton,
} from '@chakra-ui/core'

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
        cursor={draggable ? 'move' : undefined}
        opacity={opacity}
        ref={ref}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <Flex justify="space-between" align="center" w="100%">
          <Flex align="center">
            {draggable && <Icon fontSize="xs" mr={2} name="drag-handle" />}
            <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
              {type}
            </Text>
          </Flex>
          <IconButton
            onClick={onSelect}
            variant="ghost"
            icon="arrow-forward"
            size="xs"
            aria-label={`access ${type} element`}
          />
        </Flex>
      </PseudoBox>
    )
  },
)

export default ElementListItem
