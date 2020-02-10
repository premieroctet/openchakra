import React from 'react'
import { RadioGroup, Box } from '@chakra-ui/core'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import ComponentPreview from '../ComponentPreview'

export const RadioGroupPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  const propsBox: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box {...propsBox} ref={drop(ref)}>
      <RadioGroup {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </RadioGroup>
    </Box>
  )
}
