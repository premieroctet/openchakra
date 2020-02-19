import React from 'react'
import { useDrag } from 'react-dnd'
import { Text, PseudoBox, Icon, Box } from '@chakra-ui/core'

const DragItem: React.FC<ComponentItemProps> = ({
  type,
  soon,
  label,
  isMeta,
  isChild,
  rootParentType,
  isUserComponent,
}) => {
  const [, drag] = useDrag({
    item: { id: type, type, isMeta, rootParentType, isUserComponent, label },
  })

  let boxProps: any = {
    cursor: 'no-drop',
    color: 'whiteAlpha.600',
  }

  if (!soon) {
    boxProps = {
      ref: drag,
      color: 'whiteAlpha.800',
      cursor: 'move',
      _hover: {
        ml: -1,
        mr: 1,
        bg: 'teal.100',
        shadow: 'sm',
        color: 'teal.800',
      },
    }
  }

  if (isChild) {
    boxProps = { ...boxProps, ml: 4 }
  }

  if (isUserComponent) {
    boxProps = { ...boxProps, color: 'yellow.100' }
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
      {...boxProps}
    >
      <Icon fontSize="xs" mr={2} name="drag-handle" />

      <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
        {label}
      </Text>

      {isUserComponent && (
        <Box
          ml={2}
          borderWidth="1px"
          color="yellow.100"
          borderColor="yellow.100"
          fontSize="xs"
          rounded={4}
          px={1}
        >
          custom
        </Box>
      )}

      {isMeta && (
        <Box
          ml={2}
          borderWidth="1px"
          color="teal.300"
          borderColor="teal.600"
          fontSize="xs"
          rounded={4}
          px={1}
        >
          preset
        </Box>
      )}

      {soon && (
        <Box
          ml={2}
          borderWidth="1px"
          color="whiteAlpha.500"
          borderColor="whiteAlpha.300"
          fontSize="xs"
          rounded={4}
          px={1}
        >
          soon
        </Box>
      )}
    </PseudoBox>
  )
}

export default DragItem
