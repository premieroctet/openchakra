import React from 'react'
import { Link, Box, Stack } from '@chakra-ui/core'

import Panels from './panels/Panels'
import { GoRepo } from 'react-icons/go'
import { FiTrash2 } from 'react-icons/fi'
import { IoMdRefresh } from 'react-icons/io'
import { useSelector } from 'react-redux'
import useDispatch from '../../hooks/useDispatch'
import QuickPropsPanel from './QuickPropsPanel'
import StylesPanel from './panels/StylesPanel'
import { getSelectedComponent } from '../../core/selectors/components'
import ActionButton from './ActionButton'

const Inspector = () => {
  const dispatch = useDispatch()
  const component = useSelector(getSelectedComponent)

  const { type, rootParentType, id, children } = component

  const isRoot = id === 'root'

  const docType = rootParentType || type
  const componentHasChildren = children.length > 0

  return (
    <>
      <Box bg="white">
        <Box
          fontWeight="semibold"
          fontSize="md"
          color="yellow.900"
          rounded="md"
          py={2}
          px={2}
          shadow="sm"
          bg="yellow.100"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {isRoot ? 'Document' : type}
        </Box>
        {!isRoot && (
          <Stack
            isInline
            py={2}
            spacing={4}
            mb={3}
            align="center"
            zIndex={99}
            px={2}
            flexWrap="wrap"
          >
            <ActionButton
              label="Reset"
              icon={IoMdRefresh}
              onClick={() => dispatch.components.resetProps(component.id)}
            />
            <ActionButton
              label="Doc"
              as={Link}
              onClick={() => {
                window.open(
                  `https://chakra-ui.com/${docType.toLowerCase()}`,
                  '_blank',
                )
              }}
              icon={GoRepo}
            />
            <ActionButton
              label="Duplicate"
              onClick={() => dispatch.components.duplicate()}
              icon="copy"
            />
            <ActionButton
              bg="red.500"
              label="Remove"
              onClick={() => dispatch.components.deleteComponent(component.id)}
              icon={FiTrash2}
            />
          </Stack>
        )}
      </Box>

      <Box bg="white" px={3}>
        {!isRoot && <QuickPropsPanel />}
        <Panels component={component} />
      </Box>

      <StylesPanel isRoot={isRoot} showChildren={componentHasChildren} />
    </>
  )
}

export default Inspector
