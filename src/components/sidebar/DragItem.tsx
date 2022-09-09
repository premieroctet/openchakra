import React from 'react'
import { useDrag } from 'react-dnd'
import { Text, Box } from '@chakra-ui/react'

const DragItem: React.FC<ComponentItemProps> = ({
  type,
  soon,
  label,
  isMeta,
  isChild,
  rootParentType,
}) => {
  const [, drag] = useDrag({
    item: { id: type, type, isMeta, rootParentType },
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
        bg: 'teal.100',
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
      bg="whiteAlpha.900"
      p={1}
      display="flex"
      flexDirection="column"
      boxShadow="md"
      alignItems="center"
      justifyContent={'center'}
      height={'100%'}
      {...boxProps}
    >
      <img
        src={`/icons/components/${[type.toUpperCase()]}.svg`}
        width={45}
        alt=""
      />
      <Text
        color="gray.900"
        letterSpacing="wide"
        fontSize="sm"
        wordBreak={'break-all'}
        textTransform="capitalize"
      >
        {label}
      </Text>
      {/* {isMeta && (
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
      )}*/}
    </Box>
  )
}

export default DragItem
