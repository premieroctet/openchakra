import React, { memo, useMemo } from 'react'
import { Box, Input } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import {
  SliderTrack,
  SliderFilledTrack,
  Slider,
  SliderThumb,
} from '@chakra-ui/react'

import useBreakpoints from '~hooks/useBreakpoints'

const EffectsPanel = () => {
  const {
    responsiveValues,
    settledBreakpoints,
    handleBreakpoints,
    AddABreakpoint,
  } = useBreakpoints(['opacity', 'boxShadow'])

  const opacities = responsiveValues['opacity']

  return (
    <>
      {settledBreakpoints.map((breakpoint: string, i: number) => (
        <Box key={i}>
          {breakpoint}

          <FormControl label="Opacity">
            <Slider
              min={1}
              onChange={(value: any) => {
                handleBreakpoints('opacity', breakpoint, value / 100)
              }}
              value={opacities?.[breakpoint] * 100 || 100}
              mr={2}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl
            key={`boxShadow-${i}`}
            htmlFor={`${breakpoint}-boxShadow`}
            label={'boxShadow'}
          >
            <Input
              id={`${breakpoint}-boxShadow`}
              size="sm"
              type="text"
              name={`${breakpoint}-boxShadow`}
              value={responsiveValues['boxShadow']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints(
                  'boxShadow',
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

export default memo(EffectsPanel)
