import React, { memo } from 'react'
import {
  Select,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/core'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const PositionPanel = () => {
  const { setValueFromEvent } = useForm()
  const pos = usePropsSelector('position')

  const left = usePropsSelector('left')
  const right = usePropsSelector('right')
  const bottom = usePropsSelector('bottom')
  const top = usePropsSelector('top')

  return (
    <>
      <FormControl label="Position">
        <Select
          name="position"
          size="sm"
          value={pos}
          onChange={setValueFromEvent}
        >
          <option>relative</option>
          <option>absolute</option>
          <option>fixed</option>
          <option>static</option>
          <option>sticky</option>
        </Select>
      </FormControl>

      <SimpleGrid columns={2} spacing={1}>
        <InputGroup size="sm">
          <InputLeftElement
            children={<Icon fontSize="md" name="arrow-back" color="gray.300" />}
          />
          <Input
            placeholder="left"
            size="sm"
            type="text"
            name={'left'}
            value={left || ''}
            onChange={setValueFromEvent}
            autoComplete="off"
          />
        </InputGroup>

        <InputGroup size="sm">
          <InputLeftElement
            children={
              <Icon fontSize="md" name="arrow-forward" color="gray.300" />
            }
          />
          <Input
            placeholder="right"
            size="sm"
            type="text"
            value={right || ''}
            name={'right'}
            onChange={setValueFromEvent}
            autoComplete="off"
          />
        </InputGroup>

        <InputGroup size="sm">
          <InputLeftElement
            children={<Icon fontSize="md" name="arrow-up" color="gray.300" />}
          />
          <Input
            placeholder="top"
            size="sm"
            type="text"
            value={top || ''}
            name={'top'}
            onChange={setValueFromEvent}
            autoComplete="off"
          />
        </InputGroup>

        <InputGroup size="sm">
          <InputLeftElement
            children={
              <Icon fontSize="md" name="chevron-down" color="gray.300" />
            }
          />
          <Input
            placeholder="bottom"
            size="sm"
            type="text"
            value={bottom || ''}
            name={'bottom'}
            onChange={setValueFromEvent}
            autoComplete="off"
          />
        </InputGroup>
      </SimpleGrid>
      {/* </FormControl> */}
    </>
  )
}

export default memo(PositionPanel)
