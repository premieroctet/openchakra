import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Thead,
  Tr,
} from '@chakra-ui/react'
import ComponentPreview from '~components/editor/ComponentPreview'

const acceptedTypesTableContainer: ComponentType[] = ['Table']

const TableContainerPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(
    component.id,
    acceptedTypesTableContainer,
  )

  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <TableContainer {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </TableContainer>
    </Box>
  )
}

const acceptedTypesTable: ComponentType[] = [
  'TableCaption',
  'Thead',
  'Tbody',
  'Tfoot',
]

export const TablePreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesTable)

  let boxProps: any = { border: '1px solid red' }

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...props} border="1px solid green">
      <Table {...component.props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Table>
    </Box>
  )
}

const acceptedTypesThead: ComponentType[] = ['Tr']

export const TheadPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesThead)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Thead ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Thead>
  )
}

const acceptedTypesTr: ComponentType[] = ['Th', 'Td']

export const TrPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesTr)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={drop(ref)} {...props} border="1px solid green">
      <Tr {...component.props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Tr>
    </Box>
  )
}

export const TbodyPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesThead)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Tbody ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Tbody>
  )
}

export const TfootPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypesThead)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Tfoot ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Tfoot>
  )
}

export default TableContainerPreview
