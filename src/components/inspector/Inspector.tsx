import React from 'react'
import { Link, Box, IconButton } from '@chakra-ui/core'

import Panels from './panels/Panels'
import { GoRepo } from 'react-icons/go'
import { FiTrash2 } from 'react-icons/fi'
import { IoMdRefresh } from 'react-icons/io'
import { useSelector } from 'react-redux'
import useDispatch from '../../hooks/useDispatch'
import QuickPropsPanel from './QuickPropsPanel'
import StylesPanel from './panels/StylesPanel'
import { Tooltip } from '@chakra-ui/core'
import { getSelectedComponent } from '../../core/selectors/components'

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
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {isRoot ? 'Document' : type}
          <Box>
            {!isRoot && (
              <>
                <Tooltip hasArrow aria-label="Reset" label="Reset">
                  <IconButton
                    size="xs"
                    variant="ghost"
                    aria-label="Reset"
                    onClick={() => dispatch.components.resetProps(component.id)}
                    icon={IoMdRefresh}
                  />
                </Tooltip>
                <Tooltip hasArrow aria-label="Doc" label="Doc">
                  <IconButton
                    size="xs"
                    variant="ghost"
                    as={Link}
                    onClick={() => {
                      window.open(
                        `https://chakra-ui.com/${docType.toLowerCase()}`,
                        '_blank',
                      )
                    }}
                    aria-label="Doc"
                    icon={GoRepo}
                  />
                </Tooltip>

                <Tooltip
                  bg="red.500"
                  hasArrow
                  aria-label="Remove"
                  label="Remove"
                >
                  <IconButton
                    size="xs"
                    variant="ghost"
                    onClick={() =>
                      dispatch.components.deleteComponent(component.id)
                    }
                    aria-label="Remove"
                    icon={FiTrash2}
                  />
                </Tooltip>
              </>
            )}
          </Box>
        </Box>
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
