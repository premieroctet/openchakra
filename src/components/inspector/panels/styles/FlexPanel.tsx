import React, { memo, useEffect } from 'react'
import { Select } from '@chakra-ui/core'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const FlexPanel = () => {
  const { setValueFromEvent, setValue } = useForm()

  const alignItems = usePropsSelector('alignItems')
  const flexDirection = usePropsSelector('flexDirection')
  const justifyContent = usePropsSelector('justifyContent')

  useEffect(() => {
    if (!flexDirection) {
      setValue('flexDirection', 'column')
    }

    if (!alignItems) {
      setValue('alignItems', 'flex-start')
    }

    if (!justifyContent) {
      setValue('justifyContent', 'flex-start')
    }
  }, [alignItems, flexDirection, justifyContent, setValue])

  return (
    <>
      <FormControl label="Direction">
        <Select
          name="flexDirection"
          size="sm"
          value={flexDirection || ''}
          onChange={setValueFromEvent}
        >
          <option>row</option>
          <option>row-reverse</option>
          <option>column</option>
          <option>column-reverse</option>
        </Select>
      </FormControl>

      <FormControl label="Justify content">
        <Select
          name="justifyContent"
          size="sm"
          value={justifyContent || ''}
          onChange={setValueFromEvent}
        >
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
          <option>space-between</option>
          <option>space-around</option>
        </Select>
      </FormControl>

      <FormControl label="Align items">
        <Select
          name="alignItems"
          size="sm"
          value={alignItems || ''}
          onChange={setValueFromEvent}
        >
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
          <option>space-between</option>
          <option>space-around</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(FlexPanel)
