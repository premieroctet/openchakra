import React from 'react'
import { 
  Button,
  Input, 
  useDisclosure,
} from '@chakra-ui/react'

import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'
import MediaModal from '~components/inspector/inputs/MediaModal'


const ImagePanel = () => {
  const { setValueFromEvent } = useForm()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const src = usePropsSelector('src')
  const fallbackSrc = usePropsSelector('fallbackSrc')
  const alt = usePropsSelector('alt')
  const htmlHeight = usePropsSelector('htmlHeight')
  const htmlWidth = usePropsSelector('htmlWidth')
  const srcWhenChecked = usePropsSelector('srcWhenChecked')

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
        <Button size={'xs'} onClick={onOpen}>...</Button>
      </FormControl>

      <FormControl label="Source when checked" htmlFor="src">
        <Input
          placeholder="Image URL"
          value={src || ''}
          size="sm"
          name="srcWhenChecked"
          onChange={setValueFromEvent}
        />
        <Button size={'xs'} onClick={onOpen}>...</Button>
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
    
      <MediaModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ImagePanel
