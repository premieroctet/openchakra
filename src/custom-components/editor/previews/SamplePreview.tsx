import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box, Center, Button, Text } from '@chakra-ui/react'
import icons from '~iconsList'

interface Props {
  component: IComponent
}

const SamplePreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  if (props.leftIcon) {
    if (Object.keys(icons).includes(props.leftIcon)) {
      const Icon = icons[props.leftIcon as keyof typeof icons]
      props.leftIcon = <Icon path="" />
    } else {
      props.leftIcon = undefined
    }
  }

  if (props.rightIcon) {
    if (Object.keys(icons).includes(props.rightIcon)) {
      const Icon = icons[props.rightIcon as keyof typeof icons]
      props.rightIcon = <Icon path="" />
    } else {
      props.rightIcon = undefined
    }
  }

  return (
    <Box {...props} ref={ref}>
      <Center
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        m={16}
        p={8}
        backgroundColor="cyan.100"
        bgGradient="linear(to right, green.200,blue.500)"
      >
        <Text
          opacity={1}
          fontWeight="bold"
          fontSize="lg"
          letterSpacing="widest"
        >
          Some text blah blah blah
        </Text>
        <Button
          variant="ghost"
          size="md"
          bgGradient="linear(to right, messenger.500,green.500)"
          borderRadius={100}
          border={20}
        >
          Test button
        </Button>
      </Center>
    </Box>
  )
}

export default SamplePreview
