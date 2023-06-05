import React from 'react'
import { Box } from '@chakra-ui/react'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import IconCheck from '~dependencies/custom-components/IconCheck'

const IconCheckPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" ref={drop(ref)} >
      <IconCheck {...props} >
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
      </IconCheck>
    </Box>
  )
}

export default IconCheckPreview
