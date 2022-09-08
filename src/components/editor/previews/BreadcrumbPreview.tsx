import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Box, Breadcrumb } from '@chakra-ui/react'

const BreadcrumbPreview: React.FC<IPreviewProps> = ({ component, index }) => {
  const acceptedTypes = ['BreadcrumbItem', 'BreadcrumbLink'] as ComponentType[]
  const { props, ref } = useInteractive(component, index, false)
  const { drop, isOver } = useDropComponent(
    component.id,
    index,
    ref,
    acceptedTypes,
  )

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Breadcrumb {...props}>
        {component.children.map((key, i) => (
          <ComponentPreview key={key} componentName={key} index={i} />
        ))}
      </Breadcrumb>
    </Box>
  )
}

export default BreadcrumbPreview
