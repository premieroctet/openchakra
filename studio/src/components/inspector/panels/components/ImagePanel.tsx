import React from 'react'
import { 
  Input, 
} from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import ImageControl from '~components/inspector/controls/ImageControl'


const ImagePanel = () => {
  const { setValueFromEvent } = useForm()

  const alt = usePropsSelector('alt')
  const htmlHeight = usePropsSelector('htmlHeight')
  const htmlWidth = usePropsSelector('htmlWidth')

  return (
    <>
      <ImageControl label="Source" name={'src'} />
      <ImageControl label="Fallback Src" name={'fallbackSrc'} />

      <FormControl label="Alt" htmlFor="alt">
        <Input
          value={alt || ''}
          size="sm"
          name="alt"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Html height" htmlFor="htmlHeight">
        <Input
          value={htmlHeight || ''}
          size="sm"
          name="htmlHeight"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Html width" htmlFor="htmlWidth">
        <Input
          value={htmlWidth || ''}
          size="sm"
          name="htmlWidth"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  )
}

export default ImagePanel
