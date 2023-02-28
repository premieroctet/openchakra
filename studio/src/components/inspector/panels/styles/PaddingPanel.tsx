import React, { memo } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Box,
} from '@chakra-ui/react'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'
import useBreakpoints from '~hooks/useBreakpoints'

type PaddingPanelPropsType = {
  type: 'margin' | 'padding'
}

const ATTRIBUTES = {
  margin: {
    all: 'm',
    left: 'ml',
    right: 'mr',
    bottom: 'mb',
    top: 'mt',
  },
  padding: {
    all: 'p',
    left: 'pl',
    right: 'pr',
    bottom: 'pb',
    top: 'pt',
  },
}

const PaddingPanel = ({ type }: PaddingPanelPropsType) => {
  const {
    responsiveValues,
    settledBreakpoints,
    handleBreakpoints,
    AddABreakpoint,
  } = useBreakpoints([
    ATTRIBUTES[type].all,
    ATTRIBUTES[type].left,
    ATTRIBUTES[type].right,
    ATTRIBUTES[type].bottom,
    ATTRIBUTES[type].top,
  ])

  return (
    <Box mb={4}>
      {settledBreakpoints.map((breakpoint: string, i: number) => (
        <Box key={i}>
          <FormControl>
            <FormLabel
              fontSize="xs"
              htmlFor={`${ATTRIBUTES[type].all}-${breakpoint}`}
              textTransform="capitalize"
            >
              {type}
            </FormLabel>
            {breakpoint}

            <InputGroup size="sm">
              <Input
                id={`${ATTRIBUTES[type].all}-${breakpoint}`}
                mb={1}
                placeholder="All"
                size="sm"
                type="text"
                name={`${breakpoint}-${ATTRIBUTES[type].all}`}
                value={
                  responsiveValues[ATTRIBUTES[type].all]?.[breakpoint] || ''
                }
                onChange={e =>
                  handleBreakpoints(
                    ATTRIBUTES[type].all,
                    breakpoint,
                    e.currentTarget.value,
                  )
                }
              />
            </InputGroup>

            <SimpleGrid columns={2} spacing={1}>
              <InputGroup size="sm">
                <InputLeftElement>
                    <ArrowBackIcon path="" fontSize="md" color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="left"
                  size="sm"
                  type="text"
                  name={`${breakpoint}-${ATTRIBUTES[type].left}`}
                  value={
                    responsiveValues[ATTRIBUTES[type].left]?.[breakpoint] || ''
                  }
                  onChange={e =>
                    handleBreakpoints(
                      ATTRIBUTES[type].left,
                      breakpoint,
                      e.currentTarget.value,
                    )
                  }
                  autoComplete="off"
                />
              </InputGroup>

              <InputGroup size="sm">
                <InputLeftElement>  
                  <ArrowForwardIcon path="" fontSize="md" color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="right"
                  size="sm"
                  type="text"
                  name={`${breakpoint}-${ATTRIBUTES[type].right}`}
                  value={
                    responsiveValues[ATTRIBUTES[type].right]?.[breakpoint] || ''
                  }
                  onChange={e =>
                    handleBreakpoints(
                      ATTRIBUTES[type].right,
                      breakpoint,
                      e.currentTarget.value,
                    )
                  }
                  autoComplete="off"
                />
              </InputGroup>

              <InputGroup size="sm">
                <InputLeftElement>
                  <ArrowUpIcon path="" fontSize="md" color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="top"
                  size="sm"
                  type="text"
                  name={`${breakpoint}-${ATTRIBUTES[type].top}`}
                  value={
                    responsiveValues[ATTRIBUTES[type].top]?.[breakpoint] || ''
                  }
                  onChange={e =>
                    handleBreakpoints(
                      ATTRIBUTES[type].top,
                      breakpoint,
                      e.currentTarget.value,
                    )
                  }
                  autoComplete="off"
                />
              </InputGroup>

              <InputGroup size="sm">
                <InputLeftElement>  
                  <ChevronDownIcon path="" fontSize="md" color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="bottom"
                  size="sm"
                  type="text"
                  name={`${breakpoint}-${ATTRIBUTES[type].bottom}`}
                  value={
                    responsiveValues[ATTRIBUTES[type].bottom]?.[breakpoint] ||
                    ''
                  }
                  onChange={e =>
                    handleBreakpoints(
                      ATTRIBUTES[type].bottom,
                      breakpoint,
                      e.currentTarget.value,
                    )
                  }
                  autoComplete="off"
                />
              </InputGroup>
            </SimpleGrid>
          </FormControl>
        </Box>
      ))}
      <AddABreakpoint currentProps={responsiveValues} text={type} />
    </Box>
  )
}

export default memo(PaddingPanel)
