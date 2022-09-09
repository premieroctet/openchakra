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

  const filenameImg = `${type.replace('Meta', '').toUpperCase()}.svg`

  if (isChild) {
    boxProps = { ...boxProps }
  }

  return (
    <Box
      boxSizing="border-box"
      position={'relative'}
      transition="all 200ms"
      bg="whiteAlpha.900"
      p={3}
      display="flex"
      flexDirection="column"
      boxShadow="md"
      alignItems="center"
      justifyContent={'center'}
      height={'100%'}
      {...boxProps}
    >
      <img src={`/icons/components/${filenameImg}`} width={70} alt="" />
      <Text
        color="gray.900"
        letterSpacing="wide"
        fontSize="xs"
        mt={'-8px'}
        textAlign={'center'}
        wordBreak={'break-all'}
        textTransform="capitalize"
      >
        {label}
      </Text>
      {isMeta && (
        <Box
          position={'absolute'}
          top="3px"
          right="3px"
          borderWidth="1px"
          color="teal.300"
          borderColor="teal.300"
          fontSize="10px"
          borderRadius="xl"
          px={1}
        >
          preset
        </Box>
      )}
      {/*{soon && (
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
