import React, { ReactNode, useState, memo, useEffect } from 'react'
import { Box, Select, Button, Switch } from '@chakra-ui/react'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import ColorPickerControl from './ColorPickerControl'
import usePropsSelector from '~hooks/usePropsSelector'

export type Gradient =
  | 'to top'
  | 'to top right'
  | 'to right'
  | 'to bottom right'
  | 'to bottom'
  | 'to bottom left'
  | 'to left'
  | 'to top left'
type GradientControlPropsType = {
  name: string
  label: string | ReactNode
  enableHues?: boolean
  withFullColor?: boolean
  options?: Gradient[]
}

const GradientControl = (props: GradientControlPropsType) => {
  const { setValue } = useForm()
  const [gradientColor, setGradientColor] = useState(['green.200', 'blue.500'])
  const [directionValue, setDirectionValue] = useState('to right')
  const [activate, setActivate] = useState(false)
  const gradient = usePropsSelector(props.name)

  const choices = props.options

  const updateValue = () => {
    if (activate) {
      setValue(
        props.name,
        `linear(${directionValue}, ${gradientColor.toString()})`,
      )
    }
  }

  useEffect(() => {
    updateValue()
    //eslint-disable-next-line
  }, [directionValue, gradientColor, activate])

  const updateGradient = async (value: string, index: number) => {
    let colorCopy = [...gradientColor]
    colorCopy[index] = value
    setGradientColor(colorCopy)
  }

  return (
    <>
      <FormControl label={props.label}>
        <Switch
          name="Activate Gradient"
          id="gradient"
          size="sm"
          isChecked={gradient || false}
          onChange={() =>
            setValue(props.name, gradient ? null : setActivate(!activate))
          }
        />
      </FormControl>
      <FormControl label="">
        <Select
          size="sm"
          id={directionValue || 'direction'}
          name={directionValue || 'direction'}
          value={directionValue || ''}
          onChange={value => {
            setDirectionValue(value.target.value)
            if (activate) {
              setValue(
                props.name,
                `linear(${directionValue}, ${gradientColor.toString()})`,
              )
            }
          }}
        >
          {choices?.map((choice: string) => (
            <option key={choice}>{choice}</option>
          ))}
        </Select>
      </FormControl>
      {gradientColor.map((e, i) => (
        <FormControl label="" key={i}>
          <ColorPickerControl
            withFullColor={props.withFullColor}
            name={props.name}
            gradient={true}
            index={i}
            gradientColor={e}
            updateGradient={updateGradient}
          />
        </FormControl>
      ))}
      <Box textAlign="right">
        <Button
          colorScheme="teal"
          size="xs"
          onClick={() => setGradientColor([...gradientColor, 'whiteAlpha.500'])}
        >
          + Add
        </Button>
      </Box>
    </>
  )
}

export default memo(GradientControl)
