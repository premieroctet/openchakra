import React from 'react'
import { InputGroup, Box } from '@chakra-ui/react'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'

const InputGroupPreview: React.FC<IPreviewProps> = ({ component, index }) => {
  const { props, ref } = useInteractive(component, index, true)
  const { drop, isOver } = useDropComponent(component.id, index, ref)

  const boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box {...boxProps} ref={drop(ref)}>
      <InputGroup {...props}>
        {component.children.map((key, i) => (
          <ComponentPreview key={key} componentName={key} index={i} />
        ))}
      </InputGroup>
    </Box>
  )
}

export default InputGroupPreview
