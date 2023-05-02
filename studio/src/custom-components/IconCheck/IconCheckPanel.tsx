import React, { memo } from 'react'
import { Input } from '@chakra-ui/react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import FormControl from '~components/inspector/controls/FormControl'
import ColorPickerControl from '../../components/inspector/controls/ColorPickerControl'
import ImageControl from '~components/inspector/controls/ImageControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const IconCheckPanel = () => {

  const { setValueFromEvent } = useForm()
  const htmlHeight = usePropsSelector('htmlHeight')
  const htmlWidth = usePropsSelector('htmlWidth')

  return (
    <>
      <SwitchControl name='isChecked' label='isChecked' />
      <ImageControl label="icon" name="illu" />
      <hr />
      <FormControl label="✅ BackgroundColor" htmlFor="ratingfillcolor">
        <ColorPickerControl
          withFullColor={true}
          name={'backgroundColorChecked'}
          gradient={false}
        />
      </FormControl>
      <ImageControl label="✅ icon" name="illuChecked" />
      <FormControl label="Html height" htmlFor="htmlHeight">
        <Input
          value={htmlHeight || ''}
          size="sm"
          type="number"
          name="htmlHeight"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Html width" htmlFor="htmlWidth">
        <Input
          value={htmlWidth || ''}
          size="sm"
          type="number"
          name="htmlWidth"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  )
}

export default memo(IconCheckPanel)