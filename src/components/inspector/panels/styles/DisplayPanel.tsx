import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import FlexPanel from './FlexPanel'
import useBreakpoints from '~hooks/useBreakpoints'


const DisplayPanel = () => {
  
  const emotionProp = 'display'
  const availableOptions = [
    '',
    'block',
    'flex',
    'inline',
    'grid',
    'inline-block'
  ]
  const {responsiveValues, settledBreakpoints, handleBreakpoints, AddABreakpoint} = useBreakpoints(emotionProp)

  return (
    <>
      {settledBreakpoints.map((breakpoint: string, i: number) => (
          <div key={i}>
            {breakpoint}
            <FormControl label="Display">
              <Select
                size="sm"
                value={responsiveValues?.[breakpoint] || ''}
                onChange={e => handleBreakpoints(e, responsiveValues)}
                name={`${breakpoint}-${emotionProp}`}
              >
                {availableOptions.map((option, i) => <option key={`ao${i}`} >{option}</option>)}
              </Select>
            </FormControl>
            {responsiveValues?.[breakpoint] === 'flex' && <FlexPanel bkpt={breakpoint} />}
          </div>
        )
      )}

      <AddABreakpoint availableOptions={availableOptions} currentProps={responsiveValues}  />

    </>
  )
}

export default memo(DisplayPanel)
