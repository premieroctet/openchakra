import React, { memo } from 'react'
import {
  SliderTrack,
  SliderFilledTrack,
  Slider,
  SliderThumb,
  Select,
  Input,
} from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SizeControl from '~components/inspector/controls/SizeControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'

const SliderPanel = () => {
  const { setValue, setValueFromEvent } = useForm()
  const value = usePropsSelector('value')
  const size = usePropsSelector('size')
  const step = usePropsSelector('step')
  const orientation = usePropsSelector('orientation')
  const label = usePropsSelector('aria-label')
  const min = usePropsSelector('min')
  const max = usePropsSelector('max')

  return (
    <>
      <FormControl label="Value">
        <Slider
          onChange={value => setValue('value', value)}
          min={0}
          max={100}
          step={1}
          value={value}
          defaultValue={value}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl label="Min">
        <Slider
          onChange={value => setValue('min', value)}
          min={0}
          max={100}
          step={1}
          value={min}
          defaultValue={min}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl label="Max">
        <Slider
          onChange={value => setValue('max', value)}
          min={0}
          max={100}
          step={1}
          value={max}
          defaultValue={max}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl label="Step">
        <Slider
          onChange={step => setValue('step', step)}
          min={1}
          max={100}
          step={1}
          value={step}
          defaultValue={step}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl label="Aria Label">
        <Input
          size="sm"
          value={label || ''}
          type="text"
          name="aria-label"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <ColorsControl label="Color Scheme" name="colorScheme" />

      <SizeControl label="Size" options={['sm', 'md', 'lg']} value={size} />

      <FormControl htmlFor="orientation" label="Orientation">
        <Select
          id="orientation"
          onChange={setValueFromEvent}
          name="orientation"
          size="sm"
          value={orientation || ''}
        >
          <option>horizontal</option>
          <option>vertical</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(SliderPanel)
