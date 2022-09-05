import React, { memo } from 'react'
import { SimpleGrid, Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'
import { useForm } from '~hooks/useForm'
import TextControl from '~components/inspector/controls/TextControl'

const DimensionPanel = () => {
  const { setValueFromEvent } = useForm()
  const overflow = usePropsSelector('overflow')

  return (
    <>
      <SimpleGrid columns={2} spacingX={1}>
        <TextControl label="Width" name="width" />
        <TextControl label="Height" name="height" />
      </SimpleGrid>

      <SimpleGrid columns={2} spacingX={1}>
        <TextControl label="Min W" name="minWidth" />
        <TextControl label="Min H" name="minHeight" />

        <TextControl label="Max W" name="maxWidth" />
        <TextControl label="Max H" name="maxHeight" />
      </SimpleGrid>

      <FormControl label="Overflow">
        <Select
          size="sm"
          value={overflow || ''}
          onChange={setValueFromEvent}
          name="overflow"
        >
          <option>visible</option>
          <option>hidden</option>
          <option>scroll</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(DimensionPanel)
