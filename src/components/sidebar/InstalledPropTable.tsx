import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import API from '~custom-components/api'
import useDispatch from '~hooks/useDispatch'

type installPropTable = {
  param: string
}

const InstalledPropTable = ({ param }: installPropTable) => {
  let paramList = JSON.parse(param)
  return (
    <TableContainer>
      <Table variant="simple" size="sm" maxWidth="max-content">
        <Thead>
          <Tr backgroundColor="#384150">
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Description</Th>
            <Th>Required</Th>
            <Th>Default</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paramList.map((property: Record<string, any>) => (
            <Tr key={property.name}>
              <Td>{property.name}</Td>
              <Td>{property.type}</Td>
              <Td>{property.description ? property.description : '-'}</Td>
              <Td>{property.required ? 'YES' : '-'}</Td>
              <Td>
                {property.default ? JSON.stringify(property.default) : '-'}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default InstalledPropTable
