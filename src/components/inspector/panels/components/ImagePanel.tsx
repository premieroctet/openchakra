import React from 'react'
import { Input } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const ImagePanel = () => {
  const { setValueFromEvent } = useForm()

  const src = usePropsSelector('src')
  const fallbackSrc = usePropsSelector('fallbackSrc')
  const alt = usePropsSelector('alt')
  const htmlHeight = usePropsSelector('htmlHeight')
  const htmlWidth = usePropsSelector('htmlWidth')

  return (
    <>
      <FormControl label="Source" htmlFor="src">
        <Input
          placeholder="Image URL"
          value={src || ''}
          size="sm"
          name="src"
          onChange={setValueFromEvent}
        />
      </FormControl>

      <FormControl label="Fallback Src" htmlFor="fallbackSrc">
        <Input
          placeholder="Image URL"
          value={fallbackSrc || ''}
          size="sm"
          name="fallbackSrc"
          onChange={setValueFromEvent}
        />
      </FormControl>

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
