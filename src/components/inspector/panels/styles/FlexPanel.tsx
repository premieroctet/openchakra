import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import useBreakpoints from '~hooks/useBreakpoints'

const FlexPanel = ({bkpt}: {bkpt : string}) => {

  const {responsiveValues: alignItemsResponsiveValues, handleBreakpoints} = useBreakpoints('alignItems')
  const {responsiveValues: flexDirectionResponsiveValues } = useBreakpoints('flexDirection')
  const {responsiveValues: justifyContentResponsiveValues } = useBreakpoints('justifyContent')

  return (
    <>
      <FormControl label="Direction">
        <Select
          name={`${bkpt}-flexDirection`}
          size="sm"
          value={flexDirectionResponsiveValues?.[bkpt] || ''}
          onChange={e => handleBreakpoints(e, flexDirectionResponsiveValues)}
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
          value={justifyContentResponsiveValues?.[bkpt] || ''}
          onChange={e => handleBreakpoints(e, justifyContentResponsiveValues)}
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
          value={alignItemsResponsiveValues?.[bkpt] || ''}
          onChange={e => handleBreakpoints(e, alignItemsResponsiveValues)}
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
