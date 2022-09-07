import React, { memo } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Box,
} from '@chakra-ui/react'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

type PaddingPanelPropsType = {
  type: 'margin' | 'padding'
}

const ATTRIBUTES = {
  margin: {
    all: 'm',
    left: 'ml',
    right: 'mr',
    bottom: 'mb',
    top: 'mt',
  },
  padding: {
    all: 'p',
    left: 'pl',
    right: 'pr',
    bottom: 'pb',
    top: 'pt',
  },
}

const PaddingPanel = ({ type }: PaddingPanelPropsType) => {
  const { setValueFromEvent } = useForm()

  const all = usePropsSelector(ATTRIBUTES[type].all)
  const left = usePropsSelector(ATTRIBUTES[type].left)
  const right = usePropsSelector(ATTRIBUTES[type].right)
  const bottom = usePropsSelector(ATTRIBUTES[type].bottom)
  const top = usePropsSelector(ATTRIBUTES[type].top)

  return (
    <Box mb={4}>
      <FormControl>
        <FormLabel fontSize="xs" htmlFor="width" textTransform="capitalize">
          {type}
        </FormLabel>

        <InputGroup size="sm">
          <Input
            mb={1}
            placeholder="All"
            size="sm"
            type="text"
            name={ATTRIBUTES[type].all}
            value={all || ''}
            onChange={setValueFromEvent}
          />
        </InputGroup>

        <SimpleGrid columns={2} spacing={1}>
          <InputGroup size="sm">
            <InputLeftElement>
              <ArrowBackIcon path="" fontSize="md" color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="left"
              size="sm"
              type="text"
              name={ATTRIBUTES[type].left}
              value={left || ''}
              onChange={setValueFromEvent}
              autoComplete="off"
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftElement>
              <ArrowForwardIcon path="" fontSize="md" color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="right"
              size="sm"
              type="text"
              value={right || ''}
              name={ATTRIBUTES[type].right}
              onChange={setValueFromEvent}
              autoComplete="off"
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftElement>
              <ArrowUpIcon path="" fontSize="md" color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="top"
              size="sm"
              type="text"
              value={top || ''}
              name={ATTRIBUTES[type].top}
              onChange={setValueFromEvent}
              autoComplete="off"
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftElement>
              <ChevronDownIcon path="" fontSize="md" color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="bottom"
              size="sm"
              type="text"
              value={bottom || ''}
              name={ATTRIBUTES[type].bottom}
              onChange={setValueFromEvent}
              autoComplete="off"
            />
          </InputGroup>
        </SimpleGrid>
      </FormControl>
    </Box>
  )
}

export default memo(PaddingPanel)
