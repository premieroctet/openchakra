import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { InputRightElement } from '@chakra-ui/react'

export const InputRightElementPreview: React.FC<IPreviewProps> = ({
  component,
  index,
}) => {
  const { props, ref } = useInteractive(component, index, true)
  const { drop, isOver } = useDropComponent(component.id, index, ref)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <InputRightElement
      top="10px"
      right="10px"
      {...props}
      index={index}
      ref={drop(ref)}
    >
      {component.children.map((key, i) => (
        <ComponentPreview key={key} componentName={key} index={i} />
      ))}
    </InputRightElement>
  )
}
