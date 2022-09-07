import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { InputLeftElement } from '@chakra-ui/react'

export const InputLeftElementPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <InputLeftElement top="10px" right="10px" {...props} ref={drop(ref)}>
      {component.children.map((key: string, i: number) => (
        <ComponentPreview key={i} componentName={key} />
      ))}
    </InputLeftElement>
  )
}
