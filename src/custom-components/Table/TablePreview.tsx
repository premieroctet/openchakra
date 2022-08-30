import { Box } from '@chakra-ui/react'
import React from 'react'

import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'

import Table from './Table'

const TablePreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [] as ComponentType[]
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      <Table
        dataSource={[
          { name: 'seb', age: 50 },
          { name: 'Jeff', age: 32 },
        ]}
      />
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Box>
  )
}

export default TablePreview
