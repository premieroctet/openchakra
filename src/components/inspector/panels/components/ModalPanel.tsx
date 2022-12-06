import React, { memo } from 'react'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SizeControl from '~components/inspector/controls/SizeControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'

const ModalPanel = () => {
  const { setValueFromEvent } = useForm()
  const size = usePropsSelector('size')
  const motionPreset = usePropsSelector('motionPreset')

  return (
    <>
      <SwitchControl label="Show Preview" name="showpreview" />
      <SwitchControl label="Open" name="isOpen" />
      <SwitchControl label="Centered" name="isCentered" />
      <FormControl htmlFor="motionPreset" label="Transition">
        <Select
          id="motionPreset"
          onChange={setValueFromEvent}
          name="motionPreset"
          size="sm"
          value={motionPreset || ''}
        >
          <option>scale</option>
          <option>slideInBottom</option>
          <option>slideInRight</option>
          <option>none</option>
        </Select>
      </FormControl>

      <SizeControl
        label="Size"
        options={['xs', 'sm', 'md', 'lg', 'xl']}
        value={size}
      />
    </>
  )
}

export default memo(ModalPanel)
