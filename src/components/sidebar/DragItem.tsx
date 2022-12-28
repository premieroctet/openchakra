import React from 'react'
import { useDrag } from 'react-dnd'
import { Text, Box, IconButton } from '@chakra-ui/react'
import { DragHandleIcon, EditIcon } from '@chakra-ui/icons'

const DragItem: React.FC<ComponentItemProps> = ({
  type,
  soon,
  label,
  isMeta,
  isInstalled,
  isSelected,
  custom,
  isChild,
  rootParentType,
}) => {
  const [, drag] = useDrag({
    type,
    item: {
      id: type,
      type,
      isMeta,
      isInstalled,
      custom,
      rootParentType,
      isSelected,
    },
  })

  let boxProps: any = {
    cursor: 'no-drop',
    color: 'whiteAlpha.600',
  }

  if (!soon && !isSelected) {
    boxProps = {
      ref: drag,
      color: 'whiteAlpha.800',
      cursor: 'move',
      _hover: {
        ml: -1,
        mr: 1,
        bg: 'teal.100',
        boxShadow: 'sm',
        color: 'teal.800',
      },
    }
  }

  if (isChild) {
    boxProps = { ...boxProps, ml: 4 }
  }

  return (
    <Box
      boxSizing="border-box"
      transition="margin 200ms"
      my={1}
      borderRadius="md"
      p={1}
      display="flex"
      alignItems="center"
      {...boxProps}
    >
      <DragHandleIcon path="" fontSize="xs" mr={2} />
      <Text
        letterSpacing="wide"
        fontSize="sm"
        textTransform="capitalize"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {label}
      </Text>
      {isMeta && (
        <Box
          ml={2}
          borderWidth="1px"
          color="teal.300"
          borderColor="teal.600"
          fontSize="xs"
          borderRadius={4}
          px={1}
        >
          preset
        </Box>
      )}
      {/* {isInstalled && (
        <Box
          ml={2}
          borderWidth="1px"
          color="teal.300"
          borderColor="teal.600"
          fontSize="xs"
          borderRadius={4}
          px={1}
        >
        </Box>
      )} */}
      {soon && (
        <Box
          ml={2}
          borderWidth="1px"
          color="whiteAlpha.500"
          borderColor="whiteAlpha.300"
          fontSize="xs"
          borderRadius={4}
          px={1}
        >
          soon
        </Box>
      )}
    </Box>
  )
}

export default DragItem
