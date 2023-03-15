import React, { memo } from 'react'
import { SimpleGrid, Input, Select, Box } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import useBreakpoints from '~hooks/useBreakpoints'

const DimensionPanel = () => {
  const dimensionsInput = [
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
  ]

  const {
    responsiveValues,
    settledBreakpoints,
    handleBreakpoints,
    AddABreakpoint,
  } = useBreakpoints([
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'overflow',
  ])

  const LABELS={
    minWidth: 'minW',
    maxWidth: 'maxW',
    minHeight: 'minH',
    maxHeight: 'maxH',
  }

  return (
    <>
      {settledBreakpoints.map((breakpoint: string, i: number) => (
        <Box key={i}>
          {breakpoint}
          <SimpleGrid columns={2} spacingX={2} spacingY={1}>
            {dimensionsInput.map((dimInp, i) => (
              <FormControl
                key={`diminp-${i}`}
                htmlFor={`${breakpoint}-${dimInp}`}
                label={LABELS[dimInp]||dimInp}
              >
                <Input
                  id={`${breakpoint}-${dimInp}`}
                  size="sm"
                  type="text"
                  name={`${breakpoint}-${dimInp}`}
                  value={responsiveValues[dimInp]?.[breakpoint] || ''}
                  onChange={e =>
                    handleBreakpoints(dimInp, breakpoint, e.currentTarget.value)
                  }
                  autoComplete="off"
                />
              </FormControl>
            ))}
          </SimpleGrid>

          <FormControl label="Overflow">
            <Select
              size="sm"
              name={`${breakpoint}-${'overflow'}`}
              value={responsiveValues['overflow']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints('overflow', breakpoint, e.currentTarget.value)
              }
            >
              <option>visible</option>
              <option>hidden</option>
              <option>scroll</option>
            </Select>
          </FormControl>
        </Box>
      ))}
      <AddABreakpoint currentProps={responsiveValues} />
    </>
  )
}

export default memo(DimensionPanel)
