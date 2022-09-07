import React, { useState } from 'react'
import {
  Grid,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Slider,
  Flex,
} from '@chakra-ui/react'

type HuesPickerPropType = {
  name: string
  themeColors: any
  enableHues: boolean
  gradient: boolean
  index?: number
  setValue: (name: string, value: any) => void
  updateGradient?: (value: string, index: number) => void
}

const HuesPickerControl = (props: HuesPickerPropType) => {
  const [hue, setHue] = useState<number>(500)
  const [key, setKey] = useState(0)

  React.useEffect(() => {
    function handleMouseUp() {
      setKey(Math.random())
    }

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })

  return (
    <>
      <Grid mb={2} templateColumns="repeat(5, 1fr)" gap={0}>
        {Object.keys(props.themeColors).map(colorName =>
          props.gradient ? (
            <Box
              border={colorName.includes('white') ? '1px solid lightgrey' : ''}
              key={colorName}
              _hover={{ boxShadow: 'lg' }}
              cursor="pointer"
              bg={`${colorName}.${props.enableHues ? hue : 500}`}
              onClick={() => {
                if (props.updateGradient) {
                  props.updateGradient(`${colorName}.${hue}`, props.index!)
                }
              }}
              mt={2}
              borderRadius="full"
              height="30px"
              width="30px"
            />
          ) : (
            <Box
              border={colorName.includes('white') ? '1px solid lightgrey' : ''}
              key={colorName}
              _hover={{ boxShadow: 'lg' }}
              cursor="pointer"
              bg={`${colorName}.${props.enableHues ? hue : 500}`}
              onClick={() =>
                props.setValue(
                  props.name,
                  props.enableHues ? `${colorName}.${hue}` : colorName,
                )
              }
              mt={2}
              borderRadius="full"
              height="30px"
              width="30px"
            />
          ),
        )}
      </Grid>
      {props.enableHues && (
        <Slider
          onChange={value => {
            value = value === 0 ? 50 : value
            setHue(value)
          }}
          min={0}
          max={900}
          step={100}
          value={hue}
          key={key}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={8}>
            <Flex
              align="center"
              justify="center"
              borderRadius="full"
              fontSize="xs"
            >
              {hue}
            </Flex>
          </SliderThumb>
        </Slider>
      )}
    </>
  )
}

export default HuesPickerControl
