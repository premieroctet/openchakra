import React from 'react'
import { InputGroup, Box } from '@chakra-ui/core'
import ComponentPreview from '../ComponentPreview'
import { useDropComponent } from '../../../hooks/useDropComponent'
import { useInteractive } from '../../../hooks/useInteractive'

const InputGroupPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  const boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box {...boxProps} ref={drop(ref)}>
      <InputGroup ref={drop(ref)} {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview componentName={key} />
        ))}
      </InputGroup>
    </Box>
  )
}

export default InputGroupPreview
