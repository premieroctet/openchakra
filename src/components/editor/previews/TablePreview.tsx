import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Table, Tr, TableContainer, Box } from '@chakra-ui/react'

const TablePreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    'TableCaption',
    'THead',
    'TBody',
    'TFoot',
  ] as ComponentType[]
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps} {...props}>
      <TableContainer>
        <Table {...props}>
          {component.children.map((key: string) => (
            <ComponentPreview key={key} componentName={key} />
          ))}
        </Table>
      </TableContainer>
    </Box>
  )
}

export const TrPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = ['Td', 'Th'] as ComponentType[]
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Tr {...props} ref={drop(ref)}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Tr>
  )
}

export default TablePreview
