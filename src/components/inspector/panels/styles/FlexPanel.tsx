import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import useBreakpoints from '~hooks/useBreakpoints'

const FlexPanel = ({ bkpt = 'base' }: { bkpt: string }) => {
  const { responsiveValues, handleBreakpoints } = useBreakpoints([
    'alignItems',
    'flexDirection',
    'justifyContent',
  ])
  const { alignItems, flexDirection, justifyContent } = responsiveValues

  return (
    <>
      <FormControl label="Direction">
        <Select
          name={`${bkpt}-flexDirection`}
          size="sm"
          value={flexDirection?.[bkpt] || ''}
          onChange={handleBreakpoints}
        >
          <option>row</option>
          <option>row-reverse</option>
          <option>column</option>
          <option>column-reverse</option>
        </Select>
      </FormControl>

      <FormControl label="Justify content">
        <Select
          name={`${bkpt}-justifyContent`}
          size="sm"
          value={justifyContent?.[bkpt] || ''}
          onChange={handleBreakpoints}
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
          name={`${bkpt}-alignItems`}
          size="sm"
          value={alignItems?.[bkpt] || ''}
          onChange={handleBreakpoints}
        >
          <option>stretch</option>
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
