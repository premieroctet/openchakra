import React, { forwardRef } from 'react'
import { Text, Flex, BoxProps, Box } from '@chakra-ui/core'
import { SettingsIcon, ArrowUpDownIcon } from '@chakra-ui/icons'
import ActionButton from '~components/inspector/ActionButton'

interface Props extends Pick<IComponent, 'type'> {
  opacity?: number
  onSelect: BoxProps['onClick']
  onMouseOver: BoxProps['onMouseOver']
  onMouseOut: BoxProps['onMouseOut']
  draggable?: boolean
  name?: string
}

const ElementListItem = forwardRef(
  (
    {
      type,
      opacity = 1,
      onSelect,
      onMouseOut,
      onMouseOver,
      draggable,
      name,
    }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <Box
        boxSizing="border-box"
        transition="margin 200ms"
        my={1}
        borderRadius="md"
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
            {draggable && (
              //@ts-ignore
              <ArrowUpDownIcon fontSize="xs" mr={2} />
            )}
            <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
              {name || type}
            </Text>
          </Flex>
          <ActionButton
            label="Inspect"
            //@ts-ignore
            onClick={onSelect}
            //@ts-ignore
            icon={<SettingsIcon />}
            colorScheme="blackAlpha"
          />
        </Flex>
      </Box>
    )
  },
)

export default ElementListItem
