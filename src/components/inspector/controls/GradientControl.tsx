import React, { ReactNode, useState, memo, useEffect } from 'react'
import { Box, Select, Button, IconButton, Checkbox } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
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
  const [gradientColor, setGradientColor] = useState(['green.200'])
  const [directionValue, setDirectionValue] = useState('to right')
  const gradient = usePropsSelector(props.name)
  const textGradient = usePropsSelector('bgClip')

  const choices = props.options

  const updateValue = () => {
    if (
      gradientColor.length >= 2 &&
      gradient !== `linear(${directionValue}, ${gradientColor.toString()})`
    ) {
      setValue(
        props.name,
        `linear(${directionValue}, ${gradientColor.toString()})`,
      )
    }
  }

  useEffect(() => {
    updateValue()
    //eslint-disable-next-line
  }, [directionValue, gradientColor])

  useEffect(() => {
    if (gradient === '' || gradient === null) {
      setGradientColor(['green.200'])
    } else {
      try {
        let gradientValue = gradient.split('(')[1]
        let actualDirection = gradientValue.split(',')[0]
        let actualColor = gradientValue.split(',')
        let colorArray = actualColor.splice(1, actualColor.length)
        colorArray[colorArray.length - 1] = colorArray[
          colorArray.length - 1
        ].split(')')[0]
        colorArray[0] = colorArray[0].split(' ')[1]
        setDirectionValue(actualDirection)
        setGradientColor(colorArray)
      } catch (e) {
        console.log(e)
      }
    }
  }, [gradient])

  const updateGradient = async (value: string, index: number) => {
    let colorCopy = [...gradientColor]
    colorCopy[index] = value
    setGradientColor(colorCopy)
  }

  const removeGradient = async (index: number) => {
    let colorCopy = [...gradientColor]
    colorCopy.splice(index, 1)
    if (colorCopy.length >= 2) {
      setGradientColor(colorCopy)
    } else {
      setGradientColor(colorCopy)
      setValue(props.name, null)
    }
  }

  return (
    <>
      <FormControl label={props.label}>
        <Select
          size="sm"
          id={directionValue || 'direction'}
          name={directionValue || 'direction'}
          value={directionValue || ''}
          onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
            setDirectionValue(value.target.value)
            gradientColor.length >= 2 &&
              setValue(
                props.name,
                `linear(${directionValue}, ${gradientColor.toString()})`,
              )
          }}
        >
          {choices?.map((choice: string) => (
            <option key={choice}>{choice}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl label="Clip to Text">
        <Checkbox
          defaultChecked={textGradient}
          onChange={e =>
            e.target.checked
              ? setValue('bgClip', `text`)
              : setValue('bgClip', null)
          }
        />
      </FormControl>

      {gradientColor.map((e, i) => (
        <Box textAlign="right" mt={3} key={i}>
          {i >= 1 && (
            <IconButton
              onClick={() => removeGradient(i)}
              variant="ghost"
              marginRight={2}
              size="xs"
              aria-label="delete"
              icon={<SmallCloseIcon path="" />}
            />
          )}

          <ColorPickerControl
            withFullColor={props.withFullColor}
            name={props.name}
            gradient
            index={i}
            gradientColor={e}
            updateGradient={updateGradient}
          />
        </Box>
      ))}

      <Box textAlign="right" mt={3}>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setGradientColor([...gradientColor, 'blue.500'])}
        >
          + Add
        </Button>
      </Box>
    </>
  )
}

export default memo(GradientControl)
