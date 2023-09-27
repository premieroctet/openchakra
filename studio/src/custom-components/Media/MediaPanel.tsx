import React, { memo } from 'react'
import {
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'
import MediaModal from '~components/inspector/inputs/MediaModal'


const MediaPanel = () => {

  const { setValueFromEvent } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const src = usePropsSelector('src')
  const alt = usePropsSelector('alt')
  const htmlHeight = usePropsSelector('htmlHeight')
  const htmlWidth = usePropsSelector('htmlWidth')  
  const visio = usePropsSelector('visio')
  const downloadable = usePropsSelector('downloadable')

  return (
    <>
       <FormControl label="Source" htmlFor="src">
        <Input
          placeholder="Media URL"
          value={src || ''}
          size="sm"
          name="src"
          onChange={setValueFromEvent}
          onBlur={setValueFromEvent}
        />
        <Button size={'xs'} onClick={onOpen}>...</Button>
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
      <SwitchControl label="Is iframe" name="isIframe" />
      <SwitchControl label="Visio (camera, micro)" name="visio" />
      <SwitchControl label="Download allowed" name="downloadable" tooltip='hop'/>

      <MediaModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default memo(MediaPanel)
