import { Select } from '@chakra-ui/react'
import React, { memo } from 'react'

import FormControl from '~components/inspector/controls/FormControl'
import useBreakpoints from '~hooks/useBreakpoints'

import SwitchControl from '../../controls/SwitchControl';

const FlexPanel = ({ bkpt = 'base' }: { bkpt?: string }) => {
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
          onChange={e =>
            handleBreakpoints('flexDirection', bkpt, e.currentTarget.value)
          }
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
          onChange={e =>
            handleBreakpoints('justifyContent', bkpt, e.currentTarget.value)
          }
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
          onChange={e =>
            handleBreakpoints('alignItems', bkpt, e.currentTarget.value)
          }
        >
          <option>stretch</option>
          <option>flex-start</option>
          <option>center</option>
          <option>flex-end</option>
          <option>space-between</option>
          <option>space-around</option>
        </Select>
      </FormControl>

      <SwitchControl label={'Use as a filter'} name={'isFilterComponent'}/>
    </>
  )
}

export default memo(FlexPanel)
