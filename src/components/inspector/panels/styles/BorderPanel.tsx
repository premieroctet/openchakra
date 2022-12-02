import React, { memo } from 'react'
import { Box, Input } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import useBreakpoints from '~hooks/useBreakpoints'

const BorderPanel = () => {
  const {
    responsiveValues,
    settledBreakpoints,
    handleBreakpoints,
    AddABreakpoint,
  } = useBreakpoints(['border', 'borderRadius'])

  return (
    <>
      {settledBreakpoints.map((breakpoint: string, i: number) => (
        <Box key={i}>
          {breakpoint}
          <FormControl
            key={`border-${i}`}
            htmlFor={`${breakpoint}-border`}
            label={'border'}
          >
            <Input
              id={`${breakpoint}-border`}
              size="sm"
              type="text"
              name={`${breakpoint}-border`}
              value={responsiveValues['border']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints('border', breakpoint, e.currentTarget.value)
              }
              autoComplete="off"
            />
          </FormControl>

          <FormControl
            key={`borderRadius-${i}`}
            htmlFor={`${breakpoint}-borderRadius`}
            label={'borderRadius'}
          >
            <Input
              id={`${breakpoint}-borderRadius`}
              size="sm"
              type="text"
              name={`${breakpoint}-borderRadius`}
              value={responsiveValues['borderRadius']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints(
                  'borderRadius',
                  breakpoint,
                  e.currentTarget.value,
                )
              }
              autoComplete="off"
            />
          </FormControl>
        </Box>
      ))}
      <AddABreakpoint currentProps={responsiveValues} />
    </>
  )
}

export default memo(BorderPanel)
